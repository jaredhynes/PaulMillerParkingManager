import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../../App.css';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


function TableOfEdits(props) {

	props.edits.map(edit => (
		edit.bttn = <Button onClick={() => showEditDetails(edit)}>Show Details</Button>
	))

	//SOrt edit by date
	props.edits.sort((a, b) => (a.event_date > b.event_date) ? -1 : 1)

	let datatable = {
		columns: [
			{
				label: 'Edit Type',
				field: 'event_type',
			},
			{
				label: 'VIN',
				field: 'car_id',
			},
			{
				label: 'Time',
				field: 'event_date',
			},
			{
				label: 'Sent by',
				field: 'user_id'
			},
			{
				label: 'Details',
				field: "bttn",
			}
		],
		rows: props.edits
	}

	function showEditDetails(edit) {
		Swal.fire({
			title: 'Edit Details',
			html: `<p> ${edit.event_type} <br> ${edit.event_description} </p>`,
			confirmButtonText: 'Close'
		})
	}

	return (
		<div>
			<MDBDataTable hover scrollX entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
		</div>
	)
}

export default TableOfEdits;