import React from 'react';
import map from '../../Images/prototype_map.png';
import '../../Styles/map.css'
import Navbar from '../Navbar/index.js';

function ParkingMap(props) {

  return (
    <div>
    <div>
      <Navbar edits={props.edits}/>
    </div>
    <div className="mapImage">
      <div>
      <img id="parkingMap" src={map} alt="Map"></img>
      
      </div>
      <div id="tooltip" role="tooltip">
        My tooltip
    </div>

      </div>
      

    </div>
  );
}
 
export default ParkingMap;