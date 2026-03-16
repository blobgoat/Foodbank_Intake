import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NewIntake from './pages/NewIntake';
import ReturningClient from './pages/ReturningClient';
import Inventory from './pages/Inventory';
import Confirmation from './pages/Confirmation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-intake" element={<NewIntake />} />
            <Route path="/returning-client" element={<ReturningClient />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
