import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const projectName = "PredictPatientReadmission";
  const projectDescription = "A machine learning project that predicts patient readmission based on various hospital and medical data. The application provides a form for inputting parameters and predicts the likelihood of readmission.";

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/patient-form');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
      <div className="w-full max-w-3xl p-16 mx-8 bg-white bg-opacity-90 shadow-xl rounded-lg">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{projectName}</h1>
          <p className="text-2xl text-gray-700">{projectDescription}</p>
        </header>
      </div>
      <button
        onClick={handleGetStarted}
        className="mt-12 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
