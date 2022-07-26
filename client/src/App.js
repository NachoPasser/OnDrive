import { Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./components/Home/home";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Login from "./components/Forms/Login/Login";
import Register from "./components/Forms/Register/Register";
import RecoveryPassword from "./components/Forms/RecoveryPassword/RecoveryPassword";
import NewPassword from "./components/Forms/NewPassword/NewPassword";
import LoginAdmin from "./components/Forms/LoginAdmin/LoginAdmin";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import CardDetail from "./components/CardDetail/CardDetail.jsx";
import HomePassengers from "./components/Home/homePassengers.jsx";
import HomeDrivers from "./components/Home/homeDrivers.jsx";
import Profile from "./components/Profile/Profile";
import AddCar from "./components/Forms/AddCar/AddCar";
import TermsAndConditions from "./components/Terminos/Terminos";
import PublicTrip from "./components/Forms/PublicTrip/PublicTrip";
import UserToDriver from "./components/Forms/UserToDriver/UserToDriver";
import Help from "./components/Help/Help";
import AboutUs from "./components/AboutUs/AboutUs";
import NotFound from "./components/NotFound/NotFound";

function makePrivate(
  allowed = [],
  route,
  route_to_redirect,
  component_to_render
) {
  return (
    <Route path={route}>
      <PrivateRoute allowed={allowed} redirect={route_to_redirect}>
        {component_to_render}
      </PrivateRoute>
    </Route>
  );
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/terms&conditions" component={TermsAndConditions} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/aboutUs" component={AboutUs} />
        {makePrivate(
          ["admin", "visitor"],
          "/home",
          "/home-passengers",
          <Home />
        )}
        {makePrivate(
          ["admin", "pageUser", "googleUser"],
          "/home-passengers",
          "/home",
          <HomePassengers />
        )}
        {makePrivate(
          ["admin", "driverUser"],
          "/home-drivers",
          "/home",
          <HomeDrivers />
        )}
        {makePrivate(["visitor"], "/register", "/home", <Register />)}
        {makePrivate(["visitor"], "/login", "/home", <Login />)}
        {makePrivate(["pageUser"], "/new-password", "/login", <NewPassword />)}
        {makePrivate(
          ["visitor"],
          "/recovery-password",
          "/home",
          <RecoveryPassword />
        )}
        {makePrivate(
          ["visitor"],
          "/loginAdmin",
          "/home-passengers",
          <LoginAdmin />
        )}
        {makePrivate(["admin"], "/adminPanel", "/loginAdmin", <AdminPanel />)}
        {/* {makePrivate(true, undefined, true, true, '/trip/:id', '/login', <CardDetail/>)} */}
        {makePrivate(
          ["pageUser", "googleUser"],
          "/profile",
          "/home-passengers",
          <Profile />
        )}
        {makePrivate(["driverUser"], "/addCar", "/login", <AddCar />)}
        {makePrivate(
          ["driverUser", "admin"],
          "/public",
          "/home",
          <PublicTrip />
        )}
        {makePrivate(
          ["pageUser", "googleUser"],
          "/driver",
          "/home",
          <UserToDriver />
        )}
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
