import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
  author_name: "",
};

export default function CreateAuthor() {
  const [state, setState] = useState(initialState);
  const { author_name } = state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!author_name) {
      toast.error("Please fill in all fields");
    } else {
      axios.post("http://localhost:5001/api/createauthor", {
        author_name
      })
      .then(() => {
        setState({ author_name: "" });
        toast.success("Author added successfully!");
        setTimeout(() => navigate("/IndexAuthor"), 500);
      })
      .catch((err) => toast.error(err.response?.data || "Error adding author"));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h3 className="mb-0">Add Author</h3>
      <hr />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="author_name"
              id="author_name"
              onChange={handleInputChange}
              value={author_name}
              className="form-control"
              placeholder="Enter author name..."
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
