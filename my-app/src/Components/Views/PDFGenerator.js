import React from 'react';
import { Document, Page, Image, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import audi from '../../Images/audi.png';

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        display: 'block',
    },
    viewer: {
        width: window.innerWidth/ 3,
        height: window.innerHeight / 2,
    },
    QRImage: {
        width: '100%',
        height: '64.7%',
    },
    text: {
        color: '#0081C6',
        size: '11em',
        textAlign: 'center',
    },
    logoImage: {
        width: '5%',
        height: '5%',
    },
});

const PDFGenerator = (props) => (
    <Document>
            <Page>
                <Text style={styles.text}>VIN: {props.car.vin}</Text>
                <Image style={styles.QRImage} src={props.dataURL} />
                <Text style={styles.text} >{props.car.make_model} {props.car.year}</Text>
                <Image style={styles.logoImage} src={audi} />
            </Page>
    </Document>
        
)
export default PDFGenerator;