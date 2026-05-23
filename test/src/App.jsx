import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocumentProvider } from './context/DocumentContext';
import AgreementPage from './pages/AgreementPage';
import InvoicePage from './pages/InvoicePage';
import WelcomePage from './pages/WelcomePage';
import './App.css';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AgreementPage />} />
          <Route path="/agreement" element={<AgreementPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </Router>
    </DocumentProvider>
  );
}

export default App;
