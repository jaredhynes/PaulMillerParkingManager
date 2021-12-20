import React from "react";
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
 

const ActionMenu = () => {
    function handleClick(e, data) {
        console.log(data.foo);
      }

      function deleteEntry(e, data) {
        console.log(data);
      }
       

    return ( 
        <div>
        {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
        {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
   
        <ContextMenuTrigger id="same_unique_identifier">
          <div className="well">Right click to see the menu</div>
        </ContextMenuTrigger>
   
        <ContextMenu id="same_unique_identifier">
          <MenuItem onClick={handleClick}>
            Re-Park
          </MenuItem>
          <MenuItem onClick={handleClick}>
            Edit
          </MenuItem>
          <MenuItem divider />
          <MenuItem data= {{}}onClick={deleteEntry}>
            Delete Entry
          </MenuItem>
        </ContextMenu>
   
      </div>
     );
}
 
export default ActionMenu;