import React from 'react';import '../../Styles/NavBar.css'
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../Styles/sweetalert.css'
import { useHistory } from 'react-router-dom'

// function NavigateHome() {
//   let history = useHistory();
  
//   const redirect = () => {
//     history.push('/')
//   }

// }

const Navbar = () => {
   return(
    <header>
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">Paul Miller INC.</a>
        {/* <a href="/" data-target="mobile-nav" class="sidenav-trigger">Mobile Menu</a> */}
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
    <div>
      {/* function NavigateHome() {

      } */}
    </div>
    {/* <DropdownButton id="mobile-nav" class="sidenav" title="Menu">
   <Dropdown.Item onClick={NavigateHome()}>Home</Dropdown.Item>
   <Dropdown.Item onClick={NavigateMap()}>Map</Dropdown.Item>
   <Dropdown.Item onClick={NavigateHistory()}>Edit History</Dropdown.Item>
   <Dropdown.Item onClick={NavigateLogin()}>Log-in/Out</Dropdown.Item>

    </DropdownButton> */}
  </header>
   )
}

// props.carList.map(car => {
//   car.bttn = <DropdownButton id="dropdown-basic-button" title="Edit car">
//   <Dropdown.Item onClick={() => props.swalEditCar(car)}>Change Location</Dropdown.Item>
//   <Dropdown.Item onClick={() => swalArchiveCar(car)}>Archive Car</Dropdown.Item>
//   <Dropdown.Item onClick={() => swalDeleteCar(car)}>Delete Car</Dropdown.Item>
// </DropdownButton>
// })
 
export default Navbar;