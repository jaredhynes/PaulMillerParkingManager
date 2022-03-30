import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import TableOfEdits from "./TableOfEdits";
import { useState } from 'react';
import QRCode from "qrcode.react";

function CarPage(props) {
    const { vin } = useParams(window.location.search);
    let car = props.carList.find(car => car.vin === vin);

    const [currentLink, setCurrentLink] = useState(null);

    function getCurrentPage(){
        setCurrentLink(window.location.href);
    }
    return (
        <div>
            <h1>{car.make_model} {car.year}</h1>
            <h2>VIN: {car.vin}</h2>
            <h3>Stock Number: {car.stockNum}</h3>
            <h4>Location: {car.spot_name}</h4>
            <Button>Edit Information</Button><Button onClick={getCurrentPage}>Generate QR-Code</Button>

            <div>
                {currentLink && <QRCode value={currentLink}/>}
            </div>

            <h4>Car History:</h4>
            <TableOfEdits edits={props.edits.filter(edit => edit.car_id === vin)}/>
        </div>
    );
}
export default CarPage;