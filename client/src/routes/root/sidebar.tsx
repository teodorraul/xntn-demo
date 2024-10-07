import { Flex, Text } from "@radix-ui/themes";
import { useMeasurementsSuspenseQuery } from "../../graphql/__generated__/types";
import { DailyEnergyStyles, MainCSS } from "./styles.css";
import { NavLink } from "react-router-dom";
import { MeasurementItem } from "../../components/measurementItem";

export const DailyEnergySidebar = () => {
    const { data, loading } = useMeasurementsSuspenseQuery();

    return (
        <aside className={DailyEnergyStyles.sidebar}>
            <h2>Energy</h2>
            {data?.measurements?.map((m) => {
                return <MeasurementItem key={m.id} id={m.id} />;
            })}
        </aside>
    );
};
