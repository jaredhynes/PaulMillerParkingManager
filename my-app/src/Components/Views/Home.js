import React from 'react';
import {useEffect, useState} from 'react';
import { Container } from '../Container';
import '../../App.css';
import TableOfCars from './TableOfCars';
import Swal from 'sweetalert2'
import '../../Styles/sweetalert.css'


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
            }
            else if(result.isDenied){
                Swal.fire({
                    title: 'Edit Previous Information',
                    // want to have the information there in the edit, not just random values. using ${result.value.vin} does not work!
                    html: `<input type="text" id="vin" class="swal2-input" value=${result.value.vin}>
                    <input type="text" id="make_model" class="swal2-input" value=${result.value.make_model}>
                    <input type="text" id="stockNum" class="swal2-input" value=${result.value.stockNum}>
                    <input type="text" id="location" class="swal2-input" value=${result.value.location}>`,
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
                })
            }
        })
    }})
  }



function Home(props){
    const [carList, setCarlist] = useState(null);
    let carList3 = props.carList;
    let edits = props.edits;

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

    
    
    const addCar = (event) => {
        event.preventDefault(event);
        //carList.push({make_model:event.target.make_model.value, vin:parseInt(event.target.vin.value), location:event.target.location.value});
        let edit = {
            type: "New Car",
            key: event.target.vin.value,
            make_model: event.target.make_model.value,
            stockNum: event.target.stockNumber.value,
            newSpot: event.target.location.value,
            oldSpot: "N/A",
            time: Date().toLocaleString()
        };
        carList.push(edit);
        edits.unshift(edit);
        postNew(edit, carList.length)
        props.app.forceUpdate();
    };

    const editCar = (event) => {
        event.preventDefault(event);
        //carList.push({make_model:event.target.make_model.value, vin:parseInt(event.target.vin.value), location:event.target.location.value});
        var edit
        for(var i = 0; i < carList.length; i++){ 
            if (carList[i].key === event.target.key.value) { 
                carList[i].oldSpot = carList[i].newSpot
                carList[i].newSpot = event.target.newSpot.value
                edit = carList[i]
            }
        }
        edit.time = Date().toLocaleString()
        edit.type = 'Move Car'
        edits.unshift(edit)
        postUpdate(edit)
        props.app.forceUpdate()
        };
      
    return(
        <div className="App">
        
        {carList && <TableOfCars carList={carList} editCar={editCar}/>}
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
        
        <Container formType={"addCar"} triggerText={"Add Car"} onSubmit={addCar} />
        <button onClick={swalAddCar}>Mark's Sweet Alert Button</button>
        </div>
    );
}

export default Home;