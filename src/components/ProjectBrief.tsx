import React from 'react';

const ProjectBrief: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Welcome to the Hospital Readmission Prediction System
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Our project aims to predict the likelihood of patient readmissions using key clinical data.
          This can help hospitals reduce readmissions, improve patient care, and optimize medical resources.
        </p>
        <p className="text-gray-600 mb-8">
          By utilizing advanced machine learning models, we analyze various factors such as patient history, 
          medications, and diagnosis to estimate the chances of being readmitted.
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default ProjectBrief;