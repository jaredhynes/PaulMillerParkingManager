import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Button from 'react-bootstrap/esm/Button';



const TableOfCars = (props) => {
    props.carList.map(car => {
        car.bttn = <Button onClick={() => props.swalEditCar(car)}>Menu</Button>
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