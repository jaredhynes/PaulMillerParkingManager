import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

function changeColor(){
    Swal.fire({
        title: "Status Color",
     })
}

const color_statusb = () => {
    return ( 
        <div>
            <Button onClick={() => changeColor()}>change color</Button>
        </div>
     );
}
 
export default color_statusb;