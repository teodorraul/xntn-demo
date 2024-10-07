import { UUID } from "crypto";
import { existsSync } from "fs";
import { access, readFile } from "fs/promises";
import path from "path";
import { sleep } from "utils/utils";

type MeasurementMetricsResponse = {
    data: {
        measurement: "energy";
        timestamp: string;
        tags: {
            muid: string;
            quality: "measured";
        };
        "0100021D00FF": number;
    }[];
};

export class ExnatonAPI {
    private readonly API_URL;

    constructor(url?: String) {
        this.API_URL = url || "https://staging-api.exnaton.com";
    }

    fetchAvailableMeasurementsIds = async () => {
        const url = `${this.API_URL}/measurements`;

        // Fake API call
        await sleep(1000);

        const response: UUID[] = [
            "1db7649e-9342-4e04-97c7-f0ebb88ed1f8",
            "95ce3367-cbce-4a4d-bbe3-da082831d7bd",
        ];
        return response;
    };

    fetchMeasurementMetrics = async (measurementId: string) => {
        const url = `${this.API_URL}/meterdata/measurement?muid=${measurementId}&measurement=energy&limit=5000&start=2023-02-01&stop=2023-03-01`;

        // Fake API call
        await sleep(1000);

        try {
            let rawMockData = await readFile(
                path.resolve(
                    "exnaton_api_response_mocks",
                    `${measurementId}.json`
                ),
                "utf-8"
            );

            let response: MeasurementMetricsResponse = JSON.parse(rawMockData);

            return response;
        } catch (e) {
            console.error("failed to fetch the response file", e);
        }
    };
}
