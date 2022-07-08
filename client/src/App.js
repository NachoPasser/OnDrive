import { Route } from 'react-router-dom'

import Home from './Home/home';
import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.jsx';
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import RecoveryPassword from "./components/pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "./components/pages/NewPassword/NewPassword";

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/new-password' component={NewPassword} />
      <Route path='/recovery-password' component={RecoveryPassword} />
    </div>
  );
}

export default App;
