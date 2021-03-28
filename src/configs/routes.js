import React from "react";
import Admin from "../pages/Admin";
import Dashboard from "../pages/admin/Dashboard";

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
];
