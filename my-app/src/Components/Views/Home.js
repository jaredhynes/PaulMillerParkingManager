import React from 'react';
import {useEffect, useState} from 'react';
import { Container } from '../Container';
import '../../App.css';
import Swal from 'sweetalert2'
import '../../Styles/sweetalert.css'
import Button from 'react-bootstrap/Button'
import { MDBDataTable } from 'mdbreact';
import TableOfCars from './TableOfCars';


//   window.showExample = () => {
//     //const MySwal = withReactContent(Swal)
    
//     Swal.fire({
//       title: <strong>Good job!</strong>,
//       html: <i>You clicked the button!</i>,
//       icon: 'success'
//     })
//     }
    
function confirm1() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this.",
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, cancel!',
      // confirmButtonClass: 'btn btn-success',
      // cancelButtonClass: 'btn btn-danger',
      // buttonsStyling: false
    })
  }


function Home(props){
    const [carList, setCarlist] = useState(null);
    let carList3 = props.carList;
    let edits = props.edits;

    function recursiveAddCar(vin, make_model, stockNum, location){
      Swal.fire({
          title: 'Edit Previous Information',
          // want to have the information there in the edit, not just random values. using ${result.value.vin} does not work!
          html: `<input type="text" id="vin" class="swal2-input" value=${vin}>
          <input type="text" id="make_model" class="swal2-input" value=${make_model}>
          <input type="text" id="stockNum" class="swal2-input" value=${stockNum}>
          <input type="text" id="location" class="swal2-input" value=${location}>`,
          confirmButtonText: 'Add Car',
          showCancelButton:true,
          focusConfirm: false,
      preConfirm: () => {
          vin = Swal.getPopup().querySelector('#vin').value
          make_model = Swal.getPopup().querySelector('#make_model').value
          stockNum = Swal.getPopup().querySelector('#stockNum').value
          location = Swal.getPopup().querySelector('#location').value
  
      if(!vin || !make_model || !stockNum || !location) {
      Swal.showValidationMessage(`Please enter all information`)
          }
          
      return {vin: vin, make_model: make_model, stockNum: stockNum, location: location}
          }
  }).then((result) => {
      if(result.isConfirmed){
      Swal.fire({
        icon: 'question',
        title: "Is this Information Correct?",
        html: `<p> Vin Number: ${result.value.vin} </p>
        <p>Make/Model: ${result.value.make_model} </p>
        <p>Stock Number: ${result.value.stockNum} </p>
        <p>Location: ${result.value.location} </p>`,
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        preConfirm: () => {
            return{vin: result.value.vin, make_model: result.value.stockNum, stockNum: result.value.stockNum, location: result.value.location}},
        preDeny: () =>{
            return{vin: result.value.vin, make_model: result.value.stockNum, stockNum: result.value.stockNum, location: result.value.location}
        }
    }).then((result) => {
        if (result.isConfirmed){
            Swal.fire({
                icon: "success",
                title: "Saved",
                html: `<p> Vin Number: ${result.value.vin} </p>
          <p>Make/Model: ${result.value.make_model} </p>
          <p>Stock Number: ${result.value.stockNum} </p>
          <p>Location: ${result.value.location} </p>`, 
            })
            addCar(result);
        }
        else if(result.isDenied){
          recursiveAddCar(result.value.vin, result.value.make_model, result.value.stockNum, result.value.location);
        }
    })
  }})
  }

    function swalAddCar(){
      Swal.fire({
          title: 'Add New Car',
          html: `<input type="text" id="vin" class="swal2-input" placeholder="Vin">
          <input type="text" id="make_model" class="swal2-input" placeholder="Make/Model">
          <input type="text" id="stockNum" class="swal2-input" placeholder="Stock Number">
          <input type="text" id="location" class="swal2-input" placeholder="Location">`,
          confirmButtonText: 'Add Car',
          showCancelButton:true,
          focusConfirm: false,
          preConfirm: () => {
              const vin = Swal.getPopup().querySelector('#vin').value
              const make_model = Swal.getPopup().querySelector('#make_model').value
              const stockNum = Swal.getPopup().querySelector('#stockNum').value
              const location = Swal.getPopup().querySelector('#location').value

              if(!vin || !make_model || !stockNum || !location){
                  Swal.showValidationMessage(`Please enter all information`)
              }
              return {vin: vin, make_model: make_model, stockNum: stockNum, location: location}
          }
      }).then((result) => {
          if(result.isConfirmed){
          Swal.fire({
            icon: 'question',
            title: "Is this Information Correct?",
            html: `<p> Vin Number: ${result.value.vin} </p>
            <p>Make/Model: ${result.value.make_model} </p>
            <p>Stock Number: ${result.value.stockNum} </p>
            <p>Location: ${result.value.location} </p>`,
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            preConfirm: () => {
                return{vin: result.value.vin, make_model: result.value.make_model, stockNum: result.value.stockNum, location: result.value.location}},
            preDeny: () =>{
                return{vin: result.value.vin, make_model: result.value.make_model, stockNum: result.value.stockNum, location: result.value.location}
            }

        }).then((result) => {
            if (result.isConfirmed){
                Swal.fire({
                    icon: "success",
                    title: "Saved",
                    html: `<p> Vin Number: ${result.value.vin} </p>
              <p>Make/Model: ${result.value.make_model} </p>
              <p>Stock Number: ${result.value.stockNum} </p>
              <p>Location: ${result.value.location} </p>`, 
                })
                addCar(result)
            }
            else if(result.isDenied){
              recursiveAddCar(result.value.vin, result.value.make_model, result.value.stockNum, result.value.location);
            }
        })
    }})
  }

  function swalEditCar(car){
    Swal.fire({
        title: 'Edit Car Location',
        html: `<input type="text" id="newSpot" class="swal2-input" placeholder=${car.newSpot}>`,
        confirmButtonText: 'Edit Car',
        showCancelButton: true,
        focusConfirm: false, 
        preConfirm: () => {
          const newSpot = Swal.getPopup().querySelector('#newSpot').value

          if(!newSpot){
              Swal.showValidationMessage(`Please enter a location`)
          }
          return {car: car, newSpot: newSpot}
      }
    }).then((result) => {
      if(result.isConfirmed){
      Swal.fire({
        icon: 'question',
        title: "Is this Information Correct?",
        html: `<p> Old Location: ${car.newSpot} </p>
          <p>New Location: ${result.value.newSpot} </p>`,
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        preConfirm: () => {
            return{car: car, newSpot: result.value.newSpot}
          },
        preDeny: () =>{
            return{car: car, newSpot: result.value.newSpot}
        }
          }).then((result) => {
              if (result.isConfirmed){
                  Swal.fire({
                      icon: "success",
                      title: "Saved",
                      html: `<p> Old Location: ${car.newSpot} </p>
                      <p>New Location: ${result.value.newSpot} </p>`, 
                  })
                  editCar(car, result.value.newSpot)
              }
          })
      }})
      }

    useEffect(() => {
        fetch('http://localhost:8000/cars')
            .then(res => {
            return res.json();
            })
            .then(data => {
            setCarlist(data);
            })
        }, [])

    const postUpdate = (car) => {
        car.bttn = ''
        fetch('http://localhost:8000/cars/' + car.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(car)
            })
    }

    const postNew = (car, newId) => {
        car.id = newId
        fetch('http://localhost:8000/cars/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(car)
            })
    }

    const handleDelete = (car) => {
        for(var i = 0; i < carList.length; i++){ 
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
        props.app.forceUpdate(); 
    }

    
    
    const addCar = (car) => {
        let edit = {
            type: "New Car",
            key: car.value.vin,
            make_model: car.value.make_model,
            stockNum: car.value.stockNum,
            newSpot: car.value.location,
            oldSpot: "N/A",
            time: Date().toLocaleString()
        };
        carList.push(edit);
        edits.unshift(edit);
        postNew(edit, carList.length)
        props.app.forceUpdate();
        setCarlist(carList)
    };

    const editCar = (car, location) => {
        car.time = Date().toLocaleString()
        car.type = 'Move Car'
        car.oldSpot = car.newSpot
        car.newSpot = location
        edits.unshift(car)
        postUpdate(car)
        props.app.forceUpdate()
        setCarlist(carList)
        };

    return(
        <div className="App">
        {carList && <TableOfCars carList={carList} swalEditCar={swalEditCar}/>}
        {/* <table>
        <tr>
            <th>Action</th>
            <th>Make/Model</th>
            <th>Vin</th>
            <th>Stock Number</th>
            <th>Location</th>
            <th></th>
        </tr>
        {carList.map((car =>
        
        <tr key= {car.key}>
            <td>
            <Container formType={"editCar"} car={car} triggerText={"Edit Car"} onSubmit={editCar} />
            </td>
            <td>{car.make_model}</td>
            <td>{car.key}</td>
            <td>{car.stockNum}</td>
            <td>{car.newSpot}</td>
            <td><button class="listedButton">Show on Map</button></td>
        </tr>
        ))}

        </table> */}
        <Button onClick={() => swalAddCar()}>Add Car</Button>
        </div>
    );
}

export default Home;