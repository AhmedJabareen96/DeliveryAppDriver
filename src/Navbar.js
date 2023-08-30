// Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#007bff',
  padding: '10px 20px',
  borderRadius: '8px 8px 0 0', // Rounded top corners
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 10px',
};

const Navbar = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove the "username" key from localStorage
    nav('/login'); // Navigate to the home page after logging out
  };

  const username = localStorage.getItem('username');
  const isLoggedIn = username !== null;

  return (
    <div style={navStyle}>
      <h1 style={{ color: '#fff' }}>Driver APP</h1>
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        {isLoggedIn ? (
          <Link to="/" style={linkStyle} onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
    </div>
    );
};

export default Navbar;
