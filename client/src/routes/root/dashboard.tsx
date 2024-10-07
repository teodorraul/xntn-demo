import React, {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { XYFrame } from "semiotic";
import { formatDate, set } from "date-fns";
import { Button, Theme } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import {
    MetricsQuery,
    useMetricsSuspenseQuery,
} from "../../graphql/__generated__/types";
import { EmptyArr } from "../../utils/types";
import { useMetricsName } from "../../hooks/useMetricsName";
import { DailyEnergyStyles } from "./styles.css";
import { MonthNavigator } from "../../components/monthNavigator";
import { DayNavigator } from "../../components/dayNavigator";
import { DayIndex, MonthIndex } from "../../utils/dates";
import { DailyEnergyChart } from "./chart";
import { InfoStat } from "../../components/infoStat";

type DayMetadata = {
    date: Date;
    monthIndex: string;
    dayIndex: string;
    label: string;
};

export const useRefinedData = (metrics: MetricsQuery["metrics"]) => {
    let dbdnh = useMemo(() => {
        if (!metrics) return {};
        const acc: {
            [yearAndMonth: string]: {
                [date: string]: {
                    [hour: string]: number;
                };
            };
        } = {};

        for (const m of metrics) {
            let at = new Date(m.measuredAt);
            let mi = formatDate(at, MonthIndex);
            let di = formatDate(at, DayIndex);
            let hour = parseInt(formatDate(at, "HH"));

            if (!acc[mi]) {
                acc[mi] = {};
            }

            if (!acc[mi][di]) {
                acc[mi][di] = {};
            }

            if (!acc[mi][di][hour]) {
                acc[mi][di][hour] = 0;
            }

            acc[mi][di][hour] += m.value || 0;
        }

        return acc;
    }, [metrics]);

    let availableMonthIndexes = Object.keys(dbdnh).filter(
        (f) => Object.keys(dbdnh[f]).length > 1
    );
    return useMemo(() => {
        return {
            indexed: dbdnh,
            availableMonthIndexes,
            // forDates: Object.keys(dbdnh).map((k) => {
            //     let date: DayMetadata = {
            //         date: new Date(k),
            //         monthIndex: formatDate(new Date(k), monthIndex),
            //         dayIndex: formatDate(new Date(k), dayIndex),
            //         label: formatDate(k, "d MMM"),
            //     };
            //     return date;
            // }),
        };
    }, [dbdnh]);
};

function DailyEnergyDashboardContent() {
    const { id } = useParams();
    const { error, data } = useMetricsSuspenseQuery({
        variables: {
            measurementId: id,
        },
    });

    if (error) return <p>Error: {error.message}</p>;
    let metrics = data?.metrics || EmptyArr;

    const refinedData = useRefinedData(metrics);
    const name = useMetricsName(id);
    const [currentMonth, setCurrentMonth] = useState<string | undefined>();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const handleMonthChange = useCallback(
        (monthIndex: string) => {
            setCurrentMonth(monthIndex);
        },
        [setCurrentMonth]
    );

    const dataByTheHour = useMemo(() => {
        if (!selectedDate) return {};
        let dayIndex = formatDate(selectedDate, DayIndex);
        if (!refinedData.indexed[currentMonth]?.[dayIndex]) return {};

        return refinedData.indexed[currentMonth][dayIndex];
    }, [refinedData, currentMonth, selectedDate]);

    useEffect(() => {
        if (!selectedDate && currentMonth) {
            let date = new Date(currentMonth);
            console.log(date);
            setSelectedDate(date);
        }
    }, [refinedData, currentMonth, selectedDate]);

    const stats = useMemo(() => {
        let peak = 0;
        let peakHour = 0;
        let sum = Object.values(dataByTheHour).reduce((acc, i) => {
            acc += i;
            return acc;
        }, 0);

        Object.entries(dataByTheHour).forEach(([h, v]) => {
            if (v > peak) {
                peak = v;
                peakHour = h;
            }
        });

        return {
            energyForDay: sum,
            peakHour: peakHour,
            peakValue: peak,
        };
    }, [dataByTheHour]);

    return (
        <div className={DailyEnergyStyles.content}>
            <div className={DailyEnergyStyles.header}>
                <h1>{name}</h1>
                <MonthNavigator
                    monthIndexes={refinedData.availableMonthIndexes}
                    onMonthChange={handleMonthChange}
                />
            </div>
            {currentMonth && (
                <DayNavigator
                    monthIndex={currentMonth}
                    selectedDate={selectedDate}
                    dayData={refinedData.indexed[currentMonth]}
                    onDaySelection={setSelectedDate}
                />
            )}
            <DailyEnergyChart dataByHour={dataByTheHour} />
            <div className={DailyEnergyStyles.statsGrid}>
                <InfoStat
                    label="Total Energy"
                    value={`${stats.energyForDay.toFixed(2)} kw`}
                />
                <InfoStat
                    label="Peak Consumption At"
                    value={`${stats.peakHour}:00 (${stats.peakValue.toFixed(
                        2
                    )} kw)`}
                />
            </div>
            {/* {refinedData.forDates.map((d) => {
                return (
                    <Button
                        onClick={() => {
                            setForDate(d);
                        }}
                    >
                        {d.label}
                    </Button>
                );
            })} */}
        </div>
    );
}

export const DailyEnergyDashboard = () => {
    return (
        <Suspense>
            <DailyEnergyDashboardContent />
        </Suspense>
    );
};
