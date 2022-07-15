import { Route } from 'react-router-dom'
import React from 'react';
import Home from './Home/home';
import './App.css';
import LandingPage from './components/pages/LandingPage/LandingPage.jsx';
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import RecoveryPassword from "./components/pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "./components/pages/NewPassword/NewPassword";
import AdminPanel from './components/AdminPanel/AdminPanel';
import LoginAdmin from './components/pages/LoginAdmin/LoginAdmin';
import PrivateRouteForNotAdmin from './components/PrivateRoutes/PrivateRouteForNotAdmin/PrivateRouteForNotAdmin';
import PrivateRouteForLogged from './components/PrivateRoutes/PrivateRouteForLogged/PrivateRouteForLogged';
import PrivateRouteForNotLogged from './components/PrivateRoutes/PrivateRouteForNotLogged/PrivateRouteForNotLogged';

function makePrivateForVisitors(route, route_to_redirect, component_to_render){
  return (
    <Route path={route}>
      <PrivateRouteForNotLogged redirect={route_to_redirect}>
        {component_to_render}
      </PrivateRouteForNotLogged>
    </Route>
  )
}

function makePrivateForLoggedUsers(route, route_to_redirect, component_to_render){
  return (
  <Route path={route}>
      <PrivateRouteForLogged redirect={route_to_redirect}>
        {component_to_render}
      </PrivateRouteForLogged>
  </Route>
  )
}

function makePrivateForNotAdmins(route, route_to_redirect, component_to_render){
  return (
    <Route path={route}>
      <PrivateRouteForNotAdmin redirect={route_to_redirect}>
        {component_to_render}
      </PrivateRouteForNotAdmin>
    </Route>
  )
}

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route path='/loginAdmin' component={LoginAdmin}/>
      {makePrivateForLoggedUsers('/login', '/home', <Login/>)}
      {makePrivateForLoggedUsers('/register', '/home', <Register/>)}
      {makePrivateForNotAdmins('/adminPanel', '/loginAdmin', <AdminPanel/>)}
      {makePrivateForVisitors('/new-password', '/login', <NewPassword/>)}
      <Route path='/recovery-password' component={RecoveryPassword}/>
    </div>
  );
}

export default App;
