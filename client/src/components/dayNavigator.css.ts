import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const DayNavigatorStyles = {
    container: style({
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        fontWeight: 600,
        overflow: "auto",
        width: "100%",
        padding: "10px 50px",
        marginTop: -20,
        flexShrink: 0,
        marginBottom: 0,
        boxSizing: "border-box",
        WebkitOverflowScrolling: "touch",
        "::-webkit-scrollbar": {
            display: "none",
        },
    }),
    holder: style({
        display: "flex",
        alignItems: "center",
        columnGap: 15,
        fontWeight: 600,
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 20,
        flexShrink: 0,
        flexGrow: 1,
        padding: 20,
        minWidth: 0,
        boxSizing: "border-box",
        width: "auto",
        "::-webkit-scrollbar": {
            display: "none",
        },
    }),
    energyLabel: style({
        display: "flex",
        color: "green",
        marginTop: 5,
        columnGap: 3,
    }),
    button: recipe({
        base: {
            display: "flex",
            alignItems: "flexStart",
            justifyContent: "center",
            border: "none",
            flexDirection: "column",
            backgroundColor: "white",
            padding: 10,
            minWidth: 140,
            borderRadius: 10,
            cursor: "pointer",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
        },
        variants: {
            active: {
                true: {
                    cursor: "default",
                    backgroundColor: "rgba(0,0,0,0.05)",
                    boxShadow: "none",
                    overflow: "visible",
                    position: "relative",

                    ":before": {
                        content: "",
                        display: "block",
                        position: "absolute",
                        top: -6,
                        left: -6,
                        borderRadius: 16,
                        width: "calc(100% + 7.5px)",
                        height: "calc(100% + 7.5px)",
                        border: "2px solid rgba(0,0,0,0.1)",
                    },
                },
            },
        },
    }),
};
