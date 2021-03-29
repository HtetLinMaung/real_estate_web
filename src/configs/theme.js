import { createMuiTheme } from "@material-ui/core";
import Poppins from "../assets/fonts/Poppins-Regular.ttf";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#4659E4",
    },
    error: {
      main: "#FE635A",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    src: `
    local('Poppins'),
    url(${Poppins}) format('ttf')
    `,
  },
});
