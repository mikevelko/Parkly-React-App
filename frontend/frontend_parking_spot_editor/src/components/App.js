import logo from '../assets/logo.svg';
import './App.css';
import './ParkingSpotEditor'
import ParkingSpotEditor from './ParkingSpotEditor';
import Overview from './Overview'
import ParkingSpotDetails from './ParkingSpotDetails'
import react from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"

function App() {
  return (
    <Router>
      <>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Details/1">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      <Switch>
        <Route exact path={"/"} component={Overview}/>
        <Route exact path="/ParkingSpotEditor/:id" component={ParkingSpotEditor}/>
        <Route path="/ParkingSpotEditor" component={ParkingSpotEditor}/>
        <Route path="/Details/:id" component={ParkingSpotDetails}/>
      </Switch>
      </>
    </Router>
  );
}

export default App;
