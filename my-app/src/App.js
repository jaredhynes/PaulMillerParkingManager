import { React, useEffect, useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import Edits from "./Components/Views/Edits.js"
import 'materialize-css/dist/css/materialize.min.css';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';


const App = () => {
	let edits = []

	const [carList, setCarList] = useState(null);
	const [availableSpots, setAvailableSpots] = useState(null);

	useEffect(() => {
		fetchCars()
		fetchsAvailableSpots()
		console.log("success")
	}, [])

	const fetchCars = () => {
		Axios.get("http://localhost:8001/cars").then((response) => {
			//console.log("success");
			console.log(response.data)
			setCarList(response.data);
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

	const {isAuthenticated} = useAuth0()

	return (
		<Router>
			<div>
				<Navbar edits={edits} app={this} isAuthenticated={isAuthenticated}/>

				{isAuthenticated && carList && <Routes>
					<Route path="/" element={<Home carList={carList} availableSpots={availableSpots} edits={edits} update={update} />}>
					</Route>
					<Route path="/map" element={<ParkingMap carList={carList} availableSpots={availableSpots} edits={edits} update={update} />}>
					</Route>
					<Route path="/history" element={<Edits carList={carList} availableSpots={availableSpots} edits={edits} update={update} />}>
					</Route>
				</Routes>}

			</div>
		</Router>
	);
}

export default App;
