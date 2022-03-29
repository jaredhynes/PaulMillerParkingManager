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
import CarPage from './Components/Views/CarPage';
let edits = []

const PATH = "https://gentle-thicket-28075.herokuapp.com/" // Use this for Heroku
//const PATH = "http://localhost:8001/"  // Use this for local testing

const App = () => {
	const [carList, setCarList] = useState(null);
	const [availableSpots, setAvailableSpots] = useState(null);
	const [eventHistory, setEventHistory] = useState(null);
	const [allSpots, setAllSpots] = useState(null);

	useEffect(() => {
		fetchSpots();
		fetchCars()
		fetchAvailableSpots()
		fetchHistory();
	}, [])

	const fetchCars = () => {
		Axios.get(PATH + "cars").then((response) => {
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
			loginWithRedirect()
		})
	}

	const fetchAvailableSpots = () => {
		Axios.get(PATH + "availableSpots").then((response) => {
			setAvailableSpots(response.data);
		})
	}

	const fetchSpots = () => {
		Axios.get(PATH + "getAllSpots").then((response) => {	
			setAllSpots(response.data);
		})
	}

	const fetchHistory = () =>{
		Axios.get(PATH + "getHistory").then((response) =>{
			setEventHistory(response.data);
		})
	}

	function update() {
		fetchCars()
		fetchSpots()
		fetchAvailableSpots()
		fetchHistory();
	}

	const { isLoading, user, isAuthenticated, loginWithRedirect } = useAuth0()

	let roles = []
	if (user) {
		roles = user['http://demozero.net/roles']
	}

	return (
		<Router>

			<Navbar edits={edits} app={this} isAuthenticated={isAuthenticated} />

			{isLoading && <h1>Loading Data...</h1>}
			{!isLoading &&
				<div>
					{!isAuthenticated && warningMessage()}

					{isAuthenticated && carList && <Routes>

						<Route path="/" element={<Home carList={carList} availableSpots={availableSpots} allSpots={allSpots} edits={edits} update={() => update()} user={user} roles={roles} PATH={PATH} />}/>
						<Route path="/map" element={<ParkingMap carList={carList} availableSpots={availableSpots} edits={edits} update={() => update()} user={user} roles={roles} PATH={PATH} />}/>
						<Route path="/history" element={<Edits carList={carList} availableSpots={availableSpots} allSpots={allSpots} edits={eventHistory} update={() => update()} user={user} roles={roles} PATH={PATH} />}/>
						<Route path="/account" element={<Account PATH={PATH}/>}/>
						<Route path="/details/:vin" element={<CarPage carList={carList}/>}/>
					</Routes>}

				</div>}

		</Router>
	);
}

export default App;
