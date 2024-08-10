import React, { useState } from "react";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    time_in_hospital: "",
    num_procedures: "",
    num_medications: "",
    number_diagnoses: "",
    insulin: "",
    gender: "",
    admission_type: "",
    discharge_disposition: "",
    admission_source: "",
    A1Cresult: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      age: "",
      time_in_hospital: "",
      num_procedures: "",
      num_medications: "",
      number_diagnoses: "",
      insulin: "",
      gender: "",
      admission_type: "",
      discharge_disposition: "",
      admission_source: "",
      A1Cresult: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white">
      <div className="w-full max-w-4xl p-8 mx-8 bg-white bg-opacity-90 shadow-xl rounded-lg">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Patient Readmission Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-gray-700 font-semibold text-xl capitalize"
              >
                {field
                  .replace(/_/g, " ")
                  .replace(/\|/g, " | ")
                  .replace(/([a-z])([A-Z])/g, "$1 $2")}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-2 p-4 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder={`Enter ${field
                  .replace(/_/g, " ")
                  .replace(/\|/g, " | ")}`}
                required
              />
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-4 bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-8 py-4  bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
