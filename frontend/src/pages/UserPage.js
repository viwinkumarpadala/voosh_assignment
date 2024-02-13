import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode correctly
import Cookies from 'js-cookie';

export default function UserPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Assuming your JWT token is stored in cookies
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the JWT token
      const decoded = jwtDecode(token);
      setUserData(decoded); // Set user data extracted from the token
    }
  }, []);

  const userCardStyle = {
    border: '2px solid #333', // Dark border
    borderRadius: '10px',
    padding: '20px',
    margin: '20px auto', // Center the card
    maxWidth: '500px', // Limit card width
    transition: 'all 0.5s ease', // Add transition effect
  };

  const userDataStyle = {
    fontSize: '2 rem', // Increase font size
  };

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
    </div>
  );
}
