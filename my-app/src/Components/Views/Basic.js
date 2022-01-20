import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function Basic(props) {
  const [datatable, setDatatable] = React.useState({
    columns: [
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
    rows: props.carList,
  });

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />;
}