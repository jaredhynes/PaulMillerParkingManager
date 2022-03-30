import React, { Component } from 'react';
import '../../App.css';
import '../../Styles/map.css';
import 'materialize-css/dist/css/materialize.min.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import map from "../../Images/prototype_map.png";
import MapImage from "./MapImage.js"
// import { Responsive, WidthProvider } from "react-grid-layout";


// const ResponsiveGridLayout = WidthProvider(Responsive);

function ParkingMap(props) {
	let carList = props.carList

	let cars2d = [...Array(6)].map(() => Array(6).fill(null));

	carList.map(car => enterCar(car))

	function enterCar(car) {
		let xSpot = car.spot_name.charCodeAt(0) - 97
		let ySpot = parseInt(car.spot_name.substring(1)) - 1
		cars2d[xSpot][ySpot] = car
	}

	function highlightCar(car) {
		if (car) {
			props.carList.map(car => (car.highlighted = false))
			car.highlighted = true
			props.update()
		}
	}

	// function getLayoutsFromSomewhere() {
	// 	<Container>
	// 			{cars2d.map((row) => (
	// 				<Row>
	// 					{row.map((car) => (
	// 						<Col onClick={() => highlightCar(car)}>
	// 							<ShowOnHover car={car} />
	// 						</Col>
	// 					))}
	// 				</Row>
	// 			))}
	// 		</Container>
	// }

	// class MyResponsiveGrid extends React.Component {
	// 	render() {
	// 		var layouts = getLayoutsFromSomewhere();
			

	return (
		<div className='mapImg'>
			<TransformWrapper>
				<TransformComponent>
				<MapImage/>
				</TransformComponent>
			</TransformWrapper>
			{/* <MapImage/> */}

		</div>
		);

	}
// }
// }

export default ParkingMap;