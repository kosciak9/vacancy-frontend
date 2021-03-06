import Shevy from "shevyjs";

const typography = new Shevy({ addMarginBottom: false });
const SPACING_AMOUNT = 4;

const theme = {
  palette: {
    primary: "#961FA8",
    success: "#76A81F",
    warning: "#F9AB00",
    invalid: "#E2683C",
    backdrop: "#efefef"
  },
  spacing: amount => amount * SPACING_AMOUNT,
  typography
};

export default theme;
