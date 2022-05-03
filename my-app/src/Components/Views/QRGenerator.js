import React from 'react';
//import QRCode from  'qrcode.react';

const QRCode = require("qrcode")

const QRGenerator = props => {
    const {valueString, documentId } = props;

    

    return (
        <div>
            {/* <QRCode
            id={documentId}
            value={valueString}
            size={128}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'H'}
            includeMargin={true}
            /> */}
            hi
        </div>
    );
};

export default QRGenerator;