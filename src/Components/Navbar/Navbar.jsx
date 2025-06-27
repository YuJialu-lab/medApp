import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#007bff',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        MedApp
      </div>
      <div>
        <a href="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Home
        </a>
        <a href="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Login
        </a>
        <a href="/signup" style={{ color: 'white', textDecoration: 'none' }}>
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default Navbar; 