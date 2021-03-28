import { ThemeProvider } from "@material-ui/styles";
import React, { createContext, useReducer } from "react";
import { menus } from "../data/menus";
import theme from "../configs/theme";

const initState = {
  menus,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return {
        ...state,
        menus: state.menus.map((menu) => ({
          ...menu,
          open: menu._id === action.payload ? !menu.open : menu.open,
        })),
      };
    case "SET_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const rootContext = createContext({});

const RootProvider = ({ children }) => {
  return (
    <rootContext.Provider value={useReducer(reducer, initState)}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </rootContext.Provider>
  );
};

export default RootProvider;
