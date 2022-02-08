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
                {props.car &&
                <p style={style}>VIN: {props.car.key}
                <br></br>Make/Model: {props.car.make_model}
                <br></br>Stock Number: {props.car.stockNum}
                <br></br>Location: {props.car.newSpot}</p>}
            </div>
        </div>
    );
};
export default ShowOnHover