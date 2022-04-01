import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import TableOfEdits from "./TableOfEdits";
import { useState } from 'react';
import QRCode from "qrcode.react";
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import QRCodeGenerator from './QRCodeGenerator';


function CarPage(props) {
    const [generateQR, setGenerateQR] = useState(false);
    const [valueStrings, setValueStrings] = useState([]);
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
            <EditTextarea
              placeholder='Description will got here (Click to edit)'
            />
            <Button>Edit Information</Button>
            {generateQR ? <QRCodeGenerator valueStrings = {valueStrings} /> : null}
            <Button onClick={getCurrentPage}>Generate QR-Code</Button>

            <div>
                {currentLink && <QRCode value={currentLink}/>}
            </div>

            <h4>Car History:</h4>
            <TableOfEdits edits={props.edits.filter(edit => edit.car_id === vin)}/>
        </div>

    );
}
export default CarPage;