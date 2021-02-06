import logo from '../assets/logo.svg';
import './App.css';
import './ParkingSpotEditor'
import ParkingSpotEditor from './ParkingSpotEditor';
import Overview from './Overview'
import ParkingSpotDetails from './ParkingSpotDetails'
import react,{useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import LoginPage from './LoginPage';
const TokenContext = React.createContext();

function App() {
  const [securityToken, setSecurityToken] = useState();
  return (
    <TokenContext.Provider value ={securityToken}>
    <Router>
      <Switch>
        <Route path={"/login"} component={() => <LoginPage token={securityToken} setToken={(token) => setSecurityToken(token)}/>} />
        {!securityToken && <Route path="/">
          <Redirect to="/login"/>
        </Route>}
        <Route exact path={"/"} component={Overview}/>
        <Route exact path="/ParkingSpotEditor/:id" component={ParkingSpotEditor}/>
        <Route path="/ParkingSpotEditor" component={ParkingSpotEditor}/>
        <Route path="/Details/:id" component={ParkingSpotDetails}/>
      </Switch>
    </Router>
    </TokenContext.Provider>
  );
}

export default App;
