import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to the Food Bank Intake Portal</h1>
        <p className="home-subtitle">
          This portal helps our team efficiently process client intake and manage available food resources.
        </p>
      </div>

      <div className="home-cards">
        <div className="card" onClick={() => navigate('/new-intake')}>
          <div className="card-icon">📋</div>
          <h2>New Client Intake</h2>
          <p>Register a new client and begin the intake process for first-time visitors.</p>
          <button className="card-button">Start New Intake</button>
        </div>

        <div className="card" onClick={() => navigate('/returning-client')}>
          <div className="card-icon">🔄</div>
          <h2>Returning Client</h2>
          <p>Check in an existing client for their scheduled or walk-in visit.</p>
          <button className="card-button">Check In</button>
        </div>

        <div className="card" onClick={() => navigate('/inventory')}>
          <div className="card-icon">🥫</div>
          <h2>Available Items</h2>
          <p>Browse the current inventory of food and household items available today.</p>
          <button className="card-button">View Inventory</button>
        </div>
      </div>

      <div className="home-info">
        <h3>About Our Food Bank</h3>
        <p>
          Our food bank serves community members in need by providing nutritious food and essential household items.
          All services are provided with dignity and respect. Clients are seen on a first-come, first-served basis.
        </p>
      </div>
    </div>
  );
}

export default Home;
