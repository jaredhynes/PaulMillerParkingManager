import React from 'react';import '../../Styles/NavBar.css'
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';


let logins = new Map();
logins.set("admin", {password:"admin", isAdmin:true});
logins.set("user", {password:"user", isAdmin:false});
 
const Navbar = (props) => {
   return(
    <header>
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">Paul Miller INC.</a>
        <a href="/" data-target="mobile-nav" class="sidenav-trigger">Mobile Menu</a>
        <ul id="desktop-nav" class="right hide-on-med-and-down">
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/map">Map</Link>
                  </li>
                  <li>
                    <Link to="/history">Edit History</Link>
                  </li>
                  <li>
                    <Link to="/login">Log Out</Link>
                  </li>
                </ul>
              </nav>
            </div>
        </ul>
      </div>
    </nav>
    <ul id="mobile-nav" class="sidenav">
      <li>Home</li>
      <li>Map</li>
      <li>Move Car???</li>
      <li>Show Edit History (Administrative mode only)</li>
      <li class="btn">Log Out</li>
    </ul>
  </header>
   )
}
 
export default Navbar;