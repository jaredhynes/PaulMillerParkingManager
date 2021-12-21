import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App.js';
import '../../Styles/Navbar.css'
import ParkingMap from '../Views/ParkingMap.js';
import CompleteHistory from '../Views/CompleteHistory.js'
import Login from '../Login/index.js'
import 'materialize-css/dist/css/materialize.min.css';

let logins = new Map();
logins.set("admin", {password:"admin", isAdmin:true});
logins.set("user", {password:"user", isAdmin:false});
 
const Navbar = (props) => {
 
  const openMap = (event) => {
    event.preventDefault(event)
    ReactDOM.render(
      <ParkingMap edits={props.edits}/>,
      document.getElementById('root')
    );
  }

  const openHistory = (event) => { 
    event.preventDefault(event)
    ReactDOM.render(
      <CompleteHistory edits={props.edits}/>,
      document.getElementById('root')
    );
  }

  const goHome = (event) => {
    event.preventDefault(event)
    ReactDOM.render(
      <App/>,
      document.getElementById('root')
    );
  }

  const logOut = (event) => {
    event.preventDefault(event)
    ReactDOM.render(
      <Login/>,
      document.getElementById('root')
    );
  }

   return(
    <header>
    <nav>
      <div class="nav-wrapper">
        <a href="/" onClick={goHome} class="brand-logo">Paul Miller INC.</a>
        <a href="/" data-target="mobile-nav" class="sidenav-trigger"></a>
        <ul id="desktop-nav" class="right hide-on-med-and-down">
          <li><button class="navigate" onClick={goHome}>Home</button></li>
          <li><button class="navigate" onClick={openMap} >Map</button></li>
          <li><button class="navigate" onClick={openHistory}>Show Edit History (Administrative mode only)</button></li>
          <li class="btn" onClick={logOut}>Log Out</li>
        </ul>
      </div>
    </nav>
    <ul id="mobile-nav" class="sidenav">
      <li>Home</li>
      <li>Map</li>
      <li>Move Car???</li>
      <li>Show Edit History (Administrative mode only)</li>
      <li class="btn" onClick={logOut}>Log Out</li>
    </ul>
  </header>
   )
}
 
export default Navbar;