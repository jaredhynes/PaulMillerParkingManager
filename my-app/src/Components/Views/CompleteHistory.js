import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../../App.css';
import NavBar from "../NavBar/index.js"

const CompleteHistory = (props) => {
    return (  
        <div>
        <div className="App">
            
            <table>
            <tr> 
                <th>Edit Type</th>
                <th>Make/Model</th>
                <th>VIN</th>
                <th>Stock Number</th>
                <th>Old Location</th>
                <th>New Location</th>
                <th>Time</th>
            </tr>
            {props.edits.map((edit =>
            <tr>
                <td>{edit.type}</td>
                <td>{edit.make_model}</td>
                <td>{edit.key}</td>
                <td>{edit.stockNum}</td>
                <td>{edit.oldSpot}</td>
                <td>{edit.newSpot}</td>
                <td>{edit.time}</td>
            </tr>
            ))}
            </table>

        </div>
        </div>
          
    );
}
 
export default CompleteHistory;