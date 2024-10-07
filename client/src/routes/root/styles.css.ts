import { globalStyle, style } from "@vanilla-extract/css";

export const DailyEnergyStyles = {
    page: style({
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        minHeight: "100vh",
        boxSizing: "border-box",
        width: "100vw",
        overflow: "hidden",
    }),
    sidebar: style({
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: 20,
        rowGap: 12,
        flexBasis: "250px",
        flexShrink: 0,
        flexGrow: 0,
        borderRight: "1px solid rgba(0,0,0,0.1)",
    }),
    header: style({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 100,
        padding: "0 50px",
    }),
    content: style({
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flexGrow: 0,
        minWidth: 0,
        height: "100vh",
        overflow: "auto",
    }),
    chartStyles: style({
        position: "relative",
        flexBasis: 400,
        flexShrink: 0,
        marginBottom: 40,
        // padding: "20px 0",
    }),
    statsGrid: style({
        display: "grid",
        gridTemplateColumns: "min-content min-content auto",
        padding: "0 50px",
        columnGap: 20,
    }),
};

globalStyle(
    `${DailyEnergyStyles.chartStyles} .tick, ${DailyEnergyStyles.chartStyles} .axis-baseline`,
    {
        stroke: "rgba(0,0,0,0.1)",
    }
);

globalStyle(`${DailyEnergyStyles.chartStyles} .tooltip-content`, {
    background: "white",
    position: "relative",
    border: "1px solid #ddd",
    color: "black",
    padding: "10px",
    zIndex: "100",
    // transform: "translateX(-50%) translateY(5px)",
    minWidth: "120px",
});

globalStyle(`${DailyEnergyStyles.chartStyles} circle.frame-hover`, {
    stroke: "#aaa",
    fill: "red",
});

globalStyle(`${DailyEnergyStyles.chartStyles} .axis-title.axis.y`, {
    transform: "translateX(-90px) translateY(135px) rotate(-90deg) !important",
    textAlign: "center",
});

globalStyle(`${DailyEnergyStyles.chartStyles} .axis-title`, {
    textTransform: "uppercase",
    fontSize: "10px",
    fontWeight: "600",
    opacity: 0.4,
});

globalStyle(`${DailyEnergyStyles.chartStyles} .axis-label`, {
    fontSize: "13px",
    fontWeight: "500",
    opacity: 1,
});
