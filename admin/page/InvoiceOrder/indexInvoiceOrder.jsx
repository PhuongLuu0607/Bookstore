import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { useUser } from "../../until/userContext";

export default function IndexInvoiceOrder() {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { updateUser, user } = useUser();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const loadData = async () => {
    const response = await axios.get(
      "http://localhost:5001/api/getall-invoiceorder"
    );
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    try {
      const response = await axios.get(
        `http://localhost:5001/api/invoiceorders/search/${searchTerm}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error searching invoice orders", error);
    }
  };

  const deleteInvoiceOrder = (id_invoiceorder) => {
    if (window.confirm("Are you sure you want to delete this invoice order?")) {
      axios.delete(
        `http://localhost:5001/api/deleteinvoiceorders/${id_invoiceorder}`
      );
      toast.success("Invoice order deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip,
      });
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="d-flex align-items-center justify-content-between card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Invoice Orders Data
          </h6>
          <Link to="/createInvoiceOrder" className="btn btn-primary">
            Add Invoice Order
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
                  setCurrentPage(1);
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
                  <th>#</th>
                  <th>Staff ID</th>
                  <th>Supplier</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Entry Date</th>
                  <th>Total Price</th>
                  <th>Detail</th>
                  {(user.role === "Admin" || user.role === "Manage") && (
                    <>
                      <th>Edit</th>
                      <th>Delete</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => {
                  return (
                    <tr key={item.id_invoiceorder}>
                      <td>{index + 1}</td>
                      <td>{item.id_staff}</td>
                      <td>{item.name_supplier}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.entry_date?.slice(0, 10)}</td>
                      <td>{formatCurrency(item.total_price)}</td>
                      <td>
                        <Link
                          to={`/viewInvoiceOrder/${item.id_invoiceorder}`}
                          className="btn btn-primary"
                        >
                          View
                        </Link>
                      </td>
                      {(user.role === "Admin" || user.role === "Manage") && (
                        <td>
                          <Link
                            to={`/editInvoiceOrder/${item.id_invoiceorder}`}
                            className="btn btn-warning"
                          >
                            Edit
                          </Link>
                        </td>
                      )}
                      {(user.role === "Admin" || user.role === "Manage") && (
                        <td>
                          <button
                            type="button"
                            onClick={() =>
                              deleteInvoiceOrder(item.id_invoiceorder)
                            }
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

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
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
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
    </div>
  );
}
