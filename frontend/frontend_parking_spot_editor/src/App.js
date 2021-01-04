import logo from './logo.svg';
import './App.css';
import './ParkingSpotEditor'
import ParkingSpotEditor from './ParkingSpotEditor';
import Overview from './Overview'
import Details from './Details.jsx'
import react from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"



function App() {
  const [url,setUrl] = react.useState('/Overview')


  return (
    <Router>
      <Switch>
        <Route path={"/Overview"}>
          <Overview
            redirectTo={(url)=>setUrl(url)}
          />
        </Route>

        <Route path="/ParkingSpotEditor">
          <ParkingSpotEditor
          redirectTo={(url)=>setUrl(url)}
          />
        </Route>

        <Route path="/Details">
          <Details
          redirectTo={(url)=>setUrl(url)}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
