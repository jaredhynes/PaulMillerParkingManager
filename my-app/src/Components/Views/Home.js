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

    function getSpotID(spotName){
        return availableSpots.find(el => 
            el.spot_name == spotName
        ).spot_id;
    }

    function addCarDB(car){
        Axios.post("http://localhost:8001/insertNewCar", {
            vin: car.value.vin,
	        make_model: car.value.make_model,
	        stockNum: car.value.stockNum,
	        year: car.value.year,
	        spot_id: getSpotID(car.value.location),
        }).then(() => {
            availableSpots = fetchsAvailableSpots();
            carList = fetchCars();
        })
    }

    const fetchCars = () => {
		Axios.get("http://localhost:8001/cars").then((response) => {
			//console.log("success");
			carList = response.data;
		})
	}


    const fetchsAvailableSpots = () => {
		Axios.get("http://localhost:8001/availableSpots").then((response) => {
			//console.log("success");
			console.log(response.data)
			availableSpots = response.data;
		})
	}
    

    

	function swalAddCar(vin = "", make_model = "", year= "", stockNum = "", location = "") {
		Swal.fire({
			title: 'Edit Previous Information',
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

				console.log(isSpotAvailable(location))
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

	const postUpdate = (car) => {
		car.bttn = ''
		car.highlighted = false
		fetch('http://localhost:8000/cars/' + car.id, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(car)
		})
	}

	const postNew = (car) => {
		fetch('http://localhost:8000/cars/', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(car)
		})
	}

	const postDelete = (car) => {
		fetch('http://localhost:8000/cars/' + car.id, {
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
		};
		edits.unshift(edit)
		props.update()
		postDelete(car)
	}

	const addCar = (car) => {
		let edit = {}
		edit.id = String((carList.length + 1))
		edit.key = car.value.vin
		edit.make_model = car.value.make_model
		edit.stockNum = car.value.stockNum
		edit.newSpot = car.value.location
		edit.oldSpot = "N/A"
		edit.time = Date().toLocaleString()
		edit.type = "New Car"
		carList.push(edit)
		edits.unshift(edit)
		postNew(edit)
		props.update()
	}

	const editCar = (car, location) => {
		let edit = car
		edit.oldSpot = car.newSpot
		edit.newSpot = location
		edit.time = Date().toLocaleString()
		edit.type = 'Move Car'
		edits.unshift(edit)
		postUpdate(edit)
		props.update()
	}

	return (
		<div className="App">
			{props.carList.map(car => car.highlighted = false)}
			{carList && <TableOfCars carList={carList} editCar={editCar} deleteCar={deleteCar} isSpotAvailable={isSpotAvailable} availableSpots={availableSpots} />}
			<Button onClick={() => swalAddCar()}>Add Car</Button>
		</div>
	);
}

export default Home;