import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import moment from "moment";
import { useUser } from "../../until/userContext";

export default function IndexCustomerOrder() {
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
      "http://localhost:5001/api/getall-customer-order"
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
        `http://localhost:5001/api/search-customer-order/${searchTerm}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error searching data", error);
    }
  };

  const deleteOrder = async (id_customer_order) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(
          `http://localhost:5001/api/delete-customer-order/${id_customer_order}`
        );
        toast.success("Order deleted successfully!", { transition: Flip });
        setTimeout(() => loadData(), 500);
      } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error(
          `Error: ${
            error.response?.data?.message || "Failed to delete order!"
          }`,
          { transition: Flip }
        );
      }
    }
  };

  const handleDateSearch = async (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) {
      loadData();
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/get-customer-order/order-date/${selectedDate}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error searching by date:", error);
      }
    }
  };

  const handleStatusSearch = async (e) => {
    const selectedStatus = e.target.value;
    if (!selectedStatus) {
      loadData();
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/get-customer-order/status/${selectedStatus}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error searching by status:", error);
      }
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="d-flex align-items-center justify-content-between card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Customer Orders</h6>
        <Link to="/CreateCustomerOrder" className="btn btn-primary">
          Add Order
        </Link>
      </div>
      <div className="card-header">
        <form className="w-100">
          <div className="d-flex align-items-center flex-wrap">
            {/* Search by Name */}
            <div className="d-flex align-items-center mr-4 mb-2">
              <label className="mb-0 mr-2">Search:</label>
              <input
                type="text"
                onChange={handleSearch}
                className="form-control form-control-sm"
                placeholder="Enter customer name"
              />
            </div>
            {/* Search by Date */}
            <div className="d-flex align-items-center mr-4 mb-2">
              <label className="mb-0 mr-2">Date:</label>
              <input
                type="date"
                onChange={handleDateSearch}
                className="form-control form-control-sm"
              />
            </div>
            {/* Search by Status */}
            <div className="d-flex align-items-center mr-4 mb-2">
              <label className="mb-0 mr-2">Status:</label>
              <select
                className="form-control form-control-sm"
                onChange={handleStatusSearch}
                defaultValue=""
              >
                <option value="">-- All --</option>
                <option value="1">Pending</option>
                <option value="2">Approved</option>
                <option value="3">Delivering</option>
                <option value="4">Delivered</option>
              </select>
            </div>
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
          <table className="table table-bordered" width="100%">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Total</th>
                <th>Address</th>
                <th>Status</th>
                <th>View</th>
                {(user.role === "Admin" || user.role === "Manage") && (
                  <>
                <th>Approve</th>
                <th>Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id_customer_order}>
                  <td>{index + 1}</td>
                  <td>{item.customer_name}</td>
                  <td>{moment(item.order_date).format("YYYY-MM-DD")}</td>
                  <td>{formatCurrency(item.total_price)}</td>
                  <td style={{ maxWidth: "250px" }}>{item.address}</td>
                  <td>
                    {parseInt(item.status) === 1
                      ? "Pending"
                      : parseInt(item.status) === 2
                      ? "Approved"
                      : parseInt(item.status) === 3
                      ? "Delivering"
                      : parseInt(item.status) === 4
                      ? "Delivered"
                      : "Unknown"}
                  </td>
                  <td>
                    <Link
                      to={`/ViewCustomerOrder/${item.id_customer_order}`}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                  </td>
                  {(user.role === "Admin" || user.role === "Manage") && (
                    <td>
                      <Link
                        to={`/UpdateCustomerOrder/${item.id_customer_order}`}
                        className="btn btn-warning"
                      >
                        Update
                      </Link>
                    </td>
                  )}
                  {(user.role === "Admin" || user.role === "Manage") && (
                    <td>
                      <button
                        onClick={() => deleteOrder(item.id_customer_order)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
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
