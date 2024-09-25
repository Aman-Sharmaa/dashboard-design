import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

const MyProfile = () => {
  const [profile, setProfile] = useState({
    fullName: ''
  });

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
     
        const response = await axios.get(`${process.env.REACT_APP_API}user`, {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });
        
       
        const data = response.data.data;
        setProfile({
          fullName: data.name
        });
      } catch (error) {
        message.error('Failed to fetch profile data');
      }
    };

  
    fetchUserData();
  }, [token]); 

  return (
    <main className="main-content">
      <div className="position-relative custom-page">
        <h1 className="title">Welcome {profile.fullName}</h1>
      </div>
    </main>
  );
};

export default MyProfile;
