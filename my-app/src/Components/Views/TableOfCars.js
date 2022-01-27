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

    function reloadtable(){
      this.forceUpdate();
    }

    const [datatable, setDatatable] = React.useState({
      columns: [
        {
          label: 'Action',
          field: 'bttn',
        },
        {
          label: 'VIN',
          field: 'key',
        },
        {
          label: 'Make Model',
          field: 'make_model',
        },
        {
          label: 'Stock Number',
          field: 'stockNum',
        },
        {
          label: 'Location',
          field: 'newSpot',
        }
      ],
        rows: props.carList
    });
      
    return (
      <div>
      <MDBDataTable entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} order={['newSpot', 'asc']}/>
      </div>
    )
}
export default TableOfCars