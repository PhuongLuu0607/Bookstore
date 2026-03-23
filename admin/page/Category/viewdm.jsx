import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewCategory() {
  const [category, setCategory] = useState({});
  const { id_category } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/getCategory/${id_category}`)
      .then((resp) => setCategory({ ...resp.data[0] }))
      .catch(() => console.error("Failed to load category data"));
  }, [id_category]);

  return (
    <div>
      <h3 className="mb-0">Category Information</h3>
      <hr />
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Category ID</label>
          <input
          
            type="text"
            name="id_category"
            className="form-control"
            placeholder="Category ID"
            value={id_category}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            name="category_name"
            className="form-control"
            placeholder="Category Name"
            value={category.category_name || ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
