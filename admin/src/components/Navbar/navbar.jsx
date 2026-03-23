import React, { Fragment } from 'react'
import { useUser } from '../../until/userContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

const { updateUser , user } = useUser();
const navigate = useNavigate();

  const logout = () => {
  if (window.confirm("You want to logout ?")) {

    localStorage.removeItem('token');
    updateUser(null); 
    navigate('/login');
    window.location.reload();
 }

};
  return (
<Fragment>
<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

{/* <!-- Sidebar Toggle (Topbar) --> */}
<form className="form-inline">
    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
    </button>
</form>


{/* <!-- Topbar Navbar --> */}
<ul className="navbar-nav ml-auto">

    {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
    <li className="nav-item dropdown no-arrow d-sm-none">
        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search fa-fw"></i>
        </a>
        {/* <!-- Dropdown - Messages --> */}
        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </li>

    {/* <!-- Nav Item - Alerts --> */}
    <li className="nav-item dropdown no-arrow mx-1">
        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-bell fa-fw"></i>
            {/* <!-- Counter - Alerts --> */}
            <span className="badge badge-danger badge-counter">3+</span>
        </a>
        {/* <!-- Dropdown - Alerts --> */}
<div
  className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
  aria-labelledby="alertsDropdown"
>
  <h6 className="dropdown-header">
    Notifications
  </h6>

  <a className="dropdown-item d-flex align-items-center" href="#">
    <div className="mr-3">
      <div className="icon-circle bg-primary">
        <i className="fas fa-file-alt text-white"></i>
      </div>
    </div>
    <div>
      <div className="small text-gray-500">December 12, 2019</div>
      <span className="font-weight-bold">
        Your new monthly reading report is ready to download!
      </span>
    </div>
  </a>

  <a className="dropdown-item d-flex align-items-center" href="#">
    <div className="mr-3">
      <div className="icon-circle bg-success">
        <i className="fas fa-donate text-white"></i>
      </div>
    </div>
    <div>
      <div className="small text-gray-500">December 7, 2019</div>
      You’ve earned <strong>$12.90</strong> in book reward credits!
    </div>
  </a>

  <a className="dropdown-item d-flex align-items-center" href="#">
    <div className="mr-3">
      <div className="icon-circle bg-warning">
        <i className="fas fa-exclamation-triangle text-white"></i>
      </div>
    </div>
    <div>
      <div className="small text-gray-500">December 2, 2019</div>
      Spending Alert: We noticed unusually high book purchases this week.
    </div>
  </a>

  <a className="dropdown-item text-center small text-gray-500" href="#">
    View All Notifications
  </a>
</div>
</li>

    {/* <!-- Nav Item - Messages --> */}
<li className="nav-item dropdown no-arrow mx-1">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    id="messagesDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <i className="fas fa-envelope fa-fw"></i>
    {/* <!-- Counter - Messages --> */}
    <span className="badge badge-danger badge-counter">7</span>
  </a>

  {/* <!-- Dropdown - Messages --> */}
  <div
    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
    aria-labelledby="messagesDropdown"
  >
    <h6 className="dropdown-header">
      Bookstore Notifications
    </h6>

    <a className="dropdown-item d-flex align-items-center" href="#">
      <div className="dropdown-list-image mr-3">

        <div className="status-indicator bg-success"></div>
      </div>
      <div className="font-weight-bold">
        <div className="text-truncate">
          Hi there! We just released a new mystery novel that perfectly matches your reading list.
        </div>
        <div className="small text-gray-500">Emily Fowler · 58 mins ago</div>
      </div>
    </a>

    <a className="dropdown-item d-flex align-items-center" href="#">
      <div className="dropdown-list-image mr-3">
 
        <div className="status-indicator"></div>
      </div>
      <div>
        <div className="text-truncate">
          Your pre-ordered book “The Art of Reading” has arrived! Would you like us to ship it today?
        </div>
        <div className="small text-gray-500">Jae Chun · 1 day ago</div>
      </div>
    </a>

    <a className="dropdown-item d-flex align-items-center" href="#">
      <div className="dropdown-list-image mr-3">
  
        <div className="status-indicator bg-warning"></div>
      </div>
      <div>
        <div className="text-truncate">
          Last month’s reading report looks fantastic! Keep up the great reading streak.
        </div>
        <div className="small text-gray-500">Morgan Alvarez · 2 days ago</div>
      </div>
    </a>

    <a className="dropdown-item d-flex align-items-center" href="#">
      <div className="dropdown-list-image mr-3">

        <div className="status-indicator bg-success"></div>
      </div>
      <div>
        <div className="text-truncate">
          “Am I a good reader?” Well, someone told me that every reader becomes great — 
          as long as they keep turning pages!
        </div>
        <div className="small text-gray-500">BookBot · 2 days ago</div>
      </div>
    </a>

    <a className="dropdown-item text-center small text-gray-500" href="#">
      Read More Messages
    </a>
  </div>
</li>


    <div className="topbar-divider d-none d-sm-block"></div>

    {/* <!-- Nav Item - User Information --> */}
    <li className="nav-item dropdown no-arrow">
    
        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small"></span>
            <img className="img-profile rounded-circle" src="/img/undraw_profile.svg"/>
        </a>
        {/* <!-- Dropdown - User Information --> */}
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">

            <a className="dropdown-item" href="#">
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            {user ? user.name : 'Account'} ({(user.role)})
            </a>

            <a className="dropdown-item" href="#">
                <i className="fas fa-sliders-h fa-sm fa-fw mr-2 text-gray-400"></i>
                Setting
            </a>

            <a className="dropdown-item" href="#">
                <i className="fas fa-clipboard-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity
            </a>

            <div className="dropdown-divider"></div>
            
            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={logout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </a>

        </div>
    </li>
        
</ul>

</nav>
</Fragment>
  )
}
