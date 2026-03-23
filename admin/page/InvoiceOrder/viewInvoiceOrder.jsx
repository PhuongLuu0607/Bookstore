import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewInvoiceOrder() {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  };

  const [details, setDetails] = useState([]);
  const { id_invoiceorder } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getinvoiceorder/${1}`)
      .then((resp) => setDetails(resp.data))
      .catch((error) => console.error("Error fetching invoice order details:", error));
  }, [id_invoiceorder]);

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="d-flex align-items-center justify-content-between card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Invoice Order Details</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item) => {
                  return (
                    <tr key={item.id_invoiceorder_detail}>
                      <td>{item.book_name}</td>
                      <td>{item.isbn}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
