import React from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
import map from '../../Images/prototype_map.png'

function ParkingMap(props) {

  return (
    <div>
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