import { RouteObject } from "react-router-dom";
import { DailyEnergyDashboard } from "./dashboard";
import { DailyEnergyPage } from "./page";

export const DailyEnergyRoutes: RouteObject[] = [
    {
        path: "",
        element: <DailyEnergyPage />,
        children: [
            {
                path: ":id",
                element: <DailyEnergyDashboard />,
            },
        ],
    },
];
