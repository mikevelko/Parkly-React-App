import logo from '../assets/logo.svg';
import './App.css';
import './ParkingSpotEditor'
import ParkingSpotEditor from './ParkingSpotEditor';
import ParkingSpotAdder from './ParkingSpotAdder';
import Overview from './Overview'
import ParkingSpotDetails from './ParkingSpotDetails'
import AllBookings from './AllBookings'
import react,{useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import LoginPage from './LoginPage';
const TokenContext = react.createContext();

function App() {
  const [securityToken, setSecurityToken] = useState();
  const [detailsID, setDetailsID] = useState();
  return (
    <TokenContext.Provider value ={securityToken}>
    <Router>
      <Switch>
        <Route path={"/login"} component={() => <LoginPage token={securityToken} setToken={(token) => setSecurityToken(token)}/>} />
        {!securityToken && <Route path="/">
          <Redirect to="/login"/>
        </Route>}
        <Route exact path={"/"} component={() => <Overview token={securityToken} onClickOverViewItem={(id) => setDetailsID(id)}/>}/>
        <Route exact path="/ParkingSpotEditor/:id" component={() => <ParkingSpotEditor token={securityToken} id={detailsID}/>}/>
        <Route path="/ParkingSpotAdder" component={() => <ParkingSpotAdder token={securityToken}/>}/>
        <Route path="/Details/:id" component={() => <ParkingSpotDetails token={securityToken} itemID={detailsID}/>}/>
        <Route path="/AllBookings" component={() => <AllBookings token={securityToken}/>}/>

      </Switch>
    </Router>
    </TokenContext.Provider>
  );
}

export default App;
