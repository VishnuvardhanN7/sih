import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/logos/profile.webp"
          alt="Profile"
          className="profile-pic"
          onClick={() => navigate('/profile')}
        />
        <span className="username">Trishanth</span>
      </div>

      <div className="navbar-right">
        <button className="logout-btn" onClick={() => navigate('/logout')}>
          Logout
        </button>
        <button className="logout-btn" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
      </div>
    </nav>
  );
};

export default Navbar;