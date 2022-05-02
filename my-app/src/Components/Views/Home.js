import React from 'react';
import '../../App.css';
import '../../Styles/sweetalert.css'
import Button from 'react-bootstrap/Button'
import TableOfCars from './TableOfCars';
import swalAddCar from '../../functions.js'
import { Checkbox } from '@mui/material';

function Home(props) {
	let data = props.data

	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<div className="App">
			<label>
				<Checkbox
				checked={checked}
          		onChange={handleChange}
				/>
				View Archived Cars
			</label>
			{data.carList && <TableOfCars data={data} showArchived={checked} />}
			<Button variant="dark" onClick={() => swalAddCar(data)}>Add Car</Button>
		</div>
	);
}

export default Home;