import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NewIntake from './pages/NewIntake';
import './App.css';

//TODO: add more pages as we are more certain of the dynamics of the app. For now, we can just have the home page and the new intake form.
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-intake" element={<NewIntake />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
