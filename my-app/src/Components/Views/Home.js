import React from 'react';
import '../../App.css';
import '../../Styles/sweetalert.css'
import Button from 'react-bootstrap/Button'
import TableOfCars from './TableOfCars';
import swalAddCar from '../../functions.js'

function Home(props) {
	let carList = props.carList
	let availableSpots = props.availableSpots

	return (
		<div className="App">
			{carList && <TableOfCars Axios={props.Axios} update={() => props.update()} carList={carList} user={props.user} PATH={props.PATH} availableSpots={availableSpots} allSpots={props.allSpots} roles={props.roles} />}
			<Button variant="dark" onClick={() => swalAddCar(props.Axios, props.update, props.user, props.availableSpots, props.allSpots)}>Add Car</Button>
		</div>
	);
}

export default Home;