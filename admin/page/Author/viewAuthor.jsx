import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewAuthor() {
  const [author, setAuthor] = useState({});
  const { id_authors } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getauthor/${id_authors}`)
      .then((resp) => setAuthor({ ...resp.data[0] }))
      .catch(() => console.error("Failed to fetch author data"));
  }, [id_authors]);

  return (
    <div>
      <h3 className="mb-0">Author Details</h3>
      <hr />
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Author ID</label>
          <input
            type="text"
            name="id_authors"
            className="form-control"
            placeholder="Author ID"
            value={author.id_authors || ""}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Author Name</label>
          <input
            type="text"
            name="author_name"
            className="form-control"
            placeholder="Author Name"
            value={author.author_name || ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
