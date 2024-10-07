import { Flex } from "@radix-ui/themes";
import { MonthNavigatorStyles } from "./monthNavigator.css";
import { useEffect, useMemo, useState } from "react";
import {
    addDays,
    endOfMonth,
    formatDate,
    isSameDay,
    startOfMonth,
} from "date-fns";
import { LeftArrow, RightArrow } from "../icons/arrows";
import { useRefinedData } from "../routes/root/dashboard";
import { DayIndex } from "../utils/dates";
import { DayNavigatorStyles } from "./dayNavigator.css";
import { Lightning } from "../icons/lightning";

export const DayNavigator: React.FC<{
    monthIndex: string;
    selectedDate: Date;
    dayData: ReturnType<typeof useRefinedData>["indexed"][string];
    onDaySelection: (date: Date) => void;
}> = ({ monthIndex, selectedDate, dayData, onDaySelection }) => {
    const [selected, setSelected] = useState(dayData[0]);

    useEffect(() => {
        if (selected) {
            onDaySelection?.(selected);
        }
    }, [selected]);

    useEffect(() => {
        setSelected(selectedDate);
    }, [selectedDate]);

    const dataByDay = useMemo(() => {
        const dates = [];
        const som = startOfMonth(new Date(monthIndex));
        const eom = endOfMonth(som);
        let date = som;
        while (date < eom) {
            let dayIndex = formatDate(date, DayIndex);
            dates.push({
                date: date,
                weekday: formatDate(date, "EEE"),
                label: formatDate(date, "d MMM"),
                energy: Object.values(dayData[dayIndex]).reduce((acc, i) => {
                    acc += i;
                    return acc;
                }, 0),
            });

            date = addDays(date, 1);
        }
        return dates;
    }, [dayData, monthIndex]);

    return (
        <div className={DayNavigatorStyles.container}>
            <Flex className={DayNavigatorStyles.holder}>
                {dataByDay.map((i) => (
                    <Flex key={i.label} direction="column">
                        <button
                            className={DayNavigatorStyles.button({
                                active: isSameDay(i.date, selected),
                            })}
                            onClick={() => {
                                setSelected(i.date);
                            }}
                        >
                            <span>
                                <strong>{i.label}</strong> • {i.weekday}
                            </span>
                            <div className={DayNavigatorStyles.energyLabel}>
                                <Lightning size={13} />
                                <span>{i.energy.toFixed(1)}kw</span>
                            </div>
                        </button>
                    </Flex>
                ))}
            </Flex>
        </div>
    );
};
