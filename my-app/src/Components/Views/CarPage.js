import { React, useState } from 'react';
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import TableOfEdits from "./TableOfEdits";
import { EditTextarea } from 'react-edit-text'; 
import 'react-edit-text/dist/index.css';
import {swalEditCar, swalEditCarInfo, swalArchiveCar, swalUnArchiveCar} from '../../functions.js';
import PDFGenerator from './PDFGenerator';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {FaMapMarkerAlt} from "react-icons/fa";
import '../../Styles/carpage.css';


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
        return dataURL
    }

    const changeDescription = () => {
        data.Axios.put("updateDescription", {vin: car.vin, description: carDescription}).then(
			(response) => {
				data.update();
			}
		)
    }

    generateQR()

    const PDF = <PDFGenerator dataURL={dataURL} car={car}/>

    return (
        <div className="identifying-info">
            <h1><center>{car.make_model} {car.year}</center></h1>
            <h4><center>VIN: {car.vin}</center></h4>
            <p>Stock Number: {car.stockNum}</p>
            <p>Comm Number: {car.commNum}</p>
            <p>Exterior Color: {car.exteriorColor}</p>
            <p>Interior Color: {car.interiorColor}</p>
            <p>MSRP: {car.msrp}</p>
            <p>Location: {car.spot_name}{<FaMapMarkerAlt/>}</p>

            <EditTextarea
                id="carDes"
                value={carDescription}
                onChange={setCarDescription}
                onSave={changeDescription}
            />
            <Button onClick={() => swalEditCar(car, data)}>Move Car</Button>
            <Button onClick={() => swalEditCarInfo(car, data)}>Edit Information</Button>
            {car.archived ? <Button onClick={() => swalUnArchiveCar(car, data)}>Undo Archive</Button> : <Button onClick={() => swalArchiveCar(car, data)}>Archive Car</Button>}
            <Button>
                <PDFDownloadLink document={PDF} fileName={`QRCode_${vin}.pdf`}>
                    {({ blob, url, loading, error }) => loading ? 'Loading document...' : 'Download QR Code'}
                </PDFDownloadLink>
            </Button>
            
            {data.isAdmin &&
                <h4>Car History:</h4> &&
                <TableOfEdits data={data} filter={vin} />}
        </div>

    );
}
export default CarPage;