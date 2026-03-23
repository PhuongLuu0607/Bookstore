import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  user_name: "",
  password: "",
  confirm_password: "",
  email: "",
  phone: "",
  id_account_type: "",
  id_customer: "",
  id_staff: ""
};

export default function CreateAccount() {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    user_name,
    password,
    confirm_password,
    email,
    phone,
    id_account_type,
    id_customer,
    id_staff
  } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!user_name || !password || !email || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password !== confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Check if email already exists
      const { data: allAccounts } = await axios.get("http://localhost:5001/api/getallAccount");
      const emailExists = allAccounts.some(account => account.email === email);

      if (emailExists) {
        toast.error("This email already exists in the system!");
        return;
      }

      // Create account
      await axios.post("http://localhost:5001/api/createaccount-with-details", {
        user_name,
        password,
        email,
        phone,
        id_account_type,
        id_customer: id_customer || null,
        id_staff: id_staff || null
      });

      toast.success("Account created successfully!");
      localStorage.removeItem('customerAccountData');
      localStorage.removeItem('staffAccountData');
      setState(initialState);

      setTimeout(() => navigate("/IndexAccount"), 500);
    } catch (err) {
      toast.error("An error occurred while creating the account.");
      console.error(err);
    }
  };

  useEffect(() => {
    const customerData = localStorage.getItem('customerAccountData');
    const staffData = localStorage.getItem('staffAccountData');

    if (customerData) {
      const parsed = JSON.parse(customerData);
      setState(prev => ({
        ...prev,
        user_name: parsed.user_name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        id_customer: parsed.id_customer || "",
        id_account_type: parsed.id_account_type || ""
      }));
    }

    if (staffData) {
      const parsed = JSON.parse(staffData);
      setState(prev => ({
        ...prev,
        user_name: parsed.user_name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        id_staff: parsed.id_staff || "",
        id_account_type: parsed.id_account_type || ""
      }));
    }
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center">
        <i
          className="fas fa-arrow-circle-left"
          onClick={() => window.history.back()}
          style={{
            fontSize: '24px',
            color: 'blue',
            marginRight: '8px',
            marginTop: '8px'
          }}
        ></i>
        <h3 className="mb-0">Create Account</h3>
      </div>

      <hr />

      <form onSubmit={handleSubmit}>

        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="user_name"
              value={user_name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Full name *"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Phone number *"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleInputChange}
              className="form-control pe-5"
              placeholder="Password *"
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} position-absolute`}
              style={{ top: "50%", right: "15px", transform: "translateY(-50%)", cursor: "pointer", color: "#999" }}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="col position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={confirm_password}
              onChange={handleInputChange}
              className="form-control pe-5"
              placeholder="Confirm Password *"
            />
            <i
              className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} position-absolute`}
              style={{ top: "50%", right: "15px", transform: "translateY(-50%)", cursor: "pointer", color: "#999" }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Email *"
            />
          </div>
          <div className="col">
            <select
              name="id_account_type"
              value={id_account_type}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select account type *</option>
              <option value="1">Admin</option>
              <option value="3">Staff</option>
              <option value="2">Customer</option>
              <option value="4">Manage</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button
              style={{ marginLeft: '10px' }}
              type="submit"
              className="btn btn-primary"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
