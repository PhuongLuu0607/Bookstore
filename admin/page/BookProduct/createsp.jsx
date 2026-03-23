import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  notify: ""
};

export default function CreateProduct() {
  const [state, setState] = useState(initialState);
  const [categoryList, setCategoryList] = useState([]);
  const [authorList, setAuthorList] = useState([]);

  const {
    book_name,
    price,
    product_picture,
    id_category,
    description,
    quantity,
    publisher,
    isbn,
    id_authors,
    picture_hover1,
    picture_hover2,
    tag,
    notify
  } = state;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!book_name || !price || !product_picture || !id_category || !description) {
      toast.error("Please fill in all required fields.");
    } else {
      axios.post("http://localhost:5001/api/createproduct", state)
        .then(() => {
          setState(initialState);
          toast.success("Product added successfully!");
          setTimeout(() => navigate("/IndexProduct"), 500);
        })
        .catch((err) => {
          console.error(err);
          toast.error("An error occurred while adding the product.");
        });
    }
  };

  const handleFileChange = (e,type) => {
    const file = e.target.files[0];
    setState({ ...state, [type]: `/images/${file.name}` });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h3 className="mb-0">Add Product</h3>
      <hr />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="book_name"
              onChange={handleInputChange}
              value={book_name}
              className="form-control"
              placeholder="Book Name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="price"
              onChange={handleInputChange}
              value={price}
              className="form-control"
              placeholder="Price"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
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
          <div className="col">
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

        <div className="row mb-3">
          <div className="col">
            <input
              type="number"
              onChange={handleInputChange}
              value={quantity}
              name="quantity"
              className="form-control"
              placeholder="Quantity"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="notify"
              onChange={handleInputChange}
              value={notify}
              className="form-control"
              placeholder="Notify"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="publisher"
              onChange={handleInputChange}
              value={publisher}
              className="form-control"
              placeholder="Publisher"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="isbn"
              onChange={handleInputChange}
              value={isbn}
              className="form-control"
              placeholder="ISBN"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="">Picture hover</label>
            <input
              type="file"
              name="product_picture"
              onChange={(e) => handleFileChange(e,"product_picture")}
              className="form-control"
              placeholder="Product Picture"
            />
          </div>
          <div className="col">
            <label htmlFor="">Tag</label>
            <input
              type="text"
              name="tag"
              onChange={handleInputChange}
              value={tag}
              className="form-control"
              placeholder="Tag"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="">Picture hover 1</label>
            <input
              type="file"
              name="picture_hover1"
              onChange={(e) => handleInputChange(e,"picture_hover1")}
              value={picture_hover1}
              className="form-control"
              placeholder="Picture Hover 1"
            />
          </div>
          <div className="col">
            <label htmlFor="">Picture hover 2</label>
            <input
              type="file"
              name="picture_hover2"
              onChange={(e) =>handleInputChange(e,"picture_hover1")}
              value={picture_hover2}
              className="form-control"
              placeholder="Picture Hover 2"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <textarea
              name="description"
              onChange={handleInputChange}
              value={description}
              className="form-control"
              placeholder="Description"
            />
          </div>
        </div>

        <div className="row">
          <div className="d-grid">
            <button
              style={{ marginLeft: '10px' }}
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
