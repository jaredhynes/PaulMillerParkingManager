import {React, useState} from 'react';

const ShowOnHover = (props) => {
    const [style, setStyle] = useState({display: 'none'});

    return (
        <div>
            <div style={{border: '1px solid gray', width: 175, height: 175, padding: 10, margin: 10}}
                onMouseEnter={e => {
                    setStyle({display: 'block'});
                }}
                onMouseLeave={e => {
                    setStyle({display: 'none'})
                }}
            >
                <p1 style={style}>VIN: {props.car.key}</p1>
                <p1 style={style}>Make/Model: {props.car.make_model}</p1>
                <p1 style={style}>Stock Number: {props.car.stockNum}</p1>
            </div>
        </div>
    );
};
export default ShowOnHover