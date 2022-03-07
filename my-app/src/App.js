import { React, useEffect, useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import Account from "./Components/Views/Account.js"
import Edits from "./Components/Views/Edits.js"
import 'materialize-css/dist/css/materialize.min.css';
import Swal from 'sweetalert2'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/esm/Button';
let edits = []



const App = () => {

	const [carList, setCarList] = useState(null);
	const [availableSpots, setAvailableSpots] = useState(null);

	useEffect(() => {
		fetchCars()
		fetchsAvailableSpots()
	}, [])

	const fetchCars = () => {
		Axios.get("http://localhost:8001/cars").then((response) => {
			//console.log("success");
			console.log(response.data)
			setCarList(response.data);
		})
	}

	function warningMessage() {
		Swal.fire({
			title: 'Warning! You are not signed in.',
			text: "You will not be able to access anything until you are signed in.",
			icon: 'warning',
			showCancelButton: false,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Login!'
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Login button goes here'
			  )
			}
		  })
	}

	const fetchsAvailableSpots = () => {
		Axios.get("http://localhost:8001/availableSpots").then((response) => {
			//console.log("success");
			console.log(response.data)
			setAvailableSpots(response.data);
		})
	}

	function useForceUpdate() {
		// eslint-disable-next-line
		const [value, setValue] = useState(0); // integer state
		return () => setValue(value => value + 1); // update the state to force render
	}
	let update = useForceUpdate()

	const {user, isAuthenticated} = useAuth0()
	
	let roles = []
	if (user){
	    roles = user['http://demozero.net/roles']
	}

	return (
		<Router>
			<div>
				<Navbar edits={edits} app={this} isAuthenticated={isAuthenticated}/>

				{!isAuthenticated && warningMessage()}

				{isAuthenticated && !roles.includes('user') && <h1>{user.email} is not a registered user</h1>}

				{roles.includes("user") && carList && <Routes>
					<Route path="/" element={<Home carList={carList} availableSpots={availableSpots} edits={edits} update={update} user={user} />}>
					</Route>
					<Route path="/map" element={<ParkingMap carList={carList} availableSpots={availableSpots} edits={edits} update={update} user={user} />}>
					</Route>
					{roles.includes("admin") &&
					<Route path="/history" element={<Edits carList={carList} availableSpots={availableSpots} edits={edits} update={update} user={user} />}>
					</Route>}
					<Route path="/account" element={<Account />}></Route>
				</Routes>}

			</div>
		</Router>
	);
}

export default App;
