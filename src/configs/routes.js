import React from "react";
import Admin from "../pages/Admin";
import Dashboard from "../pages/admin/Dashboard";
import Menu from "../pages/admin/settings/Menu";

export const routes = [
  {
    options: {
      path: "/admin",
      key: "Admin",
    },
    Page: () => <Admin />,
  },
];

export const adminRoutes = [
  {
    options: {
      path: "/admin/dashboard",
      key: "Dashboard",
    },
    Page: () => <Dashboard />,
  },
  {
    options: {
      path: "/admin/settings/menus",
      key: "Menu",
    },
    Page: () => <Menu />,
  },
];
