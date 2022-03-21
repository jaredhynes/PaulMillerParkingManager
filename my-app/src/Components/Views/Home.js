import React from 'react';
import '../../App.css';
import Swal from 'sweetalert2'
import '../../Styles/sweetalert.css'
import Button from 'react-bootstrap/Button'
import TableOfCars from './TableOfCars';
import Axios from 'axios'


function Home(props) {
	let carList = props.carList
	let availableSpots = props.availableSpots
	let edits = props.edits;

	function getSpotID(spotName) {
		return availableSpots.find(el =>
			el.spot_name === spotName
		).spot_id;
	}

	function addCarDB(car) {
		Axios.post(props.PATH + "insertNewCar", {
			vin: car.value.vin,
			make_model: car.value.make_model,
			stockNum: car.value.stockNum,
			year: car.value.year,
			spot_id: getSpotID(car.value.location),
		}).then(() => {
			props.update()
		})
	}

	function addEvent(car, oldSpot, newSpot, event_type){
		Axios.post(props.PATH + "insertEvent", {
			car_id: car.value.vin,
			old_spot_id: oldSpot,
			new_spot_id: newSpot,
			user_id: props.user.email,
			event_type: event_type,
			event_date: Date().toLocaleString(),
		}).then(() => {
			console.log("added event");
		})
	}

	function swalAddCar(vin = "", make_model = "", year = "", stockNum = "", location = "") {
		Swal.fire({
			title: 'Add Car',
			// want to have the information there in the edit, not just random values. using ${result.value.vin} does not work!
			html: `<input type="text" id="vin" class="swal2-input" placeholder="VIN" value=${vin}>
			<input type="text" id="make_model" class="swal2-input" placeholder="Make/Model" value=${make_model}>
            <input type="text" id="year" class="swal2-input" placeholder="Year" value=${year}>
			<input type="text" id="stockNum" class="swal2-input" placeholder="Stock Number" value=${stockNum}>
			<input type="text" id="location" class="swal2-input" placeholder="Location" value=${location}>`,
			confirmButtonText: 'Add Car',
			showCancelButton: true,
			focusConfirm: false,
			preConfirm: () => {
				vin = Swal.getPopup().querySelector('#vin').value
				make_model = Swal.getPopup().querySelector('#make_model').value
				year = Swal.getPopup().querySelector('#year').value
				stockNum = Swal.getPopup().querySelector('#stockNum').value
				location = Swal.getPopup().querySelector('#location').value.toLowerCase()

				if (!vin || !make_model || !stockNum || !location || !year) {
					Swal.showValidationMessage(`Please enter all information`)
				}
				if (!isSpotAvailable(location)) {
					Swal.showValidationMessage(`${location} is not an available spot.`)
				}

				return { vin: vin, make_model: make_model, year: year, stockNum: stockNum, location: location }
			}
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					icon: 'question',
					title: "Is this Information Correct?",
					html: `<p> Vin Number: ${result.value.vin} </p>
					<p>Make/Model: ${result.value.make_model} </p>
                    <p>Make/Model: ${result.value.year} </p>
					<p>Stock Number: ${result.value.stockNum} </p>
					<p>Location: ${result.value.location} </p>`,
					showDenyButton: true,
					confirmButtonText: "Yes",
					denyButtonText: "No",
					preConfirm: () => {
						return { vin: result.value.vin, make_model: result.value.make_model, year: result.value.year, stockNum: result.value.stockNum, location: result.value.location }
					},
					preDeny: () => {
						return { vin: result.value.vin, make_model: result.value.make_model, year: result.value.year, stockNum: result.value.stockNum, location: result.value.location }
					}
				}).then((result) => {
					if (result.isConfirmed) {
						Swal.fire({
							icon: "success",
							title: "Saved",
							html: `<p> Vin Number: ${result.value.vin} </p>
							<p>Make/Model: ${result.value.make_model} </p>
                            <p>Make/Model: ${result.value.year} </p>
							<p>Stock Number: ${result.value.stockNum} </p>
							<p>Location: ${result.value.location} </p>`,
						})
						addCarDB(result);
						addEvent(result, getSpotID(result.value.location), getSpotID(result.value.location), "Added New Car")
					}
					else if (result.isDenied) {
						swalAddCar(result.value.vin, result.value.make_model, result.value.year, result.value.stockNum, result.value.location);
					}
				})
			}
		})
	}

	function isSpotAvailable(spotName) {
		return availableSpots.find(spot => spot.spot_name === spotName);
	}

	const postDelete = (car) => {
		fetch(props.PATH + 'cars/' + car.id, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	const deleteCar = (car) => {
		for (var i = 0; i < carList.length; i++) {
			if (carList[i].key === car.key) {
				carList.splice(i, 1);
			}
		}
		let edit = {
			type: "Delete Car",
			key: car.key,
			make_model: car.make_model,
			stockNum: car.stockNum,
			newSpot: "N/A",
			oldSpot: car.newSpot,
			time: Date().toLocaleString()
		}
		edits.unshift(edit)
		props.update()
		postDelete(car)
	}

	return (
		<div className="App">
			{props.carList.map(car => car.highlighted = false)}
			{carList && <TableOfCars carList={carList} user={props.user} PATH={props.PATH} deleteCar={deleteCar} update={() => props.update()} isSpotAvailable={isSpotAvailable} availableSpots={availableSpots} allSpots={props.allSpots} />}
			<Button variant="dark" onClick={() => swalAddCar()}>Add Car</Button>
		</div>
	);
}

export default Home;