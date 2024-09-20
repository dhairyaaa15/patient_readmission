import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PatientForm from './pages/PatientForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient-form" element={<PatientForm />} />
      </Routes>
    </Router>
  );
};

export default App;
