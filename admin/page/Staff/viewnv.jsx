import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function ViewStaff() {
  const [staff, setStaff] = useState({});
  const { id_staff } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getstaff/${id_staff}`)
      .then((res) => setStaff({ ...res.data[0] }))
      .catch((err) => console.error("Failed to load staff:", err));
  }, [id_staff]);


  const handleRegisterAccount = () => {
    localStorage.setItem(
      "staffAccountData",
      JSON.stringify({
        id_staff: staff.id_staff,
        user_name: staff.staff_name,
        phone: staff.phone,
        email: staff.email,
        id_account_type: 3, 
      })
    );

    navigate("/CreateAccount");
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <i
          className="fas fa-arrow-circle-left"
          onClick={() => window.history.back()}
          style={{
            fontSize: "24px",
            color: "blue",
            marginRight: "8px",
            marginTop: "8px",
            cursor: "pointer",
          }}
        ></i>
        <h3 className="mb-0">Employee Information</h3>
      </div>
      <hr />

      <div className="row">
        <img
          style={{ borderRadius: "10px", marginLeft: "10px" }}
          src={staff.staff_picture || "https://via.placeholder.com/150"}
          width="150"
          height="180"
          className="img img-responsive"
          alt="employee"
        />
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Employee ID</label>
          <input
            type="text"
            name="id_staff"
            className="form-control"
            value={staff.id_staff || ""}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            name="staff_name"
            className="form-control"
            value={staff.staff_name || ""}
            readOnly
          />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Gender</label>
          <input
            type="text"
            name="gender"
            className="form-control"
            value={
              staff.gender === 1
                ? "Male"
                : staff.gender === 2
                ? "Female"
                : "Other"
            }
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Birthday</label>
          <input
            type="text"
            name="birthday"
            className="form-control"
            value={
              staff.birthday ? moment(staff.birthday).format("DD/MM/YYYY") : ""
            }
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
            value={staff.address || ""}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={staff.phone || ""}
            readOnly
          />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">National ID</label>
          <input
            type="text"
            name="cmnd"
            className="form-control"
            value={staff.cmnd || ""}
            readOnly
          />
        </div>

        <div className="col mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={staff.email || ""}
            readOnly
          />
        </div>
      </div>

      <div className="d-grid">
        <button
          className="btn btn-warning"
          style={{ marginTop: "15px", marginLeft: "5px" }}
          onClick={handleRegisterAccount}
        >
          Register Account
        </button>
      </div>
    </div>
  );
}
