import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { Link, NavLink, Outlet } from "react-router-dom";

import { Suspense } from "react";
import ErrorBoundary from "../../components/errorBoundary";
import { DailyEnergyStyles } from "./styles.css";
import { DailyEnergySidebar } from "./sidebar";

export const DailyEnergyPage = () => {
    return (
        <div className={DailyEnergyStyles.page}>
            <Suspense>
                <DailyEnergySidebar />
            </Suspense>
            <ErrorBoundary fallback={<h2>Error displaying the data.</h2>}>
                <Outlet />
            </ErrorBoundary>
        </div>
    );
};
