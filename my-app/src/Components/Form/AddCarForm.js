import React from 'react';
import '../../Styles/formindex.css';

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

  return (
    <form onSubmit={onSubmit}>
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
  );
};
export default AddCarForm
