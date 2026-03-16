import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { findClient, checkInClient } from '../api/api';
import './Form.css';
import './ReturningClient.css';

function ReturningClient() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingIn, setCheckingIn] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const response = await findClient({ [searchType]: searchQuery });
      setResults(response.data.clients || []);
      setSearched(true);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (client) => {
    setCheckingIn(client.id);
    try {
      await checkInClient(client.id);
      navigate('/confirmation', {
        state: {
          clientId: client.id,
          name: `${client.firstName} ${client.lastName}`,
          type: 'returning',
        },
      });
    } catch (err) {
      setError('Check-in failed. Please contact staff.');
      setCheckingIn(null);
    }
  };

  return (
    <div className="form-container">
      <BackButton />
      <h1>Returning Client Check-In</h1>
      <p className="form-description">
        Search for your record below to check in for today's visit.
      </p>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSearch} className="intake-form">
        <div className="search-type-selector">
          <label>
            <input
              type="radio"
              name="searchType"
              value="name"
              checked={searchType === 'name'}
              onChange={() => setSearchType('name')}
            />
            Search by Name
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="phone"
              checked={searchType === 'phone'}
              onChange={() => setSearchType('phone')}
            />
            Search by Phone
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="id"
              checked={searchType === 'id'}
              onChange={() => setSearchType('id')}
            />
            Search by Client ID
          </label>
        </div>

        <div className="form-group search-group">
          <label htmlFor="searchQuery">
            {searchType === 'name' && 'Full Name'}
            {searchType === 'phone' && 'Phone Number'}
            {searchType === 'id' && 'Client ID'}
          </label>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchType === 'name'
                ? 'Enter first or last name'
                : searchType === 'phone'
                ? '(555) 555-5555'
                : 'Enter your client ID'
            }
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searched && (
        <div className="search-results">
          <h2>Search Results</h2>
          {results.length === 0 ? (
            <div className="no-results">
              <p>No clients found. Please double-check your information or</p>
              <button
                className="link-button"
                onClick={() => navigate('/new-intake')}
              >
                register as a new client
              </button>
              .
            </div>
          ) : (
            <ul className="client-list">
              {results.map((client) => (
                <li key={client.id} className="client-item">
                  <div className="client-info">
                    <strong>
                      {client.firstName} {client.lastName}
                    </strong>
                    <span className="client-meta">
                      ID: {client.id} &bull; Last visit: {client.lastVisit || 'N/A'}
                    </span>
                  </div>
                  <button
                    className="checkin-button"
                    onClick={() => handleCheckIn(client)}
                    disabled={checkingIn === client.id}
                  >
                    {checkingIn === client.id ? 'Checking in...' : 'Check In'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ReturningClient;
