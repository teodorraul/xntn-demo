import { UUID } from "crypto";
import { db } from "db";
import { measurements, measurementsMetrics } from "db/schema";
import { eq } from "drizzle-orm";
import { buildSchema, GraphQLScalarType, Kind } from "graphql";
import { readFileSync } from "fs";
import path from "path";
import { DateTimeResolver } from "graphql-scalars";

const rawSchema = readFileSync(path.resolve("graphql", "schema.graphql"), {
    encoding: "utf-8",
});
export const schema = buildSchema(rawSchema);

const DateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Custom Date scalar type",
    serialize(value) {
        return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
        if (typeof value === "string" || typeof value === "number") {
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : date;
        }
        return null; // return null if value is of unrecognized type
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const date = new Date(ast.value);
            return isNaN(date.getTime()) ? null : date;
        }
        return null;
    },
});

export const root = {
    DateTime: DateTimeResolver,
    measurements: () => {
        return db.select().from(measurements);
    },
    metrics: async ({ measurementId }: { measurementId: UUID }) => {
        return await db
            .select()
            .from(measurementsMetrics)
            .where(eq(measurementsMetrics.forMeasurementId, measurementId));
    },
};
