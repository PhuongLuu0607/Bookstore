import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [approvedOrders, setApprovedOrders] = useState(0);
  const [shippingOrders, setShippingOrders] = useState(0);
  const [processedOrders, setProcessedOrders] = useState(0);
  const [annualRevenue, setAnnualRevenue] = useState(0);
  const [monthlyRevenueValue, setMonthlyRevenueValue] = useState(0);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]); // Revenue for 12 months

  // Fetch total customers
  const fetchTotalCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/getallcustomer');
      setTotalCustomers(response.data.length);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Fetch order counts by status
  const fetchOrderCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/getall-customer-order');
      const orders = response.data;

      const pendingCount = orders.filter(order => order.status === 1).length;
      const approvedCount = orders.filter(order => order.status === 2).length;
      const shippingCount = orders.filter(order => order.status === 3).length;
      const processedCount = orders.filter(
        order => order.status === 4 || order.status === 5
      ).length;

      setPendingOrders(pendingCount);
      setApprovedOrders(approvedCount);
      setShippingOrders(shippingCount);
      setProcessedOrders(processedCount);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch annual revenue and monthly revenue data
  const fetchAnnualRevenue = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/getall-customer-order');
      const orders = response.data;

      const currentYear = new Date().getFullYear();
      const totalAnnualRevenue = orders
        .filter(
          order =>
            new Date(order.order_date).getFullYear() === currentYear &&
            order.payment_status === 2
        )
        .reduce((sum, order) => sum + (order.total_price || 0), 0);

      setAnnualRevenue(totalAnnualRevenue);

      // Monthly breakdown
      const monthlyData = Array(12).fill(0);
      orders.forEach(order => {
        const date = new Date(order.order_date);
        if (date.getFullYear() === currentYear && order.payment_status === 2) {
          monthlyData[date.getMonth()] += order.total_price || 0;
        }
      });
      setMonthlyRevenueData(monthlyData);
    } catch (error) {
      console.error('Error fetching yearly revenue:', error);
    }
  };

  // Fetch revenue of current month
  const fetchMonthlyRevenue = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/getall-customer-order');
      const orders = response.data;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const totalMonthlyRevenue = orders
        .filter(order => {
          const date = new Date(order.order_date);
          return (
            date.getFullYear() === currentYear &&
            date.getMonth() === currentMonth &&
            order.payment_status === 2
          );
        })
        .reduce((sum, order) => sum + (order.total_price || 0), 0);

      setMonthlyRevenueValue(totalMonthlyRevenue);
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
    }
  };

  // Format currency in USD
  const formatCurrency = number => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  };

  useEffect(() => {
    fetchTotalCustomers();
    fetchOrderCounts();
    fetchAnnualRevenue();
    fetchMonthlyRevenue();
  }, []);

  // Bar chart data
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenueData,
        backgroundColor: '#4e73df',
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ['Pending','Approved','Shipping', 'Completed',],
    datasets: [
      {
        data: [pendingOrders,approvedOrders,shippingOrders, processedOrders],
        backgroundColor: ['#f6c23e','#415fd8','#f58b0b', '#1cc88a'],
      },
    ],
  };

  return (
    <div>
      {/* Header */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-download fa-sm text-white-50"></i> Download data
        </a>
      </div>

      {/* Summary Cards */}
      <div className="row">
        {/* Monthly Revenue */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Income (This month)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {formatCurrency(monthlyRevenueValue)}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annual Revenue */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Annual Income
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {formatCurrency(annualRevenue)}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Resolution Request
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{pendingOrders}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Total Customers
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{totalCustomers}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Monthly Revenue</h6>
            </div>
            <div className="card-body">
              <Bar data={barData} />
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Order Status</h6>
            </div>
            <div className="card-body">
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
