import React from 'react';

const Home = () => {
  const projectName = "PredictPatientReadmission";
  const projectDescription = "A machine learning project that predicts patient readmission based on various hospital and medical data. The application provides a form for inputting parameters and predicts the likelihood of readmission.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-16 mx-8 bg-white shadow-lg rounded-lg">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{projectName}</h1>
          <p className="text-xl text-gray-700">{projectDescription}</p>
        </header>
      </div>
      <button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Get Started
      </button>
    </div>
  );
};

export default Home;
