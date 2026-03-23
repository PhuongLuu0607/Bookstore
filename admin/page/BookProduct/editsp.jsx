import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  book_name: "",
  price: "",
  product_picture: "",
  id_category: "",
  description: "",
  quantity: "",
  publisher: "",
  isbn: "",
  id_authors: "",
  picture_hover1: "",
  picture_hover2: "",
  tag: "",
  notify: "",
};
export default function EditProduct() {
  const [state, setState] = useState(initialState);
  const [categoryList, setCategoryList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [file, setFile] = useState(null);

  const {
    book_name,
    price,
    id_category,
    description,
    quantity,
    notify,
    tag,
    isbn,
    publisher,
    picture_hover1,
    picture_hover2,
    product_picture,
    id_authors
  } = state;

  const { id_product } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/api/getallcategory")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error while fetching categories");
      });

    axios.get("http://localhost:5001/api/getallauthors")
      .then((response) => {
        setAuthorList(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error while fetching authors");
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/getproduct/${id_product}`)
      .then((resp) => setState({ ...resp.data[0] }))
      .catch(() => toast.error("Error while fetching product data"));
  }, [id_product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setFile(file);
    setState({ ...state, [type]: `/images/${file.name}` });
  };

  console.log(state)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!book_name || !price || !product_picture || !id_category) {
      return toast.error("Please fill in all required fields");
    }

    if (window.confirm("Do you want to update this product?")) {
      axios.put(`http://localhost:5001/api/updateproduct/${id_product}`, state)
        .then(() => {
          toast.success("Product updated successfully!");
          navigate("/IndexProduct");
        })
        .catch(err => toast.error(err.response?.data || "Error while updating product"));
    }
  };

  return (
    <div>
      <h3 className="mb-0">Update Product</h3>
      <hr />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Book Name</label>
            <input
              type="text"
              name="book_name"
              className="form-control"
              onChange={handleInputChange}
              placeholder="Book Name"
              value={book_name || ""}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Notify</label>
            <input
              type="text"
              name="notify"
              className="form-control"
              onChange={handleInputChange}
              value={notify || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              name="price"
              className="form-control"
              onChange={handleInputChange}
              placeholder="Price"
              value={price || ""}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="text"
              name="quantity"
              className="form-control"
              onChange={handleInputChange}
              value={quantity || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              name="isbn"
              className="form-control"
              onChange={handleInputChange}
              placeholder="ISBN"
              value={isbn || ""}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Publisher</label>
            <input
              type="text"
              name="publisher"
              className="form-control"
              onChange={handleInputChange}
              value={publisher || ""}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Author</label>
            <select
              name="id_authors"
              value={id_authors}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select Author</option>
              {authorList.map((ath) => (
                <option key={ath.id_authors} value={ath.id_authors}>
                  {ath.author_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">Category</label>
            <select
              name="id_category"
              value={id_category}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select Category</option>
              {categoryList.map((cat) => (
                <option key={cat.id_category} value={cat.id_category}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Tag</label>
            <input
              name="tag"
              className="form-control"
              onChange={handleInputChange}
              placeholder="tag"
              value={tag || ""}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              onChange={handleInputChange}
              placeholder="Description"
              value={description || ""}
            />
          </div>
        </div>

        <div className="row">
          <img
            style={{ borderRadius: '10px', marginLeft: '10px' }}
            src={state.product_picture}
            width="150"
            height="180"
            alt="Product"
          />
          <div className="col mb-3">
            <label className="form-label">Product Picture</label>
            <input
              type="file"
              name="product_picture"
              className="form-control"
              onChange={(e) => handleFileChange(e, 'product_picture')}
            />
          </div>
        </div>

        <div className="row">
          <img
            style={{ borderRadius: '10px', marginLeft: '10px' }}
            src={state.picture_hover1}
            width="150"
            height="180"
            alt="Hover"
          />
          <div className="col mb-3">
            <label className="form-label">Hover Picture</label>
            <input
              type="file"
              name="picture_hover1"
              className="form-control"
              onChange={(e) => handleFileChange(e, 'picture_hover1')}
            />
          </div>
        </div>
        <div className="row">
          <img
            style={{ borderRadius: '10px', marginLeft: '10px' }}
            src={state.picture_hover2}
            width="150"
            height="180"
            alt="Hover"
          />
          <div className="col mb-3">
            <label className="form-label">Hover Picture 1</label>
            <input
              type="file"
              name="picture_hover2"
              className="form-control"
              onChange={(e) => handleFileChange(e, 'picture_hover2')}
            />
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button
              style={{ marginLeft: '10px', marginTop: '30px' }}
              className="btn btn-warning"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
