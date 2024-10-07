import { measurements, measurementsMetrics } from "db/schema";

type Measurement = typeof measurements.$inferSelect;
type MeasurementData = typeof measurementsMetrics.$inferSelect;
