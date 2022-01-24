import React from 'react';
import { MDBBtn, MDBDataTable } from 'mdbreact';
import Container from '../Container';

export default function Basic(props) {
  props.carList.map(car => {
    car.bttn = <Container formType={"editCar"} car={car} triggerText={"Edit Car"} onSubmit={props.editCar} />
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

  return <MDBDataTable entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />;
}