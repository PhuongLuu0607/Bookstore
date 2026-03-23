import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  book_name: "",
  quantity: "",
  entry_date: "",
};

export default function CreateWarehouse() {
  const [state, setState] = useState(initialState);
  const { book_name, quantity, entry_date } = state;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book_name || !quantity || !entry_date) {
      toast.error("Please fill in all fields!");
    } else {
      axios.post("http://localhost:5001/api/createwarehouse", {
        book_name,
        quantity,
        entry_date,
      })
      .then(() => {
        setState({ book_name: "", quantity: "", entry_date: "" });
        toast.success("Warehouse item added successfully!");
        setTimeout(() => navigate("/IndexWarehouse"), 500);
      })
      .catch((err) => toast.error(err.response?.data || "Server error"));
    }
  };

  return (
    <div>
      <h3 className="mb-0">Add Book to Warehouse</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input 
              type="text" 
              name="book_name" 
              onChange={handleInputChange} 
              value={book_name} 
              className="form-control" 
              placeholder="Book Name" 
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input 
              type="number" 
              name="quantity" 
              onChange={handleInputChange} 
              value={quantity} 
              className="form-control" 
              placeholder="Quantity" 
            />
          </div>
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
        </div>

        <div className="row">
          <div className="d-grid">
            <button 
              style={{ marginLeft: '10px' }} 
              type="submit" 
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
