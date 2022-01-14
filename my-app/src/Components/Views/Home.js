import React from 'react';
import {useEffect, useState} from 'react';
import { Container } from '../Container';
import '../../App.css';
import TableOfCars from './TableOfCars';

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

    const postCarList = () => {
        fetch('http://localhost:8000/cars', {
            method: 'POST',
            body: JSON.stringify(carList)
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
        postCarList();
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
        postCarList();
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
        edits.unshift(edit);
        postCarList();
        props.app.forceUpdate();
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

        </div>
    );
}

export default Home;