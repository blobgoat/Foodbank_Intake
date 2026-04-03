// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Home from './pages/Home';
import FoodbankIntakeScreen from './pages/Start';
import AppBar from './components/AppBar';
import './App.css';
import type { JSX } from 'react/jsx-dev-runtime';

//TODO: add more pages as we are more certain of the dynamics of the app. For now, we can just have the home page and the new intake form.
function App(): JSX.Element {
  return (
    <Router basename="/LynwoodFoodbankIntake">
      <div className="App">
        <AppBar />
        {/* <NavBar /> */}
        <main className="main-content">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<FoodbankIntakeScreen />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;