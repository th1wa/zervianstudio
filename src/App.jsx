import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocumentProvider } from './context/DocumentContext';
import SetupPage from './pages/SetupPage';
import AgreementPage from './pages/AgreementPage';
import InvoicePage from './pages/InvoicePage';
import WelcomePage from './pages/WelcomePage';
import './App.css';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SetupPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/agreement" element={<AgreementPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="*" element={<SetupPage />} />
        </Routes>
      </Router>
    </DocumentProvider>
  );
}

export default App;
