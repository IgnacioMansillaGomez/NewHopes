import { createTheme } from "@mui/material/styles";
import { purple, pink } from "@mui/material/colors";

const primaryColor = pink[800];
const secondaryColor = pink[200];

const Theme = createTheme({
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
  },
});

export default Theme;
