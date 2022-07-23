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
import Profile from './components/Profile/Profile';
function makePrivate( admin = false, visitor = false, pageUser = false, googleUser = false, route, route_to_redirect, component_to_render) {

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
      {makePrivate(true, true, undefined, undefined, '/home', '/home-passengers', <Home/>)}
      {makePrivate(true, undefined, true, true, '/home-passengers', '/home', <HomePassengers/>)}
      {makePrivate(true, undefined, true, true, '/home-drivers', '/home', <HomeDrivers/>)}
      {makePrivate(undefined, true, undefined, undefined, '/register', '/home', <Register />)}
      {makePrivate(undefined, true, undefined, undefined, '/login', '/home', <Login />)}
      {makePrivate(undefined, undefined, true, undefined, '/new-password', '/login', <NewPassword />)}
      {makePrivate(undefined, true, true, undefined, '/recovery-password', '/home', <RecoveryPassword/>)}
      {makePrivate(true, true, undefined, undefined, '/loginAdmin', '/home-passenger', <LoginAdmin/>)}
      {makePrivate(true, undefined, undefined, undefined, '/adminPanel', '/loginAdmin', <AdminPanel />)}
      <Route path='/checkout' component={MercadoPago} />
      {makePrivate(true, undefined, true, true, '/trip/:id', '/login', <CardDetail/>)}
      {makePrivate(undefined, undefined, true, true, '/profile', '/home', <Profile/>)}
      {/* <Route exact path='/profile' component={Profile} /> */}
    </div>
  );
}

export default App;