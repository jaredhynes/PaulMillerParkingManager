import { React, useEffect, useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import Account from "./Components/Views/Account.js"
import Edits from "./Components/Views/Edits.js"
import 'materialize-css/dist/css/materialize.min.css';
import Swal from 'sweetalert2'
import {Routes,	Route} from 'react-router-dom';
import Axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import CarPage from './Components/Views/CarPage';

const PATH = "https://gentle-thicket-28075.herokuapp.com/" // Use this for Heroku
//const PATH = "http://localhost:8001/"  // Use this for local testing

const App = () => {
	const [carList, setCarList] = useState(null);
	const [availableSpots, setAvailableSpots] = useState(null);
	const [edits, setEdits] = useState(null);
	const [allSpots, setAllSpots] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	const { isLoading, user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();


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
			loginWithRedirect({ appState: { returnTo: window.location.pathname } });
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
			setEdits(response.data);
		})
	}

	function checkLists() {
		return carList && availableSpots && allSpots && (roles.includes("admin") ? edits : true);
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

	let data = { Axios, update, carList, availableSpots, allSpots, edits, user, roles, PATH, accessToken }

	return (
		<div>
			<Navbar edits={edits} app={this} isAuthenticated={isAuthenticated} data={data} />
			{isLoading ? <h1>Loading...</h1> :
				(!isAuthenticated ? warningMessage() :
					(checkLists() ?
						<Routes>
							<Route path="/" element={<Home data={data} />} />
							<Route path="/map" element={<ParkingMap data={data} />} />
							<Route path="/history" element={<Edits data={data} />} />
							<Route path="/account" element={<Account data={data} />} />
							<Route path="/details/:vin" element={<CarPage data={data} />} />
						</Routes> :
						<h1>Fetching Data...</h1>
					)
				)}
		</div>
	);
}

export default App;
