import { React, useState } from 'react';
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import TableOfEdits from "./TableOfEdits";
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {swalEditCar, swalEditCarInfo, swalArchiveCar, swalUnArchiveCar} from '../../functions.js';
import PDFGenerator from './PDFGenerator';
import { PDFDownloadLink } from '@react-pdf/renderer';

const QRCode = require("qrcode") 

function CarPage(props) {
    let data = props.data;

    const { vin } = useParams(window.location.search);
    let car = data.carList.find(car => car.vin === vin);

    const [dataURL, setDataURL] = useState(null);
    const[carDescription, setCarDescription] = useState(car.description);

    async function generateQR() {
        let qr = await QRCode.toDataURL(window.location.href, {type: 'image/png'});
        setDataURL(qr);
    }

    const changeDescription = () => {
        data.Axios.put("updateDescription", {vin: car.vin, description: carDescription}).then(
			(response) => {
				data.update();
			}
		)
    }

    generateQR()

    return (
        <div>
            <h1>{car.make_model} {car.year}</h1>
            <h2>VIN: {car.vin}</h2>
            <h3>Stock Number: {car.stockNum}</h3>
            <h4>Location: {car.spot_name}</h4>
            <EditTextarea
                id="carDes"
                value={carDescription}
                onChange={setCarDescription}
                onSave={changeDescription}
                // Remember to check if this works once development server is working again
            />
            <Button onClick={() => swalEditCar(car, data)}>Move Car</Button>
            <Button onClick={() => swalEditCarInfo(car, data)}>Edit Information</Button>
            {car.archived ? <Button onClick={() => swalUnArchiveCar(car, data)}>Undo Archive</Button> : <Button onClick={() => swalArchiveCar(car, data)}>Archive Car</Button>}
            {car &&
            <Button>
                <PDFDownloadLink document={<PDFGenerator dataURL={dataURL} car={car}/>} fileName={`QRCode_${vin}.pdf`}>
                    {({ blob, url, loading, error }) => loading ? 'Loading document...' : 'Download QR Code!'}
                </PDFDownloadLink>
            </Button>}
            
            {data.roles.includes("admin") &&
                <h4>Car History:</h4> &&
                <TableOfEdits data={data} filter={vin} />}
        </div>

    );
}
export default CarPage;