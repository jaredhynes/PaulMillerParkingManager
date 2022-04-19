import React from 'react';
import TableOfEdits from './TableOfEdits';

function Edits(props) {
	return (
		<div className="App">
			{props.roles.includes("admin") ?
				<TableOfEdits edits={props.edits}  />:
				<h1>You need admin access to view edits</h1>}
		</div>
	);
}
export default Edits;