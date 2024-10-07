import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DailyEnergyRoutes } from "./routes/root/routes";

const router = createBrowserRouter([...DailyEnergyRoutes]);

export const Router = () => {
    return <RouterProvider router={router} />;
};
