import React from 'react';
import './App.css';
import TopBar from './TopBar';
import StartPage from '../start/page';
import HomePage from './HomePage';
import UploadPage from './uploadPage';
import DonePage from './DonePage';
import AboutPage from '../about/AboutPage';

function App() {
  return (
    <div className="App">
      <TopBar />
      <main className="App-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/contact" element={<AboutPage />} />
          <Route path="/done" element={<DonePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
