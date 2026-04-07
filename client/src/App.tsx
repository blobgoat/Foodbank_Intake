// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { CSSProperties } from 'react';
// import NavBar from './components/NavBar';
// import Home from './pages/Home';
import FoodbankIntakeScreen from './pages/Start';
import AppBar from './components/AppBar';
import './App.css';
import aesthetics from '../../modifiable_content/foodbank_aesthetics.generated.json';
import type { JSX } from 'react/jsx-dev-runtime';

//TODO: add more pages as we are more certain of the dynamics of the app. For now, we can just have the home page and the new intake form.
function App(): JSX.Element {
  const cssVars = {
    '--background-color': aesthetics.background_color,
  } as CSSProperties;
  return (
    <Router basename="/LynwoodFoodbankIntake">
      <div className="App" style={cssVars}>
        {/* AppBar is the bar at the top of the page, it should be consistent across all pages, but doesnt have any reactive components */}
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