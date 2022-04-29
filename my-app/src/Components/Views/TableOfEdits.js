import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../../App.css';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


function TableOfEdits(props) {

	props.edits.map(edit => {
		switch(edit.event_type) {
			case "Move Car":
				edit.description = `Location: ${edit.old_location} -> ${edit.new_location} <br> `
				break
			case "Edit Car":
				edit.description = `Make/Model: ${edit.old_make_model} -> ${edit.new_make_model} <br> Year: ${edit.old_year} -> ${edit.new_year} <br> Stock Number: ${edit.old_stock_num} -> ${edit.new_stock_num}`;
				break
			case "Add Car":
				edit.description = `Make/Model: ${edit.new_make_model} <br> Year: ${edit.new_year} <br> Stock Number: ${edit.new_stock_num} <br> Location: ${edit.new_location}`;
				break
			default:
				edit.description = "";
				break
		}
		edit.bttn = <Button onClick={() => showEditDetails(edit)}>Show Details</Button>
	})

	//SOrt edit by date
	props.edits.sort((a, b) => (a.event_date > b.event_date) ? -1 : 1)

	let datatable = {
		columns: [
			{
				label: 'Edit Type',
				field: 'event_type',
				width: '120'
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
				width: '210'
			}
		],
		rows: props.edits
	}

	function showEditDetails(edit) {
		Swal.fire({
			title: 'Edit Details',
			html: `<p> ${edit.event_type} <br> ${edit.description} </p>`,
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