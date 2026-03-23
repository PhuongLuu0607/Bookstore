import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  author_name: "",
};

export default function EditAuthor() {
  const [state, setState] = useState(initialState);
  const { author_name } = state;
  const { id_authors } = useParams();
  const navigate = useNavigate();

  // Fetch author by ID
  useEffect(() => {
    axios.get(`http://localhost:5001/api/getauthor/${id_authors}`)
      .then((resp) => setState({ ...resp.data[0] }))
      .catch(() => toast.error("Failed to fetch author"));
  }, [id_authors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!author_name) {
      toast.error("Please fill in all fields");
    } else {
      if (window.confirm("Do you want to update this author?")) {
        axios.put(`http://localhost:5001/api/updateauthor/${id_authors}`, {
          author_name
        })
        .then(() => {
          toast.success("Author updated successfully!");
          setState({ author_name: "" });
          setTimeout(() => navigate("/IndexAuthor"), 500);
        })
        .catch((err) => toast.error(err.response?.data || "Failed to update author"));
      }
    }
  };

  return (
    <div>
      <h3 className="mb-0">Edit Author</h3>
      <hr />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="author_name"
              id="author_name"
              onChange={handleInputChange}
              value={author_name || ""}
              className="form-control"
              placeholder="Enter author name..."
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
