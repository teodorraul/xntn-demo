import { NavLink, useMatch } from "react-router-dom";
import {
    MeasurementItemFooterStyle,
    MeasurementItemStyle,
} from "./measurementItem.css";
import { Text } from "@radix-ui/themes";
import { useMemo } from "react";
import { IconMeasurement } from "../icons/measurement";
import { useMetricsName } from "../hooks/useMetricsName";

export const MeasurementItem: React.FC<{
    id: string;
}> = ({ id }) => {
    const to = "/" + id;
    const isActive = useMatch(to);
    const name = useMetricsName(id);

    return (
        <NavLink
            to={to}
            className={MeasurementItemStyle({
                active: !!isActive,
            })}
        >
            <IconMeasurement size={18} />
            <Text size="2" weight="bold">
                {name}
            </Text>
            {/* <Text className={MeasurementItemFooterStyle} weight="bold">
                ID: {id}
            </Text> */}
        </NavLink>
    );
};
