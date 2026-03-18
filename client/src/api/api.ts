import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL: string =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for client and intake data
export interface ClientData {
  // Add your client fields here, e.g.:
  // name: string;
  // email: string;
  [key: string]: any;
}

export interface IntakeData {
  // Add your intake fields here, e.g.:
  // clientId: string;
  // date: string;
  [key: string]: any;
}

// Clients
export const registerClient = (clientData: ClientData): Promise<AxiosResponse> =>
  api.post('/clients', clientData);

// Intake
export const submitIntake = (intakeData: IntakeData): Promise<AxiosResponse> =>
  api.post('/intake', intakeData);

export default api;
