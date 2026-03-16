import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clients
export const registerClient = (clientData) => api.post('/clients', clientData);


// Intake
export const submitIntake = (intakeData) => api.post('/intake', intakeData);

export default api;
