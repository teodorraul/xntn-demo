import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { Link, NavLink, Outlet } from "react-router-dom";

import {
    Suspense,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import ErrorBoundary from "../../components/errorBoundary";
import { DailyEnergyStyles } from "./styles.css";
import { DailyEnergySidebar } from "./sidebar";
import { ResponsiveXYFrame, XYFrame } from "semiotic";
import { useRefinedData } from "./dashboard";

export const DailyEnergyChart: React.FC<{
    dataByHour: ReturnType<typeof useRefinedData>["indexed"][string][string];
}> = ({ dataByHour }) => {
    const [chartDimensions, setChartDimensions] = useState<
        { width: number; height: number } | undefined
    >();
    const [holder, setHolder] = useState();

    const resize = useCallback(() => {
        let rect = holder?.getBoundingClientRect();
        if (rect) {
            setChartDimensions({
                height: rect.height,
                width: rect.width,
            });
        }
    }, [holder]);

    useLayoutEffect(() => {
        resize();
    }, [resize]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    resize();
                }
            }
        });

        if (holder) {
            resizeObserver.observe(holder);
            return () => {
                resizeObserver.observe(holder);
            };
        }
    }, [resize, holder]);

    const props = useMemo(() => {
        return {
            ...frameProps,
            size: chartDimensions
                ? [chartDimensions.width, chartDimensions.height]
                : [10, 10],
            margin: { left: 115, bottom: 60, right: 50, top: 40 },
            lines: [
                {
                    title: "Energy",
                    coordinates: Object.entries(dataByHour).map(
                        ([key, val]) => {
                            return {
                                hour: parseInt(key),
                                energy: val,
                            };
                        }
                    ),
                },
            ],
        };
    }, [dataByHour, chartDimensions]);

    return (
        <div className={DailyEnergyStyles.chartStyles} ref={setHolder}>
            <XYFrame {...props} hoverAnnotation={true} />
        </div>
    );
};

const theme = [
    "#ac58e5",
    "#E0488B",
    "#9fd0cb",
    "#e0d33a",
    "#7566ff",
    "#533f82",
    "#7a255d",
    "#365350",
    "#a19a11",
    "#3f4482",
];

const frameProps = {
    lineType: "area",
    xAccessor: "hour",
    yAccessor: "energy",
    pointStyle: { fill: "none", stroke: "black", strokeWidth: "1.5px" },
    lineStyle: (d, i) => ({
        stroke: theme[i],
        strokeWidth: 2,
        fill: theme[i],
        fillOpacity: 0.6,
    }),
    hoverAnnotation: [{ type: "frame-hover" }],
    axes: [
        {
            orient: "left",
            label: "Energy Consumption",
            tickFormat: (e) => e + "kw",
        },
        {
            orient: "bottom",
            label: { name: "By Hour", locationDistance: 55 },
        },
    ],
};
