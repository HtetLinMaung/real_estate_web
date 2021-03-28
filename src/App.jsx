import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RootProvider from "./providers/RootProvider";
import { routes } from "./configs/routes";

function App() {
  const Routes = () =>
    routes.map((route) => (
      <Route {...route.options}>
        <route.Page />
      </Route>
    ));

  return (
    <RootProvider>
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </RootProvider>
  );
}

export default App;
