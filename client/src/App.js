import { Route } from 'react-router-dom'
import React from 'react';
import Home from './components/Home/home';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Login from "./components/Forms/Login/Login";
import Register from "./components/Forms/Register/Register";
import RecoveryPassword from "./components/Forms/RecoveryPassword/RecoveryPassword";
import NewPassword from "./components/Forms/NewPassword/NewPassword";
import LoginAdmin from './components/Forms/LoginAdmin/LoginAdmin';
import AdminPanel from './components/AdminPanel/AdminPanel'
import PrivateRoute from './components/PrivateRoutes/PrivateRoute'
import CardDetail from './components/CardDetail/CardDetail.jsx'
import HomePassengers from "./components/Home/homePassengers.jsx"
import HomeDrivers from "./components/Home/homeDrivers.jsx"
import MercadoPago from "./components/MercadoPago/mp.jsx"

function makePrivate(admin = false, visitor = false, pageUser = false, googleUser = false, route, route_to_redirect, component_to_render) {
  console.log(visitor)
  return (
    <Route path={route}>
      <PrivateRoute admin={admin} visitor={visitor} pageUser={pageUser} googleUser={googleUser} redirect={route_to_redirect}>
        {component_to_render}
      </PrivateRoute>
    </Route>
  )
}

function App() {

  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/loginAdmin' component={LoginAdmin} />
      {makePrivate(undefined, true, undefined, undefined, '/login', '/home', <Login />)}
      {makePrivate(undefined, true, undefined, undefined, '/register', '/home', <Register />)}
      {makePrivate(true, undefined, undefined, undefined, '/adminPanel', '/loginAdmin', <AdminPanel />)}
      {makePrivate(true, undefined, true, undefined, '/new-password', '/login', <NewPassword />)}
      {makePrivate(true, true, true, undefined, '/recovery-password', '/home', <RecoveryPassword />)}
      <Route path='/trip/:id' component={CardDetail} />
      <Route path='/home-passengers' component={HomePassengers} />
      <Route path='/home-drivers' component={HomeDrivers} />
      <Route path='/checkout' component={MercadoPago} />
    </div>
  );
}

export default App;
