import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode correctly
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserPage() {
  // Use usestate hook to handle the state
  const [userData, setUserData] = useState(null);
  // Get the userdata using the token
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      toast.error('Invalid token');
      localStorage.removeItem('token');
      window.location.reload();
    }
  }, []);
  // define the styles
  const userCardStyle = {
    border: '2px solid #333', 
    borderRadius: '10px',
    padding: '20px',
    margin: '20px auto', 
    maxWidth: '500px', 
    transition: 'all 0.5s ease', 
  };

  const userDataStyle = {
    fontSize: '2 rem',
  };
 // return the function
  return (
    <div>
      <NavBar />
      <br /><br />
      <div style={userData ? { ...userCardStyle, opacity: 1 } : { ...userCardStyle, opacity: 0 }}>
        <h2>User Information</h2>
        {userData && (
          <div style={userDataStyle}>
            <p><strong>Username:</strong> {userData.userId}</p>
            <p><strong>Phone Number:</strong> {userData.phno}</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
