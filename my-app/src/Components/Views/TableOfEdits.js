import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../../App.css';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { swalRevertEdit } from '../../functions.js'

function TableOfEdits(props) {
	let data = props.data

	data.edits.forEach(edit => {
		switch (edit.event_type) {
			case "Undo Move":
			case "Move Car":
				edit.description = `Location: ${edit.old_location} -> ${edit.new_location} <br> `
				break
			case "Edit Car":
			case "Undo Edit":
				edit.description = `Make/Model: ${edit.old_make_model} -> ${edit.new_make_model} <br> Year: ${edit.old_year} -> ${edit.new_year} <br> Stock Number: ${edit.old_stock_num} -> ${edit.new_stock_num}`;
				break
			case "Add Car":
				edit.description = `Make/Model: ${edit.new_make_model} <br> Year: ${edit.new_year} <br> Stock Number: ${edit.new_stock_num} <br> Location: ${edit.new_location}`;
				break
			case "Archive Car":
			case "Undo Archive":
				edit.description = edit.archived === 1 ? `Car was archived <br> Description: ${edit.archive_description}` : `Car was unarchived`;
				break
			default:
				edit.description = "";
				break
		}
		edit.bttn = <Button onClick={() => showEditDetails(edit)}>Show Details</Button>
	})

	data.edits.sort((a, b) => {
		let dateA = new Date(a.event_date)
		let dateB = new Date(b.event_date)
		return dateB - dateA
	})

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
		rows: props.filter ? data.edits.filter(edit => edit.car_id === props.filter) : data.edits
	}

	function showEditDetails(edit) {
		Swal.fire({
			title: 'Edit Details',
			html: `<p> <b>${edit.event_type}</b> <br> ${edit.description} </p>`,
			showDenyButton: true,
			confirmButtonText: 'Close',
			denyButtonText: `Revert Edit`,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.close()
			} else if (result.isDenied) {
				swalRevertEdit(edit, data)
			}
		})
	}

	return (
		<div>
			<MDBDataTable hover scrollX entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
		</div>
	)
}

export default TableOfEdits;