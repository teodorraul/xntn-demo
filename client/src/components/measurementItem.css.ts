import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const MeasurementItemStyle = recipe({
    base: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: "white",
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: "min-content auto",
        columnGap: 10,
        rowGap: 5,
        alignItems: "center",
        gridTemplateAreas: `"icon header"`,
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
});

export const MeasurementItemFooterStyle = style({
    fontFamily: "monospace",
    gridArea: "footer",
    fontSize: 10,
    fontWeight: 400,
    opacity: 0.5,
});
