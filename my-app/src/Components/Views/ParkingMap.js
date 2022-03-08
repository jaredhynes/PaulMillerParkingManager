import React from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
import ShowOnHover from './ShowOnHover';
import { Container, Row, Col } from 'react-grid-system';
// import { Responsive, WidthProvider } from "react-grid-layout";


// const ResponsiveGridLayout = WidthProvider(Responsive);

function ParkingMap(props) {
	let carList = props.carList

	let cars2d = [...Array(6)].map(() => Array(6).fill(null));

	carList.map(car => enterCar(car))

	function enterCar(car) {
		let location = car.spot_name.split('-')
		let xSpot = location[0].charCodeAt(0) - 97
		let ySpot = parseInt(location[1]) - 1
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
		<div>
			{/* <ResponsiveGridLayout
				className="layout"
				layouts ={layouts}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
				>
					<div key="1">1</div>
					<div key="2">2</div>
					<div key="3">3</div>
				</ResponsiveGridLayout> */}
			{ <Container fluid>
				{cars2d.map((row) => (
					<Row debug>
						{row.map((car) => (
							<Col onClick={() => highlightCar(car)}>
								<ShowOnHover car={car} />
							</Col>
						))}
					</Row>
				))}
			</Container> }
		</div>
		);

	}
// }
// }

export default ParkingMap;