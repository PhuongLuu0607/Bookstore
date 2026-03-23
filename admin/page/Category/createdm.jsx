import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  category_name: "",
};

export default function CreateCategory() {
  const [state, setState] = useState(initialState);

  const { category_name } = state;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category_name) {
      toast.error("Please enter all required information");
    } else {
      axios.post("http://localhost:5001/api/createcategory", {
        category_name
      })
      .then(() => {
        setState({ category_name: "" });
        toast.success("Category added successfully!");
        setTimeout(() => navigate("/IndexCategory"), 500);
      })
      .catch((err) => toast.error(err.response?.data || "Error adding category"));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h3 className="mb-0">Add Category</h3>
      <hr />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="category_name"
              id="category_name"
              onChange={handleInputChange}
              value={category_name}
              className="form-control"
              placeholder="Enter category name..."
            />
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button style={{ marginLeft: '10px' }} type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
