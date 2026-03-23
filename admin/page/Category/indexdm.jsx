import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios"; 
import { toast, Flip } from "react-toastify";
import { Link } from 'react-router-dom';
import { useUser } from '../../until/userContext';

export default function IndexCategory() {

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { updateUser , user } = useUser();


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5001/api/getAllCategory");
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
        const response = await axios.get(`http://localhost:5001/api/searchcategory/${searchTerm}`);
        setData(response.data);
      } catch (error) {
        console.error("Error searching categories", error);
      }
    }
  };

  const deleteCategory = (id_category) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios.delete(`http://localhost:5001/api/deleteCategory/${id_category}`);
      toast.success('Category deleted successfully!', {
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
    <Fragment>
      <div className="card shadow mb-4">
        <div className="d-flex align-items-center justify-content-between card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Category Data</h6>
          <Link to="/CreateCategory" className="btn btn-primary">Add Category</Link>
        </div>
        <div className="d-flex align-items-center card-header">
          <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <label htmlFor="">Search:</label>
              <input
                style={{ marginLeft: '5px' }}
                type="text"
                onChange={handleSearch}
                className="form-control form-control-sm"
                placeholder="Enter search term"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
            </div>
          </form>
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
                  <th>Category Name</th>
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
                    <tr key={item.id_category}>
                      <td>{indexOfFirstItem+index + 1}</td>
                      <td>{item.category_name}</td>
                      <td>
                        <Link to={`/ViewCategory/${item.id_category}`} className="btn btn-primary">
                          View
                        </Link>
                      </td>
                      <td>
                        <Link to={`/UpdateCategory/${item.id_category}`} className="btn btn-warning">
                          Edit
                        </Link>
                      </td>

                    {(user.role === "Admin" || user.role === "Manage") &&
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteCategory(item.id_category)}>
                          Delete
                        </button>
                      </td>
                    }
                    </tr>
                  );
                })}
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
    </Fragment>
  );
}
