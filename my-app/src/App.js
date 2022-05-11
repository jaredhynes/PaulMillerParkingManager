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

const PATH = "https://gentle-thicket-28075.herokuapp.com/" // Use this for Heroku
//const PATH = "http://localhost:8001/"  // Use this for local testing



const App = () => {
	const [carList, setCarList] = useState(null);
	const [availableSpots, setAvailableSpots] = useState(null);
	const [edits, setEdits] = useState(null);
	const [allSpots, setAllSpots] = useState(null);
	const [auth0, setAuth0] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
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

			if (window.location.search.includes("code=") &&
				window.location.search.includes("state=")) {
				const { appState } = await authClient.handleRedirectCallback();
				onRedirectCallback(appState);
			}

			const authStatus = await authClient.isAuthenticated();
			setIsAuthenticated(authStatus)

			const authUser = await authClient.getUser();
			setUser(authUser)
			
			setIsLoading(false)

			if (!authStatus) {
				await authClient.loginWithRedirect({ redirect_uri: window.location.origin, appState: { returnTo: window.location.pathname } });
			}
			else{
				const authToken = await authClient.getTokenSilently({
					audience: 'https://quickstarts/api',
					scope: "delete:cars read:cars read:edits update:cars"
				})
				setToken(authToken)
				Axios.defaults.baseURL = PATH
				Axios.defaults.headers.common = { 'Authorization': `Bearer ${authToken}` }
			}
		}

		const onRedirectCallback = (appState) => {
			navigate(
				appState && appState.returnTo
					? appState.returnTo
					: window.location.pathname
			);
		}

		initAuth0()
		if (token){
			fetchSpots();
			fetchCars();
			fetchAvailableSpots();
			fetchHistory();			
		}
	}, [navigate, token]);

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

	let data = { Axios, update, carList, availableSpots, allSpots, edits, user, roles, PATH, auth0 };

	return (
		<div>
			<Navbar edits={edits} app={this} isAuthenticated={isAuthenticated} data={data} />
			{isLoading ? <h1>Loading...</h1> :
				(isAuthenticated &&
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
