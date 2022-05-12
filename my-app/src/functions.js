import Swal from 'sweetalert2'

// show on map car fuctions
export let highlightCar = null;
export function sethighlightCar(car){ highlightCar = car; }
export function resethighlightCar(){ highlightCar = null; }

//Swal functions
export function swalAddCar(data, vin = "", make_model = "", year = "", stockNum = "", spot_name = "") {
    Swal.fire({
        title: 'Add Car',
        // want to have the information there in the edit, not just random values. using ${result.value.vin} does not work!
        html: `<input type="text" id="vin" class="swal2-input" placeholder="VIN" value=${vin}>
        <input type="text" id="make_model" class="swal2-input" placeholder="Make/Model" value=${make_model}>
        <input type="text" id="year" class="swal2-input" placeholder="Year" value=${year}>
        <input type="text" id="stockNum" class="swal2-input" placeholder="Stock Number" value=${stockNum}>
        <input type="text" id="spot_name" class="swal2-input" placeholder="Location" value=${spot_name}>`,
        confirmButtonText: 'Add Car',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            vin = Swal.getPopup().querySelector('#vin').value
            make_model = Swal.getPopup().querySelector('#make_model').value
            year = Swal.getPopup().querySelector('#year').value
            stockNum = Swal.getPopup().querySelector('#stockNum').value
            spot_name = Swal.getPopup().querySelector('#spot_name').value.toLowerCase()

            if (!vin || !make_model || !stockNum || !spot_name || !year) {
                Swal.showValidationMessage(`Please enter all information`)
            }

            else if (!validateVin(vin)) {
                Swal.showValidationMessage(`${vin} is not a valid VIN.`)
            }

            else if (data.carList.find(car => car.vin === vin)) {
                Swal.showValidationMessage(`Cannot have duplicate VINs!`)
            }

            else if (!/^[A-Za-z0-9 ]*$/.test(make_model)) {
                Swal.showValidationMessage(`${make_model} is not a valid make/model.`)
            }

            else if (!/^[0-9]*$/.test(year)) {
                Swal.showValidationMessage(`${year} is not a valid year.`)
            }

            else if (!/^[A-Za-z0-9]*$/.test(stockNum)) {
                Swal.showValidationMessage(`${stockNum} is not a valid stock number.`)
            }

            else if (!isSpotAvailable(spot_name, data.availableSpots)) {
                Swal.showValidationMessage(`${spot_name} is not an available spot.`)
            }

            return { vin: vin, make_model: make_model, year: year, stockNum: stockNum, spot_name: spot_name }
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
                <p>Location: ${result.value.spot_name} </p>`,
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                preConfirm: () => {
                    return { vin: result.value.vin, make_model: result.value.make_model, year: result.value.year, stockNum: result.value.stockNum, spot_name: result.value.spot_name }
                },
                preDeny: () => {
                    return { vin: result.value.vin, make_model: result.value.make_model, year: result.value.year, stockNum: result.value.stockNum, spot_name: result.value.spot_name }
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
                        <p>Location: ${result.value.spot_name} </p>`,
                    })
                    addCar(result, data.Axios, data.update, data.allSpots);
                    addEvent({}, result.value, "Add Car", data.Axios, data.update, data.user);
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
        html: `<input type="text" id="spot_name" class="swal2-input" placeholder="${car.spot_name}">`,
        confirmButtonText: 'Edit Car',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const spot_name = Swal.getPopup().querySelector('#spot_name').value

            if (!spot_name) {
                Swal.showValidationMessage(`Please enter a location`)
            }

            if (!isSpotAvailable(spot_name, data.availableSpots)) {
                Swal.showValidationMessage(`${spot_name} is not an available spot.`)
            }

            return { spot_name: spot_name, vin: car.vin }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Saved",
                html: `<p> Old Location: ${car.spot_name} </p>
                    <p>New Location: ${result.value.spot_name} </p>`,
            })
            editCar(car, result.value.spot_name, data.Axios, data.update, data.allSpots);
            addEvent(car, result.value, "Move Car", data.Axios, data.update, data.user)
        }
    })
}

export function swalArchiveCar(car, data) {
    Swal.fire({
        title: 'Archiving Car',
        html: `<input type="text" id="archiveDesc" class="swal2-input" placeholder="Description">`,
        confirmButtonText: 'Archive Car',
        showCancelButton: true, 
        preConfirm: () => {
            return { archiveDesc: Swal.getPopup().querySelector('#archiveDesc').value }
        }     
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Archived Car',
                icon: 'success'
            })
            car.archiveDesc = result.value.archiveDesc
            car.archived = 1
            archiveCar(car, data.Axios, data.update);
            addEvent(car, car, "Archive Car", data.Axios, data.update, data.user)
        }
    })   
}

export function swalUnArchiveCar(car, data) {
    Swal.fire({
        title: 'Archive Removed',
        icon: 'success'
        
    })
    car.archived = 0
    archiveCar(car, data.Axios, data.update);
    addEvent(car, car, "Undo Archive", data.Axios, data.update, data.user)
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
            //addEvent(car, car, "Delete Car", data.Axios, data.update, data.user)
        }
    })
}

export function swalEditCarInfo(car, data) {
    // TODO
    Swal.fire({
        title: 'Edit Car Information',
        html: `<p> Vin Number: ${car.vin} </p>
        <input type="text" id="make_model" class="swal2-input" placeholder="${car.make_model}">
        <input type="text" id="year" class="swal2-input" placeholder="${car.year}">
        <input type="text" id="stockNum" class="swal2-input" placeholder="${car.stockNum}">`,
        confirmButtonText: 'Edit Car',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const make_model = Swal.getPopup().querySelector('#make_model').value ? Swal.getPopup().querySelector('#make_model').value : car.make_model;
            const year = Swal.getPopup().querySelector('#year').value ? Swal.getPopup().querySelector('#year').value : car.year;
            const stockNum = Swal.getPopup().querySelector('#stockNum').value ? Swal.getPopup().querySelector('#stockNum').value : car.stockNum;

            if (!/^[A-Za-z0-9 ]*$/.test(make_model)) {
                Swal.showValidationMessage(`${make_model} is not a valid make and model.`)
            }

            if (!/^[0-9]*$/.test(year)) {
                Swal.showValidationMessage(`${year} is not a valid year.`)
            }

            if (!/^[A-Za-z0-9]*$/.test(stockNum)) {
                Swal.showValidationMessage(`${stockNum} is not a valid stock number.`)
            }

            return { make_model: make_model, year: year, stockNum: stockNum }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'question',
                title: "Is this Information Correct?",
                html: `<p> Vin Number: ${car.vin} </p>
                <p>Make/Model: ${result.value.make_model} </p>
                <p>Make/Model: ${result.value.year} </p>
                <p>Stock Number: ${result.value.stockNum} </p>`,
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                preConfirm: () => {
                    return { vin: car.vin, make_model: result.value.make_model, year: result.value.year, stockNum: result.value.stockNum }
                },
                preDeny: () => {
                    return { vin: car.vin, make_model: result.value.make_model, year: result.value.year, stockNum: result.value.stockNum }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        title: "Saved",
                        html: `<p> Vin Number: ${result.value.vin} </p>
                        <p>Make/Model: ${result.value.make_model} </p>
                        <p>Make/Model: ${result.value.year} </p>
                        <p>Stock Number: ${result.value.stockNum} </p>`,
                    })
                    editCarInfo(result.value, data.Axios, data.update);
                    addEvent(car, result.value, "Edit Car", data.Axios, data.update, data.user)
                }
                else if (result.isDenied) {
                    swalEditCarInfo(car, data);
                }
            })
        }
    })
}

export function swalRevertEdit(edit, data) {
    Swal.fire({
        title: 'Are you sure you would like to revert this edit?',
        text: "This will revert the edit to the previous state.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, revert it!'
    }).then((result) => {
        if (result.isConfirmed) {
            switch (edit.event_type) {
                case "Add Car":
                    Swal.fire({
                        title: 'Confirm Delete',
                        text: 'Are you sure you want to delete this car? This cannot be undone.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'The car has been successfully deleted.',
                                'success'
                            )
                            deleteCar({ vin: edit.car_id }, data.Axios, data.update);
                        }
                    })
                    break
                case "Edit Car":
                case "Undo Edit":
                    editCarInfo({ vin: edit.car_id, stockNum: edit.old_stock_num, make_model: edit.old_make_model, year: edit.old_year }, data.Axios, data.update);
                    addEvent({ vin: edit.car_id, stockNum: edit.new_stock_num, make_model: edit.new_make_model, year: edit.new_year }, { vin: edit.car_id, stockNum: edit.old_stock_num, make_model: edit.old_make_model, year: edit.old_year }, "Undo Edit", data.Axios, data.update, data.user)
                    Swal.fire(
                        'Reverted!',
                        'The edit has been successfully reverted.',
                        'success'
                    )
                    break
                case "Move Car":
                case "Undo Move":
                    if (isSpotAvailable(edit.old_location, data.availableSpots)) {
                        editCar({ vin: edit.car_id }, edit.old_location, data.Axios, data.update, data.allSpots);
                        addEvent({ vin: edit.car_id, spot_name: edit.new_location }, { vin: edit.car_id, spot_name: edit.old_location }, "Undo Move", data.Axios, data.update, data.user)
                        Swal.fire(
                            'Reverted!',
                            'The move has been successfully reverted.',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Error!',
                            'The spot you are trying to move to is not available.',
                            'error'
                        )
                    }
                    break
                case "Archive Car":
                case "Undo Archive":
                    let a = edit.archived === 0 ? 1 : 0
                    archiveCar({ vin: edit.car_id, archived: a }, data.Axios, data.update);
                    addEvent({ vin: edit.car_id }, { vin: edit.car_id, archived: a }, "Undo Archive", data.Axios, data.update, data.user)
                    Swal.fire(
                        'Reverted!',
                        'The archive has been successfully reverted.',
                        'success'
                    )
                    break
                default:
                    break
            }
        }
    })
}

//Push to server
async function addCar(car, Axios, update, allSpots) {
    await Axios.post("insertNewCar", {
        vin: car.value.vin,
        make_model: car.value.make_model,
        stockNum: car.value.stockNum,
        year: car.value.year,
        spot_id: getSpotID(car.value.spot_name, allSpots),
    }).then(() => {
        update()
    })
}

async function editCar(car, spot_name, Axios, update, allSpots) {
    await Axios.put("update", {
        vin: car.vin,
        spot_id: getSpotID(spot_name, allSpots),
    }).then(
        (response) => {
            update()
        }
    )
}

async function editCarInfo(newInfo, Axios, update) {
    await Axios.put("updateInfo", {
        vin: newInfo.vin,
        stockNum: newInfo.stockNum,
        makeModel: newInfo.make_model,
        year: newInfo.year
    }).then((response) => {
        update()
    });
}

async function deleteCar(car, Axios, update) {
    await Axios.delete(`deleteEventByVin/${car.vin}`).then((response) => {
        Axios.delete(`delete/${car.vin}`).then((response) => {
            update();
        })
    })
}

async function addEvent(oldCar, newCar, event_type, Axios, update, user) {
    await Axios.post("insertEvent", {
        car_id: newCar.vin,
        old_make_model: oldCar.make_model,
        new_make_model: newCar.make_model,
        old_year: oldCar.year,
        new_year: newCar.year,
        old_stock_num: oldCar.stockNum,
        new_stock_num: newCar.stockNum,
        old_location: oldCar.spot_name,
        new_location: newCar.spot_name,
        archived: newCar.archived,
        archive_description: newCar.archiveDesc,
        user_id: user.email,
        event_type: event_type,
        event_date: (new Date()).toLocaleString("en-US", { timeZone: "America/New_York" }),
    }).then(() => {
        update();
    })
}

function archiveCar(car, Axios, update) {
    Axios.put("archive", {
        vin: car.vin,
        archived: car.archived
    }).then(() => {
        update();
    })
}

//Helper Functions
function getSpotID(spot_name, allSpots) {
    return allSpots.find(el =>
        el.spot_name === spot_name
    ).spot_id;
}

function isSpotAvailable(spot_name, availableSpots) {
    return availableSpots.find(spot => spot.spot_name === spot_name);
}

function validateVin(vin) {
    return validate(vin);
}

function transliterate(c) {
    return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
}

//eslint-disable-next-line
function get_check_digit(vin) {
    var map = '0123456789X';
    var weights = '8765432X098765432';
    var sum = 0;
    for (var i = 0; i < 17; ++i)
        sum += transliterate(vin[i]) * map.indexOf(weights[i]);
    return map[sum % 11];
}

function validate(vin) {
    // if (vin.length !== 17) return false;
    //     return get_check_digit(vin) === vin[8];
    return /^[A-Z0-9]*$/.test(vin)
}

export default swalAddCar;