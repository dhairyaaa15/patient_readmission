import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const PatientForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    age: '',
    time_in_hospital: '',
    num_procedures: '',
    num_medications: '',
    number_outpatient_log1p: '',
    number_emergency_log1p: '',
    number_inpatient_log1p: '',
    number_diagnoses: '',
    medications: {
      metformin: false,
      repaglinide: false,
      nateglinide: false,
      chlorpropamide: false,
      glimepiride: false,
      glipizide: false,
      glyburide: false,
      pioglitazone: false,
      rosiglitazone: false,
      acarbose: false,
      tolazamide: false,
      insulin: false,
      glyburide_metformin: false,
    },
    demographics: {
      AfricanAmerican: false,
      Asian: false,
      Caucasian: false,
      Hispanic: false,
      Other: false,
    },
    gender: '',
    admission_type: {
      emergency_room: false,
      urgent: false,
      elective: false,
    },
    discharge_disposition: {
      discharged_to_home: false,
      discharged_to_another_facility: false,
      expired: false,
      transferred_to_another_hospital: false,
    },
    admission_source: '',
    A1Cresult: {
      None: false,
      '>8': false,
    },
    max_glu_serum: {
      None: false,
      '>200': false,
    },
    level1_diag: {
      diabetes_mellitus: false,
      hypertension: false,
      heart_failure: false,
      copd: false,
      stroke: false,
      chronic_kidney_disease: false,
      cancer: false,
      asthma: false,
    },
  });

  // Handle change for text inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle change for nested checkboxes
  const handleNestedChange = (section: string, name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: checked
      }
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://readmission-backend.onrender.com/predict', formData);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Patient Information Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Time in Hospital:</label>
          <input
            type="number"
            name="time_in_hospital"
            value={formData.time_in_hospital}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Medical History */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Procedures:</label>
          <input
            type="number"
            name="num_procedures"
            value={formData.num_procedures}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Medications:</label>
          <input
            type="number"
            name="num_medications"
            value={formData.num_medications}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Log Transformed Values */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Outpatient Visits (Log Transformed):</label>
          <input
            type="number"
            name="number_outpatient_log1p"
            value={formData.number_outpatient_log1p}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Emergency Visits (Log Transformed):</label>
          <input
            type="number"
            name="number_emergency_log1p"
            value={formData.number_emergency_log1p}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Inpatient Visits (Log Transformed):</label>
          <input
            type="number"
            name="number_inpatient_log1p"
            value={formData.number_inpatient_log1p}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Diagnoses:</label>
          <input
            type="number"
            name="number_diagnoses"
            value={formData.number_diagnoses}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Medication Usage */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Medication Usage:</legend>
          {Object.keys(formData.medications).map(med => (
            <div key={med} className="flex items-center mb-2">
              <input
                id={med}
                name={med}
                type="checkbox"
                checked={formData.medications[med as keyof typeof formData.medications]}
                onChange={(e) => handleNestedChange('medications', med as keyof typeof formData.medications, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={med} className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                {med}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Demographics */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Demographics:</legend>
          {Object.keys(formData.demographics).map(demo => (
            <div key={demo} className="flex items-center mb-2">
              <input
                id={demo}
                name={demo}
                type="checkbox"
                checked={formData.demographics[demo as keyof typeof formData.demographics]}
                onChange={(e) => handleNestedChange('demographics', demo as keyof typeof formData.demographics, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={demo} className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                {demo}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Gender */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Gender:</legend>
          <div className="flex items-center mb-2">
            <input
              id="male"
              name="gender"
              type="radio"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm font-medium text-gray-700">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="female"
              name="gender"
              type="radio"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="female" className="ml-2 block text-sm font-medium text-gray-700">
              Female
            </label>
          </div>
        </fieldset>

        {/* Admission Type */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Admission Type:</legend>
          {Object.keys(formData.admission_type).map(type => (
            <div key={type} className="flex items-center mb-2">
              <input
                id={type}
                name={type}
                type="checkbox"
                checked={formData.admission_type[type as keyof typeof formData.admission_type]}
                onChange={(e) => handleNestedChange('admission_type', type as keyof typeof formData.admission_type, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={type} className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                {type.replace(/_/g, ' ')}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Discharge Disposition */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Discharge Disposition:</legend>
          {Object.keys(formData.discharge_disposition).map(disposition => (
            <div key={disposition} className="flex items-center mb-2">
              <input
                id={disposition}
                name={disposition}
                type="checkbox"
                checked={formData.discharge_disposition[disposition as keyof typeof formData.discharge_disposition]}
                onChange={(e) => handleNestedChange('discharge_disposition', disposition as keyof typeof formData.discharge_disposition, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={disposition} className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                {disposition.replace(/_/g, ' ')}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Admission Source */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Admission Source:</label>
          <select
            name="admission_source"
            value={formData.admission_source}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select an option</option>
            <option value="Transfer from Another Hospital">Transfer from Another Hospital</option>
            <option value="Direct Admission">Direct Admission</option>
            <option value="Emergency Room">Emergency Room</option>
          </select>
        </div>

        {/* A1C Result */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">A1C Result:</legend>
          {Object.keys(formData.A1Cresult).map(result => (
            <div key={result} className="flex items-center mb-2">
              <input
                id={result}
                name={result}
                type="checkbox"
                checked={formData.A1Cresult[result as keyof typeof formData.A1Cresult]}
                onChange={(e) => handleNestedChange('A1Cresult', result as keyof typeof formData.A1Cresult, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={result} className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                {result}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Max Glucose Serum */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Max Glucose Serum:</legend>
          {Object.keys(formData.max_glu_serum).map(result => (
            <div key={result} className="flex items-center mb-2">
              <input
                id={result}
                name={result}
                type="checkbox"
                checked={formData.max_glu_serum[result as keyof typeof formData.max_glu_serum]}
                onChange={(e) => handleNestedChange('max_glu_serum', result as keyof typeof formData.max_glu_serum, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={result} className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                {result}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Level 1 Diagnoses */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Level 1 Diagnoses:</legend>
          {Object.keys(formData.level1_diag).map(diag => (
            <div key={diag} className="flex items-center mb-2">
              <input
                id={diag}
                name={diag}
                type="checkbox"
                checked={formData.level1_diag[diag as keyof typeof formData.level1_diag]}
                onChange={(e) => handleNestedChange('level1_diag', diag as keyof typeof formData.level1_diag, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={diag} className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                {diag.replace(/_/g, ' ')}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
