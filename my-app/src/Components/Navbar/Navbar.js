import React from 'react'; 
import '../../Styles/NavBar.css'
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../Styles/sweetalert.css'

const Navbar = () => {
	return (
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
			</div>
			{<DropdownButton id="mobile-nav" class="sidenav" title="Menu">
				<Dropdown.Item> <Link to="/">Home </Link></Dropdown.Item>
				<Dropdown.Item> <Link to="/map">Map</Link></Dropdown.Item>
				<Dropdown.Item><Link to="/history">Edit History</Link></Dropdown.Item>
				<Dropdown.Item><Link to="login">Log-in/Out</Link></Dropdown.Item>

			</DropdownButton>}
		</header>
	)
}

export default Navbar;