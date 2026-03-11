import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { registerClient } from '../api/api';
import './Form.css';

const initialForm = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  householdSize: '',
  dietaryRestrictions: '',
  notes: '',
};

function NewIntake() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await registerClient(form);
      navigate('/confirmation', {
        state: {
          clientId: response.data.clientId,
          name: `${form.firstName} ${form.lastName}`,
          type: 'new',
        },
      });
    } catch (err) {
      setError('Unable to submit intake. Please try again or contact staff.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <BackButton />
      <h1>New Client Intake</h1>
      <p className="form-description">
        Please fill out this form completely. All information is kept confidential and used only to
        provide services.
      </p>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="intake-form">
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 555-5555"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="optional"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Address</legend>
          <div className="form-group">
            <label htmlFor="address">Street Address *</label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code *</label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                value={form.zipCode}
                onChange={handleChange}
                required
                maxLength="10"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Household & Dietary Information</legend>
          <div className="form-group">
            <label htmlFor="householdSize">Household Size (number of people) *</label>
            <input
              id="householdSize"
              name="householdSize"
              type="number"
              min="1"
              max="20"
              value={form.householdSize}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dietaryRestrictions">Dietary Restrictions / Allergies</label>
            <input
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              type="text"
              value={form.dietaryRestrictions}
              onChange={handleChange}
              placeholder="e.g. gluten-free, nut allergy, diabetic"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any other relevant information..."
            />
          </div>
        </fieldset>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Intake'}
        </button>
      </form>
    </div>
  );
}

export default NewIntake;
