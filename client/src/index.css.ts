import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html, body", {
    padding: 0,
    margin: 0,
});

globalStyle("h1,h2,h3,h4,h5,h6", {
    margin: 0,
});
globalStyle("a", {
    textDecoration: "none",
    color: "currentColor",
});

globalStyle("#root", {
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",
});
