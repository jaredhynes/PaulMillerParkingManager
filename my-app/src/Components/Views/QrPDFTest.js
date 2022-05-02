import React from 'react'
import QRcode from 'qrcode.react'
import { jsPDF } from 'jspdf'

const [currentLink, setCurrentLink] = useState(null);

function getCurrentPage() {
    setCurrentLink(window.location.href);
}


const QrPDFTest = () => {

    let pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [40, 40]
    })

    let base64Image = document.getElementById('qrcode').toDataURL()

    pdf.addImage(base64Image, 'png', 0, 0, 40, 40)
    pdf.save('QR.pdf')

    return <QRcode value = {currentLink} />
}


export default QrPDFTest;;