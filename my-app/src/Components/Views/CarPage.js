import { React, useState } from 'react';
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import TableOfEdits from "./TableOfEdits";
import QRCode from "qrcode.react";
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {swalEditCar, swalEditCarAll} from '../../functions.js';


function CarPage(props) {
    let data = props.data;

    const { vin } = useParams(window.location.search);
    let car = data.carList.find(car => car.vin === vin);

    const [currentLink, setCurrentLink] = useState(null);

    function getCurrentPage() {
        setCurrentLink(window.location.href);
    }

    
    const changeDescription = (text) => {
        data.Axios.put(`${props.PATH}updateDescription`, {vin: car.vin, description: text.value}).then(
			(response) => {
				props.update();
			}
		)
    }


    return (
        <div>
            <h1>{car.make_model} {car.year}</h1>
            <h2>VIN: {car.vin}</h2>
            <h3>Stock Number: {car.stockNum}</h3>
            <h4>Location: {car.spot_name}</h4>
            <EditTextarea
                id="carDes"
                //placeholder={car.description}
                defaultValue={car.description}
                onSave={changeDescription}
                // Remember to check if this works once development server is working again
            />
            <Button onClick={() => swalEditCar(car, data)}>Move Car</Button>
            <Button onClick={() => swalEditCarAll(car, data)}>Edit Information</Button>
            <Button onClick={getCurrentPage}>Generate QR-Code</Button>

            <div>
                {currentLink && <QRCode value={currentLink} />}
            </div>
            {data.roles.includes("admin") &&
                <h4>Car History:</h4> &&
                <TableOfEdits edits={data.edits.filter(edit => edit.car_id === vin)} />}
        </div>

    );
}
export default CarPage;