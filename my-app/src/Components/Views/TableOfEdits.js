import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../../App.css';
import { MDBDataTable } from 'mdbreact';

const TableOfEdits = (props) => {
	let datatable = {
		columns: [
			{
				label: 'Edit type',
				field: 'type',
			},
			{
				label: 'Make Model',
				field: 'make_model',
			},
			{
				label: 'VIN',
				field: 'key',
			},
			{
				label: 'Stock Number',
				field: 'stockNum',
			},
			{
				label: 'Old Location',
				field: 'oldSpot',
			},
			{
				label: 'New Location',
				field: 'newSpot',
			},
			{
				label: 'Time',
				field: 'time',
			}
		],
		rows: props.edits
	}

	return (
		<div>
			<MDBDataTable entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
		</div>
	)
}

export default TableOfEdits;