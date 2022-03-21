import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../../App.css';
import { MDBDataTable } from 'mdbreact';


const TableOfEdits = (props) => {

	// function getSpotName(spotID){
	// 	return props.allSpots.find(el => 
    //         el.spot_id === spotID
    //     ).spot_name;
	// }

	let datatable = {
		columns: [
			{
				label: 'Edit type',
				field: 'event_type',
			},
			{
				label: 'VIN',
				field: 'car_id',
			},
			{
				label: 'Old Location',
				field: "old_spot_id",
			},
			{
				label: 'New Location',
				field: 'new_spot_id',
			},
			{
				label: 'Time',
				field: 'event_date',
			},
			{
				label: 'Sent by',
				field: 'user_id'
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