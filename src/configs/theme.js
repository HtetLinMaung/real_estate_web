import { createMuiTheme } from "@material-ui/core";
import Poppins from "../assets/fonts/Poppins-Regular.ttf";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#0079BF",
    },
    secondary: {
      main: "#68727C",
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
