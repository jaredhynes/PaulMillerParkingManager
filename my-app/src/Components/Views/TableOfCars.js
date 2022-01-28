import React from 'react';
import { MDBDataTable } from 'mdbreact';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2'
import '../../Styles/sweetalert.css'

const TableOfCars = (props) => {
    props.carList.map(car => {
        car.bttn = <DropdownButton id="dropdown-basic-button" title="Edit car">
        <Dropdown.Item onClick={() => props.swalEditCar(car)}>Change Location</Dropdown.Item>
        <Dropdown.Item onClick={() => swalArchiveCar(car)}>Archive Car</Dropdown.Item>
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

      function swalArchiveCar(car) {
        Swal.fire({
            title: 'Are you sure you would like to archive this car?',
            text: "This will remove it from the parking lot but keep it stored in the database.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, archive it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                    'Archive!',
                    'The data has been successfully stored.',
                    'success'
                    )
                }
        })
    }

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