import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import { useUser } from '../../until/userContext';

export default function IndexWarehouse() {
  const [warehouses, setWarehouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { updateUser , user } = useUser();


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = warehouses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(warehouses.length / itemsPerPage);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/getallwarehouse");
      setWarehouses(response.data);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      loadData();
    } else {
      try {
        const response = await axios.get(`http://localhost:5001/api/searchwarehouse/${searchTerm}`);
        setWarehouses(response.data);
      } catch (error) {
        toast.error("Error searching data");
      }
    }
  };

  const handleDelete = (id_warehouse) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`http://localhost:5001/api/deletewarehouse/${id_warehouse}`)
        .then(() => {
          toast.success("Warehouse item deleted successfully!", { transition: Flip });
          setTimeout(() => loadData(), 500);
        })
        .catch(() => toast.error("Failed to delete item"));
    }
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="d-flex align-items-center justify-content-between card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Warehouse Data</h6>
          <Link to="/CreateWarehouse" className="btn btn-primary">Add Warehouse Item</Link>
        </div>

        <div className="d-flex align-items-center card-header">
          <form className="form-inline">
            <div className="input-group">
              <label htmlFor="searchBox">Search:</label>
              <input
                id="searchBox"
                style={{ marginLeft: '5px' }}
                type="text"
                onChange={handleSearch}
                className="form-control form-control-sm"
                placeholder="Enter keyword..."
              />
            </div>
          </form>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <div>
              <label className="mr-2">Records per page:</label>
              <select
                className="form-control form-control-sm d-inline-block"
                style={{ width: "80px" }}
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Name</th>
                  <th>Entry Date</th>
                  <th>Quantity</th>
                  <th>Details</th>
                  <th>Edit</th>
                    {(user.role === "Admin" || user.role === "Manage") &&
                  <th>Delete</th>
                    }
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id_warehouse}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{item.book_name}</td>
                    <td>{item.entry_date ? item.entry_date.slice(0, 10) : ""}</td>
                    <td>{item.quantity}</td>
                    <td><Link to={`/ViewWarehouse/${item.id_warehouse}`} className="btn btn-primary">View</Link></td>
                    <td><Link to={`/UpdateWarehouse/${item.id_warehouse}`} className="btn btn-warning">Edit</Link></td>
                    {(user.role === "Admin" || user.role === "Manage") &&
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id_warehouse)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>

            <nav>
              <ul className="pagination justify-content-center mt-3">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
                    &laquo;
                  </button>
                </li>

                {[...Array(totalPages).keys()].map(number => (
                  <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                    <button onClick={() => setCurrentPage(number + 1)} className="page-link">
                      {number + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
