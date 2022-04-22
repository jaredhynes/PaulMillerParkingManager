import React from 'react';
import '../../App.css';
import '../../Styles/sweetalert.css'
import Button from 'react-bootstrap/Button'
import TableOfCars from './TableOfCars';
import swalAddCar from '../../functions.js'
import video from "../video/Paul_Miller_Audi.mp4"

function Home(props) {
	let data = props.data

	return (
		<div className="App">
			{data.carList && <TableOfCars data={data} />}
			<Button variant="dark" onClick={() => swalAddCar(data)}>Add Car</Button>
		</div>
	);
}

export default Home;