import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../until/userContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!email.endsWith('@gmail.com')) {
      setMessage('Email must end with @gmail.com');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email: email,
        password: password,
      });

      if (response.data && response.data.user && (response.data.user.role === "Admin" || response.data.user.role === "Staff" || response.data.user.role === "Manage"  )) {
        const user = response.data.user;

        // Save token and user info
        localStorage.setItem('token', response.data.token);
        updateUser({
          id: user.id_account,
          name: user.user_name,
          username: user.email,
          role: user.role,
        });

        toast.dismiss();
        toast.success(`Welcome back, ${user.user_name}!`);

        setTimeout(() => {
          window.location.reload();
        }, 500);

        if (user.role === "Admin") {
          navigate('/');
        }

        if (user.role === "Manage") {
          navigate('/');
        }

        if (user.role === "Staff") {
          navigate('/IndexCustomerOrder');
        }
      } else {
        toast.error("Login failed, please review account information!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed!");

    }
  };

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Book Hub</h4>
                    </div>

                    <form onSubmit={handleLogin}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Email / Phone
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-block fa-lg bg-success  mb-3"
                          type="submit"
                        >
                          Log In

                        </button>
                        {message && <p className="text-danger">{message}</p>}
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button type="button" className="btn btn-outline-danger">
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                    className="col-lg-6 d-flex align-items-center"
                    style={{
                        background: "linear-gradient(135deg, #87e8ae, #17bacf)", 
                        color: "#fff",
                    }}
                    >
                    <img src="" alt="" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
