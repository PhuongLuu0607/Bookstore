import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewCustomer() {
  const [customer, setCustomer] = useState({});
  const { id_customer } = useParams(); // lấy ID từ URL
  const navigate = useNavigate();

  // Lấy dữ liệu khách hàng
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getcustomer/${id_customer}`)
      .then((resp) => setCustomer({ ...resp.data[0] }))
      .catch((err) => console.error("Failed to load customer:", err));
  }, [id_customer]);


  const handleRegisterAccount = () => {
    localStorage.setItem(
      "customerAccountData",
      JSON.stringify({
        id_customer: customer.id_customer,
        user_name: customer.customer_name,
        phone: customer.phone,
        email: customer.email,// nếu DB có ảnh khách hàng
        id_account_type: 2, 
      })
    );

    navigate("/CreateAccount");
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <h3 className="mb-0">Customer Information</h3>
      </div>

      <hr />

      <div className="row">

        <div className="col mb-3">
          <label className="form-label">Customer ID </label>
          <input
            type="text"
            name="id_customer" 
            className="form-control"
            value={customer.id_customer || ""}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            name="customer_name"
            className="form-control"
            value={customer.customer_name || ""}
            readOnly
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
            value={customer.phone || ""}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={customer.email || ""}
            readOnly
          />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={customer.address || ""}
            readOnly
          />
        </div>

        <div className="col mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            className="form-control"
            value={customer.dateofbirth ? customer.dateofbirth.slice(0, 10) : ""}
            readOnly
          />
        </div>
      </div>

      <div className="d-grid">
        <button
          className="btn btn-warning"
          style={{ marginTop: "15px", marginLeft: "10px" }}
          onClick={handleRegisterAccount}
        >
          Register Account
        </button>
      </div>
    </div>
  );
}
