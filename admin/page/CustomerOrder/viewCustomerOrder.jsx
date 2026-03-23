import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewCustomerOrder() {
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    };

    const [orderDetails, setOrderDetails] = useState([]);
    const { id_customer_order } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5001/api/get-detail-customer-order/${id_customer_order}`)
            .then((resp) => setOrderDetails(resp.data))
            .catch((error) => console.error(error));
    }, [id_customer_order]);

    return (
        <div>
            <div className="card shadow mb-4">
                <div className="d-flex align-items-center justify-content-between card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Order Details</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((item,index) => (
                                    <tr key={item.id_order_detail}>
                                        <td>{index+1}</td>

                                        <td>
                                            <img
                                            style={{ borderRadius: '5px' }}
                                            src={item.product_picture}
                                            width="60"
                                            height="60"
                                            className="img img-responsive"
                                            alt="product"
                                            />
                                        </td>
                                        <td>{item.book_name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatCurrency(item.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
