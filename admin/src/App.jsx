import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Indexdm from "./page/Category/indexdm";
import Sizebar from "./components/Sidebar/sizebar";
import Footer from "./components/Footter/footer";
import Navbar from "./components/Navbar/navbar";
import Createdm from "./page/Category/createdm";
import Viewdm from "./page/Category/viewdm";
import Editdm from "./page/Category/editdm";
import Indexkh from "./page/Customer/indexkh";
import Createkh from "./page/Customer/createkh";
import Editkh from "./page/Customer/editkh";
import Viewkh from "./page/Customer/viewkh";
import Editnv from "./page/Staff/editnv";
import Viewnv from "./page/Staff/viewnv";
import Indexnv from "./page/Staff/indexnv";
import Createnv from "./page/Staff/createnv";
import Thongke from "./page/Dashboard/dashboard";
import TaiKhoan from "./page/Account/indexAccount";
import IndexAuthor from "./page/Author/indexAuthor";
import CreateAuthor from "./page/Author/Create-Author";
import EditAuthor from "./page/Author/editAuthor";
import ViewAuthor from "./page/Author/viewAuthor";
import IndexWarehouse from "./page/WareHouse/indexWarehouse";
import CreateWarehouse from "./page/WareHouse/createWarehouse";
import EditWarehouse from "./page/WareHouse/editWarehouse";
import ViewWarehouse from "./page/WareHouse/viewWarehouse";
import IndexProduct from "./page/BookProduct/indexsp";
import CreateProduct from "./page/BookProduct/createsp";
import EditProduct from "./page/BookProduct/editsp";
import ViewProduct from "./page/BookProduct/viewsp";
import IndexInvoiceOrder from "./page/InvoiceOrder/indexInvoiceOrder";
import CreateInvoiceOrder from "./page/InvoiceOrder/createInvoiceOrder";
import ViewInvoiceOrder from "./page/InvoiceOrder/viewInvoiceOrder";
import IndexCustomerOrder from "./page/CustomerOrder/indexCustomerOrder";
import ViewCustomerOrder from "./page/CustomerOrder/viewCustomerOrder";
import EditOrder from "./page/CustomerOrder/editCustomerOrder";
import { useState } from "react";
import { useEffect } from "react";
import LoginForm from "./page/Login/login";
import { UserProvider } from "./until/userContext";
import Account from "./page/Account/indexAccount";
import CreateAccount from "./page/Account/createAccount";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // nếu có token thì cho phép truy cập các route
  }, []);

  return (
    <UserProvider>
    <BrowserRouter>
      <ToastContainer />
      
      {/* Kiểm tra nếu chưa đăng nhập thì chỉ hiển thị giao diện đăng nhập */}
      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<LoginForm  />} />
          {/* Chuyển hướng tất cả các route khác về login nếu chưa đăng nhập */}
          <Route path="*" element={<LoginForm  />} />
        </Routes>
      ) : (
      <div className="app">

      <div id="wrapper">

        {/* <!-- Sidebar --> */}
       <Sizebar/>

        <div id="content-wrapper" class="d-flex flex-column">

          {/* <!-- Main Content --> */}
          <div id="content">

            {/* <!-- Topbar --> */}
            <Navbar/>

            <div class="container-fluid">
              {/* <!-- Content Row --> */}
            <Routes>
              
              <Route path="/" element={<Thongke/>} />

              <Route path="/IndexCategory" element={<Indexdm/>} />
              <Route path="/CreateCategory" element={<Createdm/>} />
              <Route path="/UpdateCategory/:id_category" element={<Editdm/>} />
              <Route path="/ViewCategory/:id_category" element={<Viewdm/>} />

              <Route path="/IndexAuthor" element={<IndexAuthor/>} />
              <Route path="/CreateAuthor" element={<CreateAuthor/>} />
              <Route path="/UpdateAuthor/:id_authors" element={<EditAuthor/>} />
              <Route path="/ViewAuthor/:id_authors" element={<ViewAuthor/>} />

              <Route path="/IndexProduct" element={<IndexProduct/>} />
              <Route path="/CreateProduct" element={<CreateProduct/>} />
              <Route path="/UpdateProduct/:id_product" element={<EditProduct/>} />
              <Route path="/ViewProduct/:id_product" element={<ViewProduct/>} />

              <Route path="/IndexCustomer" element={<Indexkh/>} />
              <Route path="/CreateCustomer" element={<Createkh/>} />
              <Route path="/UpdateCustomer/:id_customer" element={<Editkh/>} />
              <Route path="/ViewCustomer/:id_customer" element={<Viewkh/>} />

              <Route path="/Indexstaff" element={<Indexnv/>} />
              <Route path="/Createstaff" element={<Createnv/>} />
              <Route path="/Updatestaff/:id_staff" element={<Editnv/>} />
              <Route path="/Viewstaff/:id_staff" element={<Viewnv/>} />

              <Route path="/IndexWarehouse" element={<IndexWarehouse/>} />
              <Route path="/CreateWarehouse" element={<CreateWarehouse/>} />
              <Route path="/UpdateWarehouse/:id_warehouse" element={<EditWarehouse/>} />
              <Route path="/ViewWarehouse/:id_warehouse" element={<ViewWarehouse/>} />

              <Route path="/IndexCustomerOrder" element={<IndexCustomerOrder/>} />
              <Route path="/ViewCustomerOrder/:id_customer_order" element={<ViewCustomerOrder/>} />
              <Route path="/UpdateCustomerOrder/:id_customer_order" element={<EditOrder/>} />
              
              <Route path="/IndexAccount" element={<Account/>} />
              <Route path="/CreateAccount" element={<CreateAccount/>} />

              <Route path="/IndexInvoiceOrder" element={<IndexInvoiceOrder/>} />
              <Route path="/CreateInvoiceOrder" element={<CreateInvoiceOrder/>} />
              <Route path="/ViewInvoiceOrder/:id_invoiceOrder" element={<ViewInvoiceOrder/>} />
            </Routes>
            </div>

          </div>

          <Footer/>

        </div>

      </div>
    </div>)}
    </BrowserRouter>
    </UserProvider>
  );
  
}
