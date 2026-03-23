import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

const initialState = {
  book_name: "",
  quantity: "",
  entry_date: "",
};

export default function EditWarehouse() {
  const [state, setState] = useState(initialState);
  const { book_name, quantity, entry_date } = state;

  const { id_warehouse } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/getwarehouse/${id_warehouse}`)
      .then((resp) => {
        if (resp.data && resp.data[0]) {
          setState({ ...resp.data[0] });
        }
      })
      .catch(() => toast.error("Failed to load data"));
  }, [id_warehouse]);

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
    if (!book_name || !quantity || !entry_date) {
      toast.error("Please fill in all fields");
    } else {
      if (window.confirm("Do you want to update this record?")) {
        axios.put(`http://localhost:5001/api/updatewarehouse/${id_warehouse}`, {
          book_name,
          quantity,
          entry_date:formatDate(entry_date),
        })
          .then(() => {
            toast.success("Warehouse item updated successfully!");
            navigate("/IndexWarehouse");
          })
          .catch((err) => toast.error(err.response?.data || "Server error"));
      }
    }
  };

  return (
    <div>
      <h1 className="mb-0">Update Warehouse</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Book Name</label>
            <input
              type="text"
              name="book_name"
              className="form-control"
              placeholder="Book Name"
              onChange={handleInputChange}
              value={book_name || ""}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Entry Date</label>
            <input
              type="date"
              name="entry_date"
              className="form-control"
              onChange={handleInputChange}
              value={moment(entry_date).format("YYYY-MM-DD") || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity"
              onChange={handleInputChange}
              value={quantity || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button
              style={{ marginLeft: '10px', marginTop: '30px' }}
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
