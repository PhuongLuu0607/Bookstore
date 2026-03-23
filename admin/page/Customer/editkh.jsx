import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

const initialState = {
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  dateofbirth: ""
};

export default function EditCustomer() {
  const [state, setState] = useState(initialState);

  const { customer_name, email, phone, address, dateofbirth } = state;
  const { id_customer } = useParams(); // đổi để khớp DB (PK = id_customer)

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getcustomer/${id_customer}`)
      .then((resp) => setState({ ...resp.data[0] }))
      .catch((err) => toast.error("Failed to fetch customer data"));
  }, [id_customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  function formatDate(inputDate) {
    // Tạo một đối tượng Date từ chuỗi đầu vào
    const date = new Date(inputDate);

    // Kiểm tra nếu ngày hợp lệ
    if (isNaN(date)) {
        throw new Error('Invalid date format');
    }

    // Chuyển đổi thành định dạng YYYY-MM-DD
    return date.toISOString().split('T')[0];
}

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer_name || !email || !phone || !address || !dateofbirth) {
      toast.error("Please fill out all fields");
    } else {
      if (window.confirm("Do you want to update this customer?")) {
        axios
          .put(`http://localhost:5001/api/updatecustomer/${id_customer}`, {
            customer_name,
            email,
            phone,
            address,
            dateofbirth:formatDate(dateofbirth)
          })
          .then(() => {
            toast.success("Customer updated successfully!");
            setState({
              customer_name: "",
              email: "",
              phone: "",
              address: "",
              dateofbirth: ""
            });
            setTimeout(() => navigate("/IndexCustomer"), 500);
          })
          .catch((err) =>
            toast.error(err.response?.data || "Error updating customer")
          );
      }
    }
  };

  return (
    <div>
      <h1 className="mb-0">Edit Customer</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              name="customer_name"
              className="form-control"
              placeholder="Customer Name"
              onChange={handleInputChange}
              value={customer_name || ""}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleInputChange}
              value={email || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Phone Number"
              onChange={handleInputChange}
              value={phone || ""}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              onChange={handleInputChange}
              value={address || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              className="form-control"
              onChange={handleInputChange}
              value={moment(dateofbirth).format("YYYY-DD-MM") || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button
              style={{ marginLeft: "10px" }}
              type="submit"
              className="btn btn-warning"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
