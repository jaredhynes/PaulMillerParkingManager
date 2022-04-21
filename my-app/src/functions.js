import Swal from 'sweetalert2'

//Swal functions
export function swalAddCar(data, vin = "", make_model = "", year = "", stockNum = "", location = "") {
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

            if (!isSpotAvailable(location, data.availableSpots)) {
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
                    addCar(result, data.Axios, data.update, data.allSpots);
                    addNewCarEvent(result.value, getSpotID(result.value.location, data.allSpots), getSpotID(result.value.location, data.allSpots), "Added New Car", data.Axios, data.update, data.user);
                }
                else if (result.isDenied) {
                    swalAddCar(data, result.value.vin, result.value.make_model, result.value.year, result.value.stockNum, result.value.location);
                }
            })
        }
    })
}

export function swalEditCar(car, data) {
    Swal.fire({
        title: 'Edit Car Location',
        html: `<input type="text" id="newSpot" class="swal2-input" placeholder=${car.spot_name}>`,
        confirmButtonText: 'Edit Car',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const newSpot = Swal.getPopup().querySelector('#newSpot').value

            if (!newSpot) {
                Swal.showValidationMessage(`Please enter a location`)
            }

            if (!isSpotAvailable(newSpot, data.availableSpots)) {
                Swal.showValidationMessage(`${newSpot} is not an available spot.`)
            }

            return { car: car, newSpot: newSpot }
        }
    }).then((result) => {
        if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "Saved",
                    html: `<p> Old Location: ${car.spot_name} </p>
                    <p>New Location: ${result.value.newSpot} </p>`,
                })
                editCar(car, result.value.newSpot, data.Axios, data.update, data.allSpots);
                addEvent(car, getSpotID(result.value.newSpot, data.allSpots), "Car was Moved", data.Axios, data.update, data.user)
            }
        })
}

export function swalArchiveCar(car, data) {
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

export function swalDeleteCar(car, data) {
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
            deleteCar(car, data.Axios, data.update);
            addEvent(car, getSpotID(car.spot_name, data.allSpots), "Car was Deleted", data.Axios, data.update, data.user)
        }
    })
}

//Edit any of car's infor besides vin and location
export function swalEditCarInfo(car, data) {
    // TODO
    Swal.fire({
        title: 'Edit Car Information',
        html: `<p> Vin Number: ${car.vin} </p>
        <input type="text" id="newMakeModel" class="swal2-input" placeholder=${car.make_model}>
        <input type="text" id="newYear" class="swal2-input" placeholder=${car.year}>
        <input type="text" id="newStockNum" class="swal2-input" placeholder=${car.stockNum}>`,
        confirmButtonText: 'Edit Car',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const newMakeModel = Swal.getPopup().querySelector('#newMakeModel').value ? Swal.getPopup().querySelector('#newMakeModel').value : car.make_model;
            const newYear = Swal.getPopup().querySelector('#newYear').value ? Swal.getPopup().querySelector('#newYear').value : car.year;
            const newStockNum = Swal.getPopup().querySelector('#newStockNum').value ? Swal.getPopup().querySelector('#newStockNum').value : car.stockNum;

            return { newMakeModel: newMakeModel, newYear: newYear, newStockNum: newStockNum }
        }
    }).then((result) => {  
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'question',
                title: "Is this Information Correct?",
                html: `<p> Vin Number: ${car.vin} </p>
                <p>Make/Model: ${result.value.newMakeModel} </p>
                <p>Make/Model: ${result.value.newYear} </p>
                <p>Stock Number: ${result.value.newStockNum} </p>`,
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                preConfirm: () => {
                    return { vin: car.vin, newMakeModel: result.value.newMakeModel, newYear: result.value.newYear, newStockNum: result.value.newStockNum }
                },
                preDeny: () => {
                    return { vin: car.vin, newMakeModel: result.value.newMakeModel, newYear: result.value.newYear, newStockNum: result.value.newStockNum }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        title: "Saved",
                        html: `<p> Vin Number: ${result.value.vin} </p>
                        <p>Make/Model: ${result.value.newMakeModel} </p>
                        <p>Make/Model: ${result.value.newYear} </p>
                        <p>Stock Number: ${result.value.newStockNum} </p>`,
                    })
                    editCarInfo(result.value, data.Axios, data.update);
                    addEvent(car, car.spot_id, "Changed car info", data.Axios, data.update, data.user)
                }
                else if (result.isDenied) {
                    swalEditCarInfo(car, data);
                }
            })
        }
    })
}

//Push to server
function addCar(car, Axios, update, allSpots) {
    Axios.post("insertNewCar", {
        vin: car.value.vin,
        make_model: car.value.make_model,
        stockNum: car.value.stockNum,
        year: car.value.year,
        spot_id: getSpotID(car.value.location, allSpots),
    }).then(() => {
        update()
    })
}

function editCar(car, newSpot, Axios, update, allSpots) {
    Axios.put("update", {vin: car.vin, spot_id: getSpotID(newSpot, allSpots)}).then(
        (response) => {
            update()
        }
    )
}

function editCarInfo(newInfo, Axios, update){
    Axios.put("updateInfo", {vin: newInfo.vin, stockNum: newInfo.newStockNum, makeModel: newInfo.newMakeModel, year: newInfo.newYear}).then((response) => {
        update()
    });
}

function deleteCar(car, Axios, update){
    Axios.delete(`deleteEventByVin/${car.vin}`).then((response) => {
        Axios.delete(`delete/${car.vin}`).then((response) => {
            update();
        })
    })
}

function addNewCarEvent(car, old_spot_id, new_spot_id, event_type, Axios, update, user) {
    Axios.post("insertEvent", {
        car_id: car.vin,
        old_spot_id: old_spot_id,
        new_spot_id: new_spot_id,
        user_id: user.email,
        event_type: event_type,
        event_date: Date().toLocaleString(),
    }).then(() => {
        update();
    })
}

function addEvent(car, newSpotid, event_type, Axios, update, user) {
    Axios.post("insertEvent", {
        car_id: car.vin,
        old_spot_id: car.spot_id,
        new_spot_id: newSpotid,
        user_id: user.email,
        event_type: event_type,
        event_date: Date().toLocaleString(),
    }).then(() => {
        update();
    })
}

//Helper Functions
function getSpotID(spotName, allSpots){
    return allSpots.find(el => 
        el.spot_name === spotName
    ).spot_id;
}

function isSpotAvailable(spotName, availableSpots) {
    return availableSpots.find(spot => spot.spot_name === spotName);
}

export default swalAddCar;