import { Flex } from "@radix-ui/themes";
import { MonthNavigatorStyles } from "./monthNavigator.css";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "date-fns";
import { LeftArrow, RightArrow } from "../icons/arrows";

export const MonthNavigator: React.FC<{
    monthIndexes: string[];
    onMonthChange?: (monthIndex: string) => void;
}> = ({ monthIndexes, onMonthChange }) => {
    let [currentMonth, setCurrentMonth] = useState();

    useEffect(() => {
        setCurrentMonth(monthIndexes[0]);
    }, [monthIndexes]);

    useEffect(() => {
        onMonthChange?.(currentMonth);
    }, [currentMonth]);

    let month = useMemo(() => {
        if (!currentMonth) return undefined;
        let date = new Date(currentMonth);
        return formatDate(date, "MMMM");
    }, [currentMonth]);

    return (
        <Flex className={MonthNavigatorStyles.holder}>
            <button disabled className={MonthNavigatorStyles.button()}>
                <LeftArrow size={15} />
            </button>
            {month}
            <button disabled className={MonthNavigatorStyles.button()}>
                <RightArrow size={15} />
            </button>
        </Flex>
    );
};
