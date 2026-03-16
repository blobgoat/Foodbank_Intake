import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientId, name, type } = location.state || {};

  if (!clientId) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card error-card">
          <h1>No intake data found</h1>
          <p>Please start a new intake or check in as a returning client.</p>
          <button className="confirm-button" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon">✅</div>
        <h1>
          {type === 'new' ? 'Intake Submitted!' : 'Check-In Successful!'}
        </h1>
        <p className="confirmation-name">
          {type === 'new'
            ? `Thank you, ${name}. Your intake has been recorded.`
            : `Welcome back, ${name}! You are checked in.`}
        </p>
        <div className="confirmation-details">
          <div className="detail-row">
            <span className="detail-label">Client ID:</span>
            <span className="detail-value">{clientId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value status-active">Active</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="next-steps">
          <h3>Next Steps</h3>
          <ol>
            <li>Please proceed to the waiting area.</li>
            <li>A volunteer will call your name when it's your turn.</li>
            <li>You can browse today's available items while you wait.</li>
          </ol>
        </div>

        <div className="confirmation-actions">
          <button className="confirm-button secondary" onClick={() => navigate('/inventory')}>
            View Available Items
          </button>
          <button className="confirm-button" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
