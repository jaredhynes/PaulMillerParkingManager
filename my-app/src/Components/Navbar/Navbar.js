import React from 'react';
import '../../Styles/NavBar.css'
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../Styles/sweetalert.css'
import { Button } from 'react-bootstrap';
import { resethighlightCar } from '../../functions';


const Navbar = (props) => {
	return (
		<div>
		<header>
			<nav>
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo">Paul Miller INC.</Link>
					{/* <a href="/" data-target="mobile-nav" className="sidenav-trigger">Mobile Menu</a> */}
					<ul id="desktop-nav" className="right hide-on-med-and-down">
						<div>
							<nav>
								<ul>
									<li>
										<Link onClick={() => resethighlightCar()} to="/">Home ⌂</Link>
									</li>
									<li>
										<Link onClick={() => resethighlightCar()} to="/map">Map 🖈</Link>
									</li>
									<li>
										<Link onClick={() => resethighlightCar()} to="/history">Edit History</Link>
									</li>
									<li>
										<Link onClick={() => resethighlightCar()} to="/account">Account Settings ⚙︎</Link>
									</li>
									<Button onClick={() => props.data.update()}>Update Data</Button>
								</ul>
							</nav>
						</div>
					</ul>
				</div>
			</nav>
			<div>
			</div>
			{<DropdownButton id="mobile-nav" title="Menu" menuVariant="dark">
				<Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
				<Dropdown.Item as={Link} to="/map">Map</Dropdown.Item>
				<Dropdown.Item as={Link} to="/history">Edit History</Dropdown.Item>
				<Dropdown.Item as={Link} to="/account">Account Settings</Dropdown.Item>
			</DropdownButton>}
		</header>
		</div>
	)
}

export default Navbar;