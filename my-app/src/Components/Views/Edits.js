import React from 'react';
import TableOfEdits from './TableOfEdits';

function Edits(props) {
	return (
		<div className="App">
			<TableOfEdits edits={props.edits} roles={props.roles} />
		</div>
	);
}
export default Edits;