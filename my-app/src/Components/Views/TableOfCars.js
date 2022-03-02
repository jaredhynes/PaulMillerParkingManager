import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2'
import '../../Styles/sweetalert.css'
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

function TableOfCars(props) {
	props.carList.map(car => (
		car.bttn = <DropdownButton id="dropdown-basic-button" title="Options">
			<Dropdown.Item onClick={() => swalEditCar(car)}>Change Location</Dropdown.Item>
			<Dropdown.Item onClick={() => swalArchiveCar(car)}>Archive Car</Dropdown.Item>
			<Dropdown.Item onClick={() => swalDeleteCar(car)}>Delete Car</Dropdown.Item>
			<Dropdown.Item onClick={() => highlightCar(car)}><Link to='/map'>Show on map</Link></Dropdown.Item>
		</DropdownButton>
	))
	let datatable = {
		columns: [
			{
				label: 'Action',
				field: 'bttn',
				width: 400,
			},
			{
				label: 'VIN',
				field: 'vin',
				width: 160,
				attributes: {
					'aria-controls': 'DataTable',
					'aria-label': 'VIN',
				},
			},
			{
				label: 'Make Model',
				field: 'make_model',
				width: 280,
			},
			{
				label: 'Stock Number',
				field: 'stockNum',
				width: 210,
			},
			{
				label: 'Location',
				field: 'spot_name',
				width: 110,
			}
		],
		rows: props.carList
	}

	function swalEditCar(car, spot = "") {
		Swal.fire({
			title: 'Edit Car Location',
			html: `<input type="text" id="newSpot" class="swal2-input" placeholder=${car.newSpot} value=${spot}>`,
			confirmButtonText: 'Edit Car',
			showCancelButton: true,
			focusConfirm: false,
			preConfirm: () => {
				const newSpot = Swal.getPopup().querySelector('#newSpot').value

				if (!newSpot) {
					Swal.showValidationMessage(`Please enter a location`)
				}

				if (!props.isSpotAvailable(newSpot)) {
					Swal.showValidationMessage(`${newSpot} is not an available spot.`)
				}

				return { car: car, newSpot: newSpot }
			}
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					icon: 'question',
					title: "Is this Information Correct?",
					html: `<p> Old Location: ${car.newSpot} </p>
					<p>New Location: ${result.value.newSpot} </p>`,
					showDenyButton: true,
					confirmButtonText: "Yes",
					denyButtonText: "No",
					preConfirm: () => {
						return { car: car, newSpot: result.value.newSpot }
					},
					preDeny: () => {
						return { car: car, newSpot: result.value.newSpot }
					}
				}).then((result) => {
					if (result.isConfirmed) {
						Swal.fire({
							icon: "success",
							title: "Saved",
							html: `<p> Old Location: ${car.newSpot} </p>
											<p>New Location: ${result.value.newSpot} </p>`,
						})
						props.editCar(car, result.value.newSpot)
					}
					else if (result.isDenied) {
						swalEditCar(car, result.value.newSpot);
					}
				})
			}
		})
	}

	function swalArchiveCar(car) {
		Swal.fire({
			title: 'Are you sure you would like to archive this car?',
			text: "This will remove it from the parking lot but keep it stored in the database.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, archive it!'
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Archived!',
					'The data has been successfully stored.',
					'success'
				)
			}
		})
	}

	function swalDeleteCar(car) {
		Swal.fire({
			title: 'Are you sure you would like to delete this car?',
			text: "This will remove it from the parking lot and delete all stored data.",
			icon: 'warning',
			footer: 'This change is permanent.',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Deleted!',
					'The car and data have been successfully deleted.',
					'success'
				)
				props.deleteCar(car)
			}
		})
	}

	function highlightCar(car) {
		props.carList.map(car => (car.highlighted = false))
		car.highlighted = true
	}

	return (
		<div>
			<MDBDataTable entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} order={['key', 'asc']} />
		</div>
	)
}
export default TableOfCars