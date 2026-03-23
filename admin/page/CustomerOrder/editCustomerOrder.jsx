import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  customer_name: "",
  order_date: "",
  total_price: "",
  status: "",
  address: "",
  note: "",
  phone: "",
  id_staff: "",
  payment_type: "",
  payment_status: ""
};

export default function EditOrder() {
  const [state, setState] = useState(initialState);

  const { customer_name, order_date, total_price, status, address, note, phone, id_staff, payment_type, payment_status } = state;

  const { id_customer_order } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadStaffs();
    axios.get(`http://localhost:5001/api/get-customer-order/${id_customer_order}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id_customer_order]);

  const [staffs, setStaffs] = useState([]);

  const loadStaffs = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/getallstaff");
      const data = response.data;
      setStaffs(data);
      const exists = data.some(staff => staff.id_staff === parseInt(state.id_staff));
      if (!exists) {
        setState(prev => ({
          ...prev,
          id_staff: ''
        }));
      }

    } catch (error) {
      console.error("Error loading staff:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please fill all required fields");
    } else {
      if (window.confirm("Do you want to update this order?")) {
        axios.put(`http://localhost:5001/api/update-customer-order/${id_customer_order}`, {
          status, id_staff, payment_type, payment_status
        }).then(() => {
          setState({ status: "" })
        }).catch((err) => toast.error(err.response.data));
        toast.success("Order updated successfully!")
        setTimeout(() => navigate("/IndexCustomerOrder"), 500);
      }
    }
  }

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    };

  return (
    <div>
      <h3 className="mb-0">Update Order</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Customer Name</label>
            <input type="text" name="customer_name" className="form-control"
              onChange={handleInputChange} value={customer_name || ""} />
          </div>
          <div className="col mb-3">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" className="form-control"
              onChange={handleInputChange} value={phone || ""} />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Order Date</label>
            <input type="text" name="order_date" className="form-control"
              onChange={handleInputChange} value={order_date?.slice(0, 10) || ""} />
          </div>
          <div className="col mb-3">
            <select
              style={{ marginTop: '31px' }}
              name="status"
              className="form-control"
              onChange={handleInputChange}
              value={status}
              disabled={state.status === 4}
            >
              <option value="1">Pending</option>
              <option value="2">Approved</option>
              <option value="3">Shipping</option>
              <option value="4">Delivered</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Address</label>
            <input type="text" name="address" className="form-control"
              onChange={handleInputChange} value={address || ""} />
          </div>
          <div className="col mb-3">
            <label className="form-label">Total Price</label>
            <input type="text" name="total_price" className="form-control"
              value={formatCurrency(total_price)} disabled />
          </div>
        </div>

        <div className='row'>
          <div className="col mb-3">
            <label className="form-label">Note</label>
            <input type="text" name="note" className="form-control"
              onChange={handleInputChange} value={note || ""} />
          </div>
          <div className="col mb-3">
            <label className="form-label">Delivery Staff</label>
            <select
              name="id_staff"
              className="form-control"
              onChange={handleInputChange}
              value={id_staff}
            >
              <option value="">-- Select Staff --</option>
              {staffs.map(staff => (
                <option key={staff.id_staff} value={staff.id_staff}>
                  {staff.staff_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Payment</label>
            <select
              name="combined_payment"
              className="form-control"
              
              value={`${payment_status}|${payment_type}`}
              onChange={(e) => {
                const [status, type] = e.target.value.split("|");
                setState({
                  ...state,
                  payment_status: parseInt(status),
                  payment_type: type
                });
              }}

              disabled={state.payment_status === 2}
            >
              <option value="1|BuyLate">Unpaid</option>
              <option value="2|VnPay">Paid via VnPay</option>
              <option value="2|BuyLate">Paid in Cash</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div style={{marginLeft:"10px"}} className="d-grid">
            <button className="btn btn-warning">Update</button>
          </div>
        </div>
      </form>
    </div>
  )
}
