import { createMuiTheme } from "@material-ui/core";

export const palette = {
  primaryText: "#25282B",
  secondaryText: "#666666",
  titleText: "#0A70C7",
  normalTextfield: "#F4F4F4",
};

export default createMuiTheme({
  palette: palette,
  typography: {
    fontFamily: "Arial",
  },
  overrides: {
    MuiTypography: {
      h1: { fontSize: 30, lineHeight: "40px", fontWeight: "bold" },
      h2: { fontSize: 22, lineHeight: "30px", fontWeight: "bold" },
      body1: { fontSize: 17, lineHeight: "24px" },
      body2: { fontSize: 14, lineHeight: "24px" },
      subtitle1: { fontSize: 12, lineHeight: "24px" },
      colorTextPrimary: { color: palette.primaryText },
      colorTextSecondary: { color: palette.secondaryText },
      colorPrimary: {
        color: palette.titleText,
        fontFamily: "Arial",
        fontWeight: "bold",
      },
    },
  },
});
