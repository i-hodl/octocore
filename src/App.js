import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlipCard from './components/FlipCard';
import SingleNFTView from './components/SingleNFTView';
import './components/Global.css'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlipCard />} />
        <Route path="/nft/:tokenId" element={<SingleNFTView />} />
      </Routes>
    </Router>
  );
}

export default App;
