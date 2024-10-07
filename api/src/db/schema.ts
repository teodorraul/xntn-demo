import { relations } from "drizzle-orm";
import {
    index,
    uuid,
    text,
    pgTable,
    timestamp,
    doublePrecision,
    serial,
    bigserial,
    uniqueIndex,
} from "drizzle-orm/pg-core";

export const measurements = pgTable("measurements", {
    id: uuid("id").primaryKey(),
});

export const measurementsMetrics = pgTable(
    "measurement_metrics",
    {
        id: bigserial("bigserial", { mode: "number" }),
        forMeasurementId: uuid("for_measurement_id").notNull(),
        measuredAt: timestamp("measured_at").notNull(),
        type: text("type").notNull(),
        quality: text("quality").notNull(),
        value: doublePrecision("value"),
    },
    (tbl) => ({
        uniqueMeasuredAtForMeasurementId: uniqueIndex(
            "unique_measured_at_for_measurement_id"
        ).on(tbl.measuredAt, tbl.forMeasurementId),
    })
);

// https://orm.drizzle.team/docs/rqb#one-to-many
export const measurementsRelations = relations(measurements, ({ many }) => ({
    metrics: many(measurementsMetrics),
}));

export const measurementsMetricsRelations = relations(
    measurementsMetrics,
    ({ one }) => ({
        measurement: one(measurements, {
            fields: [measurementsMetrics.forMeasurementId],
            references: [measurements.id],
        }),
    })
);
