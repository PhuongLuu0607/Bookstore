import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewWarehouse() {
  const [warehouse, setWarehouse] = useState({});
  const { id_warehouse } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/getwarehouse/${id_warehouse}`)
      .then((res) => setWarehouse({ ...res.data[0] }))
      .catch(() => console.error("Failed to fetch data"));
  }, [id_warehouse]);

  return (
    <div>
      <h3 className="mb-0">Warehouse Information</h3>
      <hr />

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Warehouse ID</label>
          <input
            type="text"
            className="form-control"
            value={warehouse.id_warehouse || ""}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Book Name</label>
          <input
            type="text"
            className="form-control"
            value={warehouse.book_name || ""}
            readOnly
          />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            className="form-control"
            value={warehouse.quantity || ""}
            readOnly
          />
        </div>
        <div className="col mb-3">
          <label className="form-label">Entry Date</label>
          <input
            type="text"
            className="form-control"
            value={warehouse.entry_date ? warehouse.entry_date.slice(0, 10) : ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
