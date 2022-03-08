import React from 'react';
import TableOfEdits from './TableOfEdits';

function Edits(props) {
	return (
		<div className="App">
			{props.carList.map(car => car.highlighted = false)}
			{props.roles.includes("admin") &&
				<TableOfEdits edits={props.edits} />}
			{!props.roles.includes("admin") &&
				<h1>You do not have sufficient permissions to view this page</h1>}
		</div>
	);
}
export default Edits;