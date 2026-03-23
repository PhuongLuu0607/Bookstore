import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Account() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Load all accounts
  const loadData = async () => {
    const response = await axios.get("http://localhost:5001/api/getallAccount");
    setData(response.data);
  };


  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="d-flex align-items-center justify-content-between card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Account Data</h6>
          <Link to="/CreateAccount" className="btn btn-primary ml-2 d-flex align-items-center">
            Add Account
          </Link>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <div>
              <label className="mr-2">Items per page:</label>
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
                  <th>Email</th>
                  <th>User Name</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id_account}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.user_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/ViewAccount/${item.id_account}`}
                        className="btn btn-primary btn-sm mr-2"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => alert(`Delete account ID ${item.id_account}`)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center mt-3">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  >
                    &laquo;
                  </button>
                </li>

                {[...Array(totalPages).keys()].map((number) => (
                  <li
                    key={number + 1}
                    className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                  >
                    <button
                      onClick={() => setCurrentPage(number + 1)}
                      className="page-link"
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  >
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
