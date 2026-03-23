import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  dateofbirth: ""
};

export default function CreateCustomer() {
  const [state, setState] = useState(initialState);

  const { customer_name, email, phone, address, dateofbirth } = state;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer_name || !email || !phone || !address || !dateofbirth) {
      toast.error("Please fill out all fields");
    } else {
      axios.post("http://localhost:5001/api/createcustomer", {
        customer_name,
        email,
        phone,
        address,
        dateofbirth
      })
        .then(() => {
          setState({
            customer_name: "",
            email: "",
            phone: "",
            address: "",
            dateofbirth: ""
          });
          toast.success("Customer added successfully!");
          setTimeout(() => navigate("/IndexCustomer"), 500);
        })
        .catch((err) => toast.error(err.response?.data || "Error creating customer"));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h3 className="mb-0">Add Customer</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="customer_name"
              onChange={handleInputChange}
              value={customer_name}
              className="form-control"
              placeholder="Customer Name"
            />
          </div>
          <div className="col">
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={email}
              className="form-control"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="phone"
              onChange={handleInputChange}
              value={phone}
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="address"
              onChange={handleInputChange}
              value={address}
              className="form-control"
              placeholder="Address"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="date"
              name="dateofbirth"
              onChange={handleInputChange}
              value={dateofbirth}
              className="form-control"
              placeholder="Date of Birth"
            />
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" style={{ marginLeft: '10px' }}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
