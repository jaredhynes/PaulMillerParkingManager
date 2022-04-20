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

const PATH = "https://gentle-thicket-28075.herokuapp.com/" // Use this for Heroku
//const PATH = "http://localhost:8001/"  // Use this for local testing

const App = () => {
	const [carList, setCarList] = useState(null);
	const [availableSpots, setAvailableSpots] = useState(null);
	const [eventHistory, setEventHistory] = useState(null);
	const [allSpots, setAllSpots] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	const { isLoading, user, isAuthenticated, loginWithRedirect, getAccessTokenSilently} = useAuth0();


	useEffect(() => {
		const getToken = async () => {
			setAccessToken(await getAccessTokenSilently({
				audience: 'https://quickstarts/api',
				scope: "delete:cars read:cars read:edits update:cars"
			}));
		}

		if (isAuthenticated) {
			if (!accessToken) {
				getToken();
			}
			else {
				Axios.defaults.baseURL = PATH
				Axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }
				fetchSpots();
				fetchCars();
				fetchAvailableSpots();
				fetchHistory();
			}
		}
	}, [accessToken, getAccessTokenSilently, isAuthenticated]);

	function warningMessage() {
		Swal.fire({
			title: 'Warning! You are not signed in.',
			text: "You will not be able to access anything until you are signed in.",
			icon: 'warning',
			showCancelButton: false,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Login!'
		}).then((result) => {
			loginWithRedirect({ appState: { targetUrl: window.location.pathname } });
		})
	}

	const fetchCars = () => {
		Axios.get("cars").then((response) => {
			setCarList(response.data);
		})
	}

	const fetchAvailableSpots = () => {
		Axios.get("availableSpots").then((response) => {
			setAvailableSpots(response.data);
		})
	}

	const fetchSpots = () => {
		Axios.get("getAllSpots").then((response) => {
			setAllSpots(response.data);
		})
	}

	const fetchHistory = () => {
		Axios.get("getHistory").then((response) => {
			setEventHistory(response.data);
		})
	}

	function checkLists() {
		return carList && availableSpots && allSpots && eventHistory
	}

	let roles = []
	if (user) {
		roles = user['http://demozero.net/roles']
	}

	function update() {
		fetchSpots();
		fetchCars();
		fetchAvailableSpots();
		fetchHistory();
	}

	return (
		<Router>
			<Navbar edits={eventHistory} app={this} isAuthenticated={isAuthenticated} />
			{isLoading ? <h1>Loading...</h1> :
				(!isAuthenticated ? warningMessage() :
					(checkLists() ?
						<Routes>
							<Route path="/" element={<Home Axios={Axios} update={() => update()} carList={carList} availableSpots={availableSpots} allSpots={allSpots} edits={eventHistory} user={user} roles={roles} PATH={PATH} accessToken={accessToken} />} />
							<Route path="/map" element={<ParkingMap carList={carList} update={() => update()} availableSpots={availableSpots} edits={eventHistory} user={user} roles={roles} PATH={PATH} accessToken={accessToken} />} />
							<Route path="/history" element={<Edits carList={carList} update={() => update()} availableSpots={availableSpots} allSpots={allSpots} edits={eventHistory} user={user} roles={roles} PATH={PATH} accessToken={accessToken} />} />
							<Route path="/account" element={<Account PATH={PATH} update={() => update()} accessToken={accessToken} user={user} />} />
							<Route path="/details/:vin" element={<CarPage carList={carList} Axios={Axios} update={() => update()} edits={eventHistory} accessToken={accessToken} roles={roles} availableSpots={availableSpots} allSpots={allSpots} user={user}/>} />
						</Routes> :
						<h1>Fetching Data...</h1>
					)
				)}
		</Router>
	);
}

export default App;
