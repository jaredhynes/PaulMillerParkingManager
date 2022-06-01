import { React, useEffect, useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import Account from "./Components/Views/Account.js"
import Edits from "./Components/Views/Edits.js"
import 'materialize-css/dist/css/materialize.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import CarPage from './Components/Views/CarPage';
import createAuth0Client from '@auth0/auth0-spa-js';
import Swal from 'sweetalert2';

//const PATH = "https://gentle-thicket-28075.herokuapp.com/" // Use this for Heroku
const PATH = "http://localhost:8001/"  // Use this for local testing



const App = () => {
	const [carList, setCarList] = useState(null);
	const [availableSpots, setAvailableSpots] = useState(null);
	const [edits, setEdits] = useState(null);
	const [allSpots, setAllSpots] = useState(null);
	const [auth0, setAuth0] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const navigate = useNavigate()

	useEffect(() => {
		const initAuth0 = async () => {
			const authClient = await createAuth0Client({
				domain: "dev-w1z8wy-p.us.auth0.com",
				client_id: "RHaM86sHqrwsD6rk8wTpi1YsU2z9FyhQ",
				redirect_uri: window.location.origin,
				useRefreshTokens: true,
				cacheLocation: 'localstorage',
				audience: "https://quickstarts/api",
				scope: "delete:cars read:cars read:edits update:cars"
			})
			setAuth0(authClient);

			if (window.location.href.includes("?code=") && window.location.href.includes("&state=")) {
				const { appState } = await authClient.handleRedirectCallback();
				navigate(
					appState && appState.returnTo
						? appState.returnTo
						: window.location.pathname
				);
			}

			const authStatus = await authClient.isAuthenticated();
			setIsAuthenticated(authStatus);

			if (authStatus) {
				const authUser = await authClient.getUser();
				setUser(authUser)

				const authToken = await authClient.getTokenSilently({
					audience: 'https://quickstarts/api',
					scope: "delete:cars read:cars read:edits update:cars"
				})
				setToken(authToken)
				Axios.defaults.baseURL = PATH
				Axios.defaults.headers.common = { 'Authorization': `Bearer ${authToken}` }
			}
			else {
				Swal.fire({
					title: 'You are not logged in',
					text: 'Please log in to continue',
					icon: 'warning',
					confirmButtonText: 'Log in',
					allowOutsideClick: false
				}).then(async () => {
					await authClient.loginWithRedirect({ appState: { returnTo: window.location.pathname } });
				})
			}
		}

		initAuth0()
		if (token) {
			fetchSpots();
			fetchCars();
			fetchAvailableSpots();
			fetchHistory();
		}

		console.log(carList);
	}, [navigate, token]);

	const fetchCars = () => {
		Axios.get("cars").then((response) => {
			setCarList(response.data.rows);
		})
	}

	const fetchAvailableSpots = () => {
		Axios.get("availableSpots").then((response) => {
			setAvailableSpots(response.data.rows);
		})
	}

	const fetchSpots = () => {
		Axios.get("getAllSpots").then((response) => {
			setAllSpots(response.data.rows);
		})
	}

	const fetchHistory = () => {
		Axios.get("getHistory").then((response) => {
			setEdits(response.data.rows);
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

	let data = { Axios, update, carList, availableSpots, allSpots, edits, user, roles, PATH, auth0 };

	return (
		<div>
			<Navbar edits={edits} app={this} isAuthenticated={isAuthenticated} data={data} />
			{checkLists() ?
				<Routes>
					<Route path="/" element={<Home data={data} />} />
					<Route path="/map" element={<ParkingMap data={data} />} />
					<Route path="/history" element={<Edits data={data} />} />
					<Route path="/account" element={<Account data={data} />} />
					<Route path="/details/:vin" element={<CarPage data={data} />} />
				</Routes> :
				<h1>Fetching Data...</h1>
			}
		</div>
	);
}

export default App;
