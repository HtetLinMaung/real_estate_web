import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { adminRoutes } from "../configs/routes";

const Admin = () => {
  const Routes = () =>
    adminRoutes.map((route) => (
      <Route {...route.options}>
        <route.Page />
      </Route>
    ));

  return (
    <Layout>
      <Switch>
        <Routes />
      </Switch>
    </Layout>
  );
};

export default Admin;
