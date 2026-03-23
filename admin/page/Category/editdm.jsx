import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  category_name: "",
};

export default function EditCategory() {

  const [state, setState] = useState(initialState);
  const { category_name } = state;
  const { id_category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/getCategory/${id_category}`)
      .then((resp) => setState({ ...resp.data[0] }))
      .catch(() => toast.error("Failed to fetch category data"));
  }, [id_category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category_name) {
      toast.error("Please enter all required information");
    } else {
      if (window.confirm("Do you want to update this category?")) {
        axios.put(`http://localhost:5001/api/updateCategory/${id_category}`, {
          category_name
        })
        .then(() => {
          setState({ category_name: "" });
          toast.success("Category updated successfully!");
          setTimeout(() => navigate("/IndexCategory"), 500);
        })
        .catch((err) => toast.error(err.response?.data || "Error updating category"));
      }
    }
  };

  return (
    <div>
      <h3 className="mb-0">Edit Category</h3>
      <hr />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="category_name"
              id="category_name"
              onChange={handleInputChange}
              value={category_name || ""}
              className="form-control"
              placeholder="Enter category name..."
            />
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button style={{ marginLeft: '10px' }} type="submit" className="btn btn-warning">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
