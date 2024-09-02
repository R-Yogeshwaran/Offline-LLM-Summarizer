import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your page components
import TextSum from './pages/textsummarizer';
import Grammer from './pages/grammercheck';
import Pdf from './pages/pdfsummarizer';
import ResponsiveAppBar from './components/navbar';

function Routerpage() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/text-summerization" element={<TextSum />} />
        <Route path="/pdf-summerization" element={<Pdf />} />
        <Route path="/grammar-check" element={<Grammer />} />
      </Routes>
    </Router>
  );
}

export default Routerpage;
