import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        🍎 Food Bank Intake
      </div>
      <div className="navbar-links">
        <button className="nav-link" onClick={() => navigate('/')}>Home</button>
        <button className="nav-link" onClick={() => navigate('/new-intake')}>New Intake</button>
        <button className="nav-link" onClick={() => navigate('/returning-client')}>Returning Client</button>
        <button className="nav-link" onClick={() => navigate('/inventory')}>Available Items</button>
      </div>
    </nav>
  );
}

export default NavBar;
