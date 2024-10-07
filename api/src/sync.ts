import { UUID } from "crypto";
import { db } from "db";
import { measurements, measurementsMetrics } from "db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { ExnatonAPI } from "integrations/exnaton";

export class ExnatonSyncer {
    api = new ExnatonAPI();

    syncWithExnaton = async () => {
        let measurementIds = await this.api.fetchAvailableMeasurementsIds();

        // Let's store the measurement in the DB and mark it as available
        let promises = [];
        for (const measurementId of measurementIds) {
            promises.push(this.storeMeasurementAndFetchMetrics(measurementId));
        }

        await Promise.all(promises);
    };

    storeMeasurementAndFetchMetrics = async (measurementId: UUID) => {
        try {
            await db
                .insert(measurements)
                .values({ id: measurementId })
                .onConflictDoNothing();
            try {
                let metrics = await this.api.fetchMeasurementMetrics(
                    measurementId
                );

                if (metrics) {
                    for (const m of metrics.data) {
                        let measuredAt = m.timestamp
                            ? new Date(m.timestamp)
                            : undefined;
                        let id = m.tags.muid;

                        if (measuredAt) {
                            let valueField = undefined;
                            var knownFields = [
                                "measurement",
                                "timestamp",
                                "tags",
                            ];
                            for (const field of Object.keys(m)) {
                                if (!knownFields.includes(field)) {
                                    valueField = field;
                                }
                            }

                            if (valueField) {
                                await db
                                    .insert(measurementsMetrics)
                                    .values({
                                        forMeasurementId: measurementId,
                                        type: m.measurement,
                                        measuredAt: new Date(m.timestamp),
                                        value: (m as any)[valueField],
                                        quality: m.tags.quality,
                                    })
                                    .onConflictDoNothing();
                            }
                        } else {
                            throw new Error(
                                `no date found on metric ${id} for measurementId ${measurementId}`
                            );
                        }
                    }
                }
            } catch (e) {
                console.error("Failed to insert measurementMetrics:", e);
            }
        } catch (e) {
            console.error("Failed to insert measurement:", e);
        }
    };
}
