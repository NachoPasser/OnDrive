import { Route } from 'react-router-dom'
import React from 'react';
import Home from './Home/home';
import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.jsx';
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import RecoveryPassword from "./components/pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "./components/pages/NewPassword/NewPassword";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function makePrivate(ruta, ruta_a_redirigir, componente_a_renderizar){
  return (
    <Route path={ruta}>
      <PrivateRoute redirect={ruta_a_redirigir}>
        {componente_a_renderizar}
      </PrivateRoute>
    </Route>
  )
}

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      {makePrivate('/new-password', '/login', <NewPassword/>)}
      {makePrivate('/recovery-password', '/login', <RecoveryPassword/>)}
    </div>
  );
}

export default App;
