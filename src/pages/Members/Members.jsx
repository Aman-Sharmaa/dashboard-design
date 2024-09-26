import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Members.css';
import DataTable from '../../components/Table/Table';
import { Modal, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [UserName, setUsername] = useState('Aman Sharma');

  useEffect(() => {
    fetchMiningData();
  }, []);

  const fetchMiningData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}members`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });

      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching mining data:', error);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); 
  };

  return (
    <>
      <main className="main-content">
        <h2>22</h2>

        <Button type="primary" id="primary-btn" onClick={showModal}>
          Add New Member
        </Button>
        <DataTable heading="List of all Members" data={data}  restrictedItem={['updatedBy', 'approvedTime']} memberBtn={true}  />

        <Modal
          title="Add New User"
          visible={isModalVisible}
          onCancel={handleCancel}
          okText="Submit"
          cancelText="Cancel"
          onOk={() => {
            form
              .validateFields() // Validate fields on submit
              .then(values => {
                console.log('Form Values:', values);
                form.resetFields(); // Reset form fields after successful submission
                setIsModalVisible(false); // Close modal after form submission
              })
              .catch(info => {
                console.log('Validation Failed:', info);
              });
          }}
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
      </main>
    </>
  );
};

export default Dashboard;
