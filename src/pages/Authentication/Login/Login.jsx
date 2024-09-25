import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}auth/login`, {
        userName,
        password,
      });
      const token = response.data.token;
      if (rememberMe) {
        localStorage.setItem("userToken", token);
      } else {
        localStorage.setItem("userToken", token);
      }
      navigate("/profile");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-background">
     
      <div className="overlay"></div>
      <div className="wrapper">
        <section className="vh-100 bg-image">
          <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
              <div className="col-lg-6 col-md-8 mt-5 log-cont">
                <div className="logo-account">
                 
                </div>
                <div className="card bg-dark">
                  <div className="card-body">
                    <div className="auth-form">
                      <h2 className="text-center mb-4">Login your account</h2>
                      
                      <form onSubmit={handleLogin}>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mb-2 position-relative">
    <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        id="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
    <label htmlFor="Password">Password</label>
    <button 
        type="button" 
        className="btn btn-link position-absolute" 
        style={{ right: '-190px', top: '50%', transform: 'translateY(-50%)' }}
        onClick={() => setShowPassword(!showPassword)}
    >
        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
    </button>
</div>


                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                          <div className="form-group mb-0">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="Remember"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Remember"
                              >
                                Remember Me?
                              </label>
                            </div>
                          </div>
                         
                        </div>
                        <div className="text-center mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            id="primary-btn"
                          >
                            Sign In
                          </button>
                        </div>
                        {error && (
                          <div className="text-center mt-3 text-danger">
                            {error}
                          </div>
                        )}
                       
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
