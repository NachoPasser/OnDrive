import {Route} from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage';
// import Home from './Home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      {/* <Route path='/home' component={Home}/> */}
    </div>
  );
}

export default App;
