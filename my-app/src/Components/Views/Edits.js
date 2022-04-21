import React from 'react';
import TableOfEdits from './TableOfEdits';

function Edits(props) {
	let data = props.data

	return (
		<div className="App">
			{data.roles.includes("admin") ?
				<TableOfEdits edits={data.edits}  />:
				<h1>You need admin access to view edits</h1>}
		</div>
	);
}
export default Edits;