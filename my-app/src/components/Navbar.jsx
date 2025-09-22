import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar-header">
      <nav className="nav-container">
        {/* Profile Link */}
        <div 
          className="nav-link profile-link" 
          onClick={() => navigate('/profile')}
        >
          <img
            src="/logos/profile.webp" // Make sure this path is correct
            alt="Profile"
            className="nav-profile-pic"
          />
          <span>Trishanth</span>
        </div>

        {/* Dashboard Link */}
        <button 
          className="nav-link" 
          onClick={() => navigate('/')}
        >
          Dashboard
        </button>

        {/* Logout Link */}
        <button 
          className="nav-link" 
          onClick={() => navigate('/logout')}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;