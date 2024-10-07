import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const InfoStatStyles = {
    container: style({
        padding: 15,
        minWidth: 200,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
        // border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 15,
    }),
    label: style({
        textWrap: "nowrap",
        fontSize: " 13px",
        opacity: 0.7,
    }),
    value: style({
        textWrap: "nowrap",
        fontSize: "16px",
        fontWeight: "500",
    }),
};
