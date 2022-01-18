import React from 'react';
import ReactDom from 'react-dom';
import Swal from 'sweetalert2/src/sweetalert2.js'
// import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'
import '../../Styles/sweetalert.css'


export const AddCarForm = ({ onSubmit }) => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = () => {
    setChecked(!checked);
  }
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  function selfie() {
    Swal.fire('Any fool can use a computer')
  }
  
 
/*
  function confirm1() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this.",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function () {
      swal(
        'Deleted!',
        'Your file has been deleted',
        'success'
      )
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your imaginary file is safe! change',
          'error' //TBH i don't really like the error image here, we can change that
        )
      }
    })
  }
  */
  return (
    <button onClick={selfie}>Good Selfie</button>

   /* <form onSubmit={confirm1()}>
      <div className="form-group">
        <label htmlFor="Make and Model">Make and Model</label>
        <input 
        className="form-control" 
        id="make_model"
        placeholder="Audi A4 (2012)"
         />
      </div>
      <div className="form-group">
        <label htmlFor="vin">VIN</label>
        <input
          className="form-control"
          id="vin"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          className="form-control"
          id="location"
        />
      </div>
      <div className="form-group">
        <label htmlFor="stockNumber">Stock Number</label>
        <input
          className="form-control"
          id="stockNumber"
        />
      </div>
      <div>
        <Checkbox
          label=""
          value={checked}
          onChange={handleChange}
          />
          </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  ); */
  )};
export default AddCarForm
