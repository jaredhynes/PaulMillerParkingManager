import React from 'react';
import TableOfEdits from './TableOfEdits';

function Edits(props) {
	let data = props.data

	return (
		<div>
			{data.roles.includes("admin") ?
				<TableOfEdits data={data}  />:
				<h1>You need admin access to view edits</h1>}
		</div>
	);
}
export default Edits;