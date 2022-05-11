import React from 'react';
import '../../App.css';
import '../../Styles/map.css';
import 'materialize-css/dist/css/materialize.min.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import map from "../../Images/prototype_map.png";
import MapImage from "./MapImage.js";


function ParkingMap(props) {
	let data = props.data
	let carList = data.carList

	let cars2d = [...Array(6)].map(() => Array(6).fill(null));

	carList.map(car => enterCar(car))

	function enterCar(car) {
		let xSpot = car.spot_name.charCodeAt(0) - 97
		let ySpot = parseInt(car.spot_name.substring(1)) - 1
		cars2d[xSpot][ySpot] = car
	}

			

	return (
		<div className='mapImg'>
			<TransformWrapper>
				<TransformComponent minScale={8}>
				<MapImage carList={carList}/>
				</TransformComponent>
			</TransformWrapper>
		</div>
		);

	}

export default ParkingMap;