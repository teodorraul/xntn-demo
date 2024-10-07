import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const MonthNavigatorStyles = {
    holder: style({
        display: "flex",
        alignItems: "center",
        columnGap: 15,
        fontWeight: 600,
    }),
    button: recipe({
        base: {
            width: 24,
            height: 24,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            backgroundColor: "rgba(0,0,0,0.05)",
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
                        borderRadius: 20,
                        width: "calc(100% + 7.5px)",
                        height: "calc(100% + 7.5px)",
                        border: "2px solid rgba(0,0,0,0.1)",
                    },
                },
            },
        },
    }),
};
