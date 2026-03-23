import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Flip } from "react-toastify";
import { useUser } from '../../until/userContext';

export default function CustomerList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
    const { updateUser , user } = useUser();


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5001/api/getallcustomer");
    setData(response.data);
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
        const response = await axios.get(
          `http://localhost:5001/api/searchcustomer/${searchTerm}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error searching data", error);
      }
    }
  };

  const deleteCustomer = (id_customer) => {
    if (window.confirm("Do you want to delete this customer?")) {
      axios.delete(`http://localhost:5001/api/deletecustomer/${id_customer}`);
      toast.success("Customer deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="d-flex align-items-center justify-content-between card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Customer Data</h6>
        <Link to="/CreateCustomer" className="btn btn-primary">
          Add Customer
        </Link>
      </div>

      <div className="d-flex align-items-center card-header">
        <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <label htmlFor="">Search:</label>
            <input
              style={{ marginLeft: "5px" }}
              type="text"
              onChange={handleSearch}
              className="form-control form-control-sm"
              placeholder="Enter keyword"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
          </div>
        </form>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <div>
            <label className="mr-2">Rows per page:</label>
            <select
              className="form-control form-control-sm d-inline-block"
              style={{ width: "80px" }}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1); // reset về trang đầu
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>No.</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Details</th>
                <th>Edit</th>
                    {(user.role === "Admin" || user.role === "Manage") &&
                <th>Delete</th>
                    }
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <tr key={item.id_customer}>
                    <td>{indexOfFirstItem+index + 1}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link
                        to={`/ViewCustomer/${item.id_customer}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/UpdateCustomer/${item.id_customer}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                    </td>

                    {(user.role === "Admin" || user.role === "Manage") &&
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteCustomer(item.id_customer)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center mt-3">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                >
                  &laquo;
                </button>
              </li>

              {[...Array(totalPages).keys()].map((number) => (
                <li
                  key={number + 1}
                  className={`page-item ${
                    currentPage === number + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentPage(number + 1)}
                    className="page-link"
                  >
                    {number + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                  }
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
