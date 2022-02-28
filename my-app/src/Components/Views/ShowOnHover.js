import {React, useState} from 'react';

const ShowOnHover = (props) => {
	const [style, setStyle] = useState({display: 'none'});

	return (
		<div>
			<div style={{border: '1px solid gray', background: props.car && props.car.highlighted && "yellow", width: 125, height: 125, padding: 10, margin: 10}}
				onMouseEnter={() => {
					setStyle({display: 'block'});
				}}
				onMouseLeave={() => {
					setStyle({display: 'none'})
				}}
			>
				{props.car &&
				<p style={style}>VIN: {props.car.key}
				<br></br>Make/Model: {props.car.make_model}
				<br></br>Stock Number: {props.car.stockNum}
				<br></br>Location: {props.car.spot_name}</p>}
			</div>
		</div>
	);
};
export default ShowOnHover