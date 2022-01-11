import React, { useState } from 'react';
import '../../Styles/formindex.css';
import model from "../../Dummydb/dummyCardata";

export const EditCarForm = ({ onSubmit, car }) => {

  // currently hardcoded for the only the first car.
  const [checked, setChecked] = useState(true);
  const [make_model, setName] = useState(car.make_model);
  const [location, setLocation] = useState(car.newSpot);
  const [Vin, setVin] = useState(car.key);
  const [stockNum, setStockNumber] = useState(car.stockNum);

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
        value={make_model}
         />
      </div>
      <div className="form-group">
        <label htmlFor="vin">VIN</label>
        <input
          className="form-control"
          id="vin"
          value={Vin}
          onChange={(value) => setVin(value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          className="form-control"
          id="location"
          value={location}
        />
      </div>
      <div className="form-group">
        <label htmlFor="stockNumber">Stock Number</label>
        <input
          className="form-control"
          id="stockNumber"
          value={stockNum}
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
export default EditCarForm