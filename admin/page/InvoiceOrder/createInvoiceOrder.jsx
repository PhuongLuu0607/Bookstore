import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
  entry_date: "",
  total_price: "",
  name_supplier: "",
  phone: "",
  id_staff: "",
  email: "",
  address: ""
};

export default function CreateInvoiceOrder() {
  const [state, setState] = useState(initialState);
  const { entry_date, total_price, name_supplier, phone, id_staff, email, address } = state;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry_date || !total_price || !name_supplier || !phone || !id_staff || !email || !address) {
      toast.error("Please fill in all required fields!");
    } else {
      axios
        .post("http://localhost:5001/api/invoiceorders", {
          entry_date,
          total_price,
          name_supplier,
          phone,
          id_staff,
          email,
          address
        })
        .then(() => {
          setState(initialState);
          toast.success("Invoice order added successfully!");
          setTimeout(() => navigate("/invoiceorders"), 500);
        })
        .catch((err) => toast.error(err.response?.data || "Error while adding invoice order"));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h3 className="mb-0">Create Invoice Order</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="name_supplier"
              onChange={handleInputChange}
              value={name_supplier}
              className="form-control"
              placeholder="Supplier Name"
            />
          </div>
          <div className="col">
            <input
              type="text"
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
              name="id_staff"
              onChange={handleInputChange}
              value={id_staff}
              className="form-control"
              placeholder="Staff ID"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="phone"
              onChange={handleInputChange}
              value={phone}
              className="form-control"
              placeholder="Phone"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="date"
              name="entry_date"
              onChange={handleInputChange}
              value={entry_date}
              className="form-control"
              placeholder="Entry Date"
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="total_price"
              onChange={handleInputChange}
              value={total_price}
              className="form-control"
              placeholder="Total Price"
            />
          </div>
        </div>

        <div className="row mb-3">
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
