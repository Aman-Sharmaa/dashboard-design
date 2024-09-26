import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form, Input, Select,message } from 'antd';
import "./Login.css";
const { Option } = Select;
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleOk = () => {
   
    form
      .validateFields()
      .then(values => {
      
        
        let data = JSON.stringify({
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password
        });

       
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:8080/kitchensink/member/register/',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios.request(config)
          .then((response) => {
            console.log('Response:', JSON.stringify(response.data));

            if(response.data.status == true){
              message.success('Account created successfully!');
              form.resetFields(); 
              setIsModalVisible(false); 
            }
            else{
              message.error(response.error.message);
            }
           
          })
          .catch((error) => {
            message.error('Failed to create account. Please try again.');
          });
      })
      .catch(info => {
        console.log('Validation Failed:', info);
      });
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
                  <button id="primary-btn" className="right" onClick={showModal}>Register</button>
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

      <Modal
      title="Create New Account"
      visible={isModalVisible}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      onOk={handleOk} // Submit form and send data via axios
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please enter the email address' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
        >
          <Input type="text" maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter the password' },
            { min: 6, message: 'Password must be at least 6 characters long' }
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm the password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              }
            })
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  );
};

export default Login;
