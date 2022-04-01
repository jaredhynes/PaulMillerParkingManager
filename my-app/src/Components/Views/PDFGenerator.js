import React from 'react';
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
// import logo from '../../../public/audi.png';


function PDFGenerator(props) {

    const styles = StyleSheet.create({
        page: {
            backgroundColor: 'white',
            display: 'block',
        },
        view: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
        },
        QRImage: {
            width: '100%',
            height: '100%',
        },
        text: {
            color: '#0081C6',
            size: '11em',
        },
        logoImage: {
            width: '25%',
            height: '50%',
        },
    });



    const resultArray = PDFImageIds.map(id => {
        // IdsArray.push(id);
        return document.getElementById(id).toDataURL();
    })

    const { PDFImageIds } = props;

    return (
        <Document>
            {resultArray.map((dataURL, id) => {
                return (
                    <Page key={`PageId+${id}`} size={'B8'} style={StyleSheet.page}>
                        <View style={styles.view}>
                            <Image allowDangerousPaths src={dataURL} style={styles.QRImage} />    
                        </View>
                        {/* <View style={styles.view}>
                            <Text style={styles.text}>{IdsArray[id]}</Text>    
                        </View> */}
                        {/* <View style={styles.view}>
                            <Image src={logo} style={styles.logoImage}/>    
                        </View> */}
                    </Page>
                );
            })}
        </Document>
    )
}
export default PDFGenerator;