import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Button from 'react-bootstrap/esm/Button';


function dropDownMenu() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }


const TableOfCars = (props) => {
    props.carList.map(car => {
        <div class="dropdown">
        car.bttn = <Button onClick="dropDownMenu()" class="dropbtn">Menu</Button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#Edit">Edit Car</a>
                <a href="#Archive">Archive Car</a>
                <a href="#Delete">Delete Car</a>
            </div>
        </div>
      })
      const [datatable, setDatatable] = React.useState({
        columns: [
          {
            label: 'Action',
            field: 'bttn',
            width: 270,
          },
          {
            label: 'VIN',
            field: 'key',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'VIN',
            },
          },
          {
            label: 'Make Model',
            field: 'make_model',
            width: 270,
          },
          {
            label: 'Stock Number',
            field: 'stockNum',
            width: 200,
          },
          {
            label: 'Location',
            field: 'newSpot',
            width: 100,
          }
        ],
          rows: props.carList
      });

  function reloadtable(){
    this.forceUpdate();
  }
    
    return (
      <div>
      <MDBDataTable entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} order={['newSpot', 'asc']}/>
      </div>
    )
}
export default TableOfCars