import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../Styles/sweetalert.css'
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {swalArchiveCar, swalDeleteCar, swalEditCar} from "../../functions.js"


function TableOfCars(props) {
	let data = props.data

	data.carList.map(car => (
		car.bttn = <DropdownButton id="dropdown-basic-button" variant="dark" title="Options">
			<Dropdown.Item onClick={() => swalEditCar(car, data)}>Change Location</Dropdown.Item>
			<Dropdown.Item onClick={() => swalArchiveCar(car, data)}>Archive Car</Dropdown.Item>
			{data.roles.includes("admin") && <Dropdown.Item onClick={() => swalDeleteCar(car, data)}>Delete Car</Dropdown.Item>}
			<Dropdown.Item onClick={() => highlightCar(car)} as={Link} to='/map'>Show on map</Dropdown.Item>
			<Dropdown.Item as={Link} to={`/details/${car.vin}`}>View Details</Dropdown.Item>
		</DropdownButton>
	))

	let datatable = {
		columns: [
			{
				label: <b>Action</b>,
				field: 'bttn',
				width: 150,
			},
			{
				label: <b>VIN</b>,
				field: 'vin',
				width: 120,
				attributes: {
					'aria-controls': 'DataTable',
					'aria-label': 'VIN',
				},
			},
			{
				label: <b>Make Model</b>,
				field: 'make_model',
				width: 150,
			},
			{
				label: <b>Stock Number</b>,
				field: 'stockNum',
				width: 130,
			},
			{
				label: <b>Location</b>,
				field: 'spot_name',
				width: 130,
			}
		],
		rows: data.carList
	}

	function highlightCar(car) {
		data.carList.map(car => (car.highlighted = false))
		car.highlighted = true
	}

	return (
		<div>
			<MDBDataTable hover scrollX entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} order={['key']} />
		</div>
	)
}
export default TableOfCars