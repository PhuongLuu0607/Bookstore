import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewProduct() {

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  };

  const [product, setProduct] = useState({});
  const { id_product } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/getproduct/${id_product}`)
      .then((resp) => setProduct({ ...resp.data[0] }))
      .catch((err) => console.error("Error loading product", err));
  }, [id_product]);

  return (
    <div>
      <h3 className="mb-0">Product Details: {product.book_name}</h3>
      <hr />

      {/* Images */}
      <div className="row">
        <img
          style={{ borderRadius: '10px', marginLeft: '10px' }}
          src={product.product_picture}
          width="150"
          height="180"
          className="img img-responsive"
          alt="product"
        />
        {product.picture_hover1 && (
          <img
            style={{ borderRadius: '10px', marginLeft: '10px' }}
            src={product.picture_hover1}
            width="150"
            height="180"
            className="img img-responsive"
            alt="hover1"
          />
        )}
        {product.picture_hover2 && (
          <img
            style={{ borderRadius: '10px', marginLeft: '10px' }}
            src={product.picture_hover2}
            width="150"
            height="180"
            className="img img-responsive"
            alt="hover2"
          />
        )}
      </div>

      <hr />

      {/* ID and Category */}
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Product ID</label>
          <input type="text" className="form-control" value={id_product} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">Category ID</label>
          <input type="text" className="form-control" value={product.id_category || ""} readOnly />
        </div>
      </div>

      {/* Basic Info */}
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Book Name</label>
          <input type="text" className="form-control" value={product.book_name || ""} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            value={product.price ? formatCurrency(product.price) : ""}
            readOnly
          />
        </div>
      </div>

      {/* Stock & Publisher */}
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Quantity</label>
          <input type="text" className="form-control" value={product.quantity || ""} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">Publisher</label>
          <input type="text" className="form-control" value={product.publisher || ""} readOnly />
        </div>
      </div>

      {/* Author & ISBN */}
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Author ID</label>
          <input type="text" className="form-control" value={product.id_authors || ""} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">ISBN</label>
          <input type="text" className="form-control" value={product.isbn || ""} readOnly />
        </div>
      </div>

      {/* Tag & Notify */}
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Tag</label>
          <input type="text" className="form-control" value={product.tag || ""} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">Notification</label>
          <input type="text" className="form-control" value={product.notify || ""} readOnly />
        </div>
      </div>

      {/* Description */}
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={product.description || ""} readOnly></textarea>
        </div>
      </div>
    </div>
  );
}
