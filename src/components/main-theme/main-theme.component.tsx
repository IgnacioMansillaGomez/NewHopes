import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import "typeface-cormorant";
const primaryColor = pink[800];
const secondaryColor = pink[200];

export const Theme = createTheme({
  palette: {
    primary: {
      light: "rgb(189, 67, 120)",
      main: primaryColor,
      dark: "rgb(121, 14, 60)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgb(246, 165, 192)",
      main: secondaryColor,
      dark: "rgb(170, 100, 123)",
      contrastText: "#000",
    },
    background: {
      default: "#F7EEF1",
      paper: "#fcf7fc",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 15,
  },
});
