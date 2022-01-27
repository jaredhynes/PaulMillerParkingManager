import React from 'react';
import { MDBDataTable } from 'mdbreact';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const TableOfCars = (props) => {
    props.carList.map(car => {
        car.bttn = <DropdownButton id="dropdown-basic-button" title="Edit car">
        <Dropdown.Item onClick={() => props.swalEditCar(car)}>Change Location</Dropdown.Item>
        <Dropdown.Item >Edit Information</Dropdown.Item>
        <Dropdown.Item >Delete Car</Dropdown.Item>
      </DropdownButton>
      })
      const [datatable, setDatatable] = React.useState({
        columns: [
          {
            label: 'Action',
            field: 'bttn',
            width: 270,
          },
          {
            label: 'VIN',
            field: 'key',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'VIN',
            },
          },
          {
            label: 'Make Model',
            field: 'make_model',
            width: 270,
          },
          {
            label: 'Stock Number',
            field: 'stockNum',
            width: 200,
          },
          {
            label: 'Location',
            field: 'newSpot',
            width: 100,
          }
        ],
          rows: props.carList
      });

  function reloadtable(){
    this.forceUpdate();
  }
    
    return (
      <div>
      <MDBDataTable entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} order={['newSpot', 'asc']}/>
      </div>
    )
}
export default TableOfCars