import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../until/userContext'
export default function Sizebar() {

const { user } = useUser();

  return (
<Fragment>
<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

{/* <!-- Sidebar - Brand --> */}
<a className="sidebar-brand d-flex align-items-center justify-content-center">
    <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink"></i>
    </div>
    <div className="sidebar-brand-text mx-3">BOOK HUB <sup></sup></div>
</a>

{(user.role === "Admin" ) &&
<>
    {/* <!-- Divider --> */}
    <hr className="sidebar-divider my-0"/>

    {/* <!-- Nav Item - Dashboard --> */}
    <li className="nav-item">
        <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>DashBoard</span></Link>
    </li>

{/* <!-- Divider --> */}
<hr className="sidebar-divider"/>
</>
}

{(user.role === "Admin" || user.role === "Staff" || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexProduct">
        <i className="fas fa-book"></i>
        <span>Book</span>
    </Link>
</li>
}
{(user.role === "Admin" || user.role === "Staff" || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexCategory">
        <i className="fas fa-tasks"></i>
        <span>Category</span></Link>
</li>
}
{(user.role === "Admin" || user.role === "Staff" || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexAuthor">
        <i className="fas fa-user"></i>
        <span>Author</span></Link>
</li>
}
{(user.role === "Admin" || user.role === "Staff" || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexCustomerOrder">
        <i className="fas fa-comments-dollar"></i>
        <span>Customer Order</span></Link>
</li>
}
{(user.role === "Admin" || user.role === "Staff" || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexInvoiceOrder">
        <i className="fas fa-comments-dollar"></i>
        <span>Invoice Order</span></Link>
</li>
}
{(user.role === "Admin" || user.role === "Staff" || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexWarehouse">
        <i className="fas fa-warehouse"></i>
        <span>Warehouse</span></Link>
</li>
}
{(user.role === "Admin" || user.role === "Staff" || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexCustomer">
        <i className="fas fa-user-friends"></i>
        <span>Customer</span></Link>
</li>
}
{(user.role === "Admin"  || user.role === "Manage" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/Indexstaff">
        <i className="fas fa-user-check"></i>
        <span>Staff</span></Link>
</li>
}
{(user.role === "Admin" ) &&

<li className="nav-item">
    <Link className="nav-link" to="/IndexAccount">
        <i className="fas fa-fw fa-cog"></i>
        <span>Account</span></Link>
</li>
}
{(user.role === "Admin"  || user.role === "Manage" ) &&
<>
{/* <!-- Nav Item - Utilities Collapse Menu --> */}
<li className="nav-item">
    <a className="nav-link collapsed" href="" data-toggle="collapse" data-target="#collapseUtilities"
        aria-expanded="true" aria-controls="collapseUtilities">
        <i className="fas fa-fw fa-wrench"></i>
        <span>Setting</span>
    </a>
    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <a className="collapse-item" href="{{route('slider')}}">Slider</a>
            <a className="collapse-item" href="{{route('qlyblog')}}">Blog</a>
        </div>
    </div>
</li>
</>
}

<hr className="sidebar-divider"/>

<div className="text-center d-none d-md-inline">
    <button className="rounded-circle border-0" id="sidebarToggle"></button>
</div>

</ul>

    </Fragment>
  )
}
