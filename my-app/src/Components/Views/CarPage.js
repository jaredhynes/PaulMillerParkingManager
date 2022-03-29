import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";

function CarPage(props) {
    const { vin } = useParams(window.location.search);
    let car = props.carList.find(car => car.vin === vin);

    console.log(car);
    console.log(vin);
    
    return (
        <div>
            <h1>details</h1>
            {car.make_model}
            {car.year}
            {car.vin}
            {car.location}
            {car.description}
            <Button>Edit</Button>
        </div>
    );
}
export default CarPage;