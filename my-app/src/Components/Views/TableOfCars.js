import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


const TableOfCars = ({carList}) => {
    return ( 
        <div className="car-list">
            <table>
                <tr>
                    <th>Action</th>
                    <th>Make/Model</th>
                    <th>Vin</th>
                    <th>Stock Number</th>
                    <th>Location</th>
                    <th></th>
                </tr>
            {carList.map((car =>
            
            <tr key= {car.key}>
                <td>
                <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                </td>
                <td>{car.make_model}</td>
                <td>{car.key}</td>
                <td>{car.stockNum}</td>
                <td>{car.newSpot}</td>
                <td><button class="listedButton">Show on Map</button></td>
            </tr>
            ))}

            </table>
        </div>
     );
}
 
export default TableOfCars;