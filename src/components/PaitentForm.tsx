import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import NestedCheckboxFieldset from '../components/NestedCheckboxFieldset';

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    "age": '',
    "time_in_hospital": '',
    "num_procedures": '',
    "num_medications": '',
    "number_outpatient_log1p": '',
    "number_emergency_log1p": '',
    "number_inpatient_log1p": '',
    "number_diagnoses": '',
    "gender_1": '',
    "medications": {
      "metformin": false,
      "repaglinide": false,
      "nateglinide": false,
      "chlorpropamide": false,
      "glimepiride": false,
      "glipizide": false,
      "glyburide": false,
      "pioglitazone": false,
      "rosiglitazone": false,
      "acarbose": false,
      "tolazamide": false,
      "insulin": false,
      "glyburide-metformin": false,
    },
    "demographics": {
      "AfricanAmerican": false,
      "Asian": false,
      "Caucasian": false,
      "Hispanic": false,
      "Other": false,
    },
    "admission_type": {
      "admission_type_id_3": false,
      "admission_type_id_5": false,
    },
    "discharge_disposition": {
      "discharge_disposition_id_2": false,
      "discharge_disposition_id_7": false,
      "discharge_disposition_id_10": false,
      "discharge_disposition_id_18": false,
    },
    "admission_source": {
      "admission_source_id_4": false,
      "admission_source_id_7": false,
      "admission_source_id_9": false,
    },
    "A1Cresult": {
      "A1Cresult_None": false,
      "A1Cresult_>8": false,
    },
    "max_glu_serum": {
      "max_glu_serum_None": false,
      "max_glu_serum_>200": false,
    },
    "level1_diag": {
      "level1_diag1_1.0": false,
      "level1_diag1_2.0": false,
      "level1_diag1_3.0": false,
      "level1_diag1_4.0": false,
      "level1_diag1_5.0": false,
      "level1_diag1_6.0": false,
      "level1_diag1_7.0": false,
      "level1_diag1_8.0": false,
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : value;

    if (name.includes('.')) {
      const [section, key] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: newValue,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleLogInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = parseFloat(e.target.value);
    const logValue = value > 0 ? Math.log1p(value) : 0; // Avoid log of zero or negative values
    setFormData((prevData) => ({
      ...prevData,
      [field]: logValue,
    }));
  };

  const handleNestedChange = (section: string, name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: checked
      }
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Convert true/false values to 1/0
    const transformToBinary = (obj: { [key: string]: boolean }) =>
      Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value ? 1 : 0]));

    // Convert string values to floats, default to 0 if empty
    const convertToFloat = (value: string) => (value === '' ? 0 : parseFloat(value));

    // Flatten the formData structure and transform boolean values
    const flattenedData = {
      age: convertToFloat(formData.age),
      time_in_hospital: convertToFloat(formData.time_in_hospital),
      num_procedures: convertToFloat(formData.num_procedures),
      num_medications: convertToFloat(formData.num_medications),
      number_outpatient_log1p: convertToFloat(formData.number_outpatient_log1p),
      number_emergency_log1p: convertToFloat(formData.number_emergency_log1p),
      number_inpatient_log1p: convertToFloat(formData.number_inpatient_log1p),
      number_diagnoses: convertToFloat(formData.number_diagnoses),
      gender_1: convertToFloat(formData.gender_1),
      ...transformToBinary(formData.medications),
      ...transformToBinary(formData.demographics),
      ...transformToBinary(formData.admission_type),
      ...transformToBinary(formData.discharge_disposition),
      ...transformToBinary(formData.admission_source),
      ...transformToBinary(formData.A1Cresult),
      ...transformToBinary(formData.max_glu_serum),
      ...transformToBinary(formData.level1_diag),
    };

    // Log the data before posting
    console.log("Data being posted:", flattenedData);

    try {
      const response = await axios.post('https://readmission-backend.onrender.com/predict', flattenedData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };




  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Patient Information Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Age field */}
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
          <label className="block text-sm font-medium text-gray-700">Number of Outpatient:-</label>
          <input
            type="number"
            placeholder="Outpatient Visits"
            value={formData.number_outpatient_log1p}
            onChange={(e) => handleLogInputChange(e, 'number_outpatient_log1p')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Emergency:-</label>
          <input
            type="number"
            placeholder="Emergency Visits"
            value={formData.number_emergency_log1p}
            onChange={(e) => handleLogInputChange(e, 'number_emergency_log1p')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Inpatient:-</label>
          <input
            type="number"
            placeholder="Inpatient Visits"
            value={formData.number_inpatient_log1p}
            onChange={(e) => handleLogInputChange(e, 'number_inpatient_log1p')}
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender:</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="gender_1"
                value="1"
                checked={formData.gender_1 === '1'}
                onChange={handleChange}
                className="mr-1"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender_1"
                value="0"
                checked={formData.gender_1 === '0'}
                onChange={handleChange}
                className="mr-1"
              />
              Female
            </label>
          </div>
        </div>

        <NestedCheckboxFieldset
          label="Medication Usage"
          section="medications"
          options={[
            { name: 'metformin', label: 'Metformin' },
            { name: 'repaglinide', label: 'Repaglinide' },
            { name: 'nateglinide', label: 'Nateglinide' },
            { name: 'chlorpropamide', label: 'Chlorpropamide' },
            { name: 'glimepiride', label: 'Glimepiride' },
            { name: 'glipizide', label: 'Glipizide' },
            { name: 'glyburide', label: 'Glyburide' },
            { name: 'pioglitazone', label: 'Pioglitazone' },
            { name: 'rosiglitazone', label: 'Rosiglitazone' },
            { name: 'acarbose', label: 'Acarbose' },
            { name: 'tolazamide', label: 'Tolazamide' },
            { name: 'insulin', label: 'Insulin' },
            { name: 'glyburide_metformin', label: 'Glyburide-Metformin' },
          ]}
          handleNestedChange={handleNestedChange}
        />

        <NestedCheckboxFieldset
          label="Demographics"
          section="demographics"
          options={[
            { name: 'AfricanAmerican', label: 'AfricanAmerican' },
            { name: 'Asian', label: 'Asian' },
            { name: 'Caucasian', label: 'Caucasian' },
            { name: 'Hispanic', label: 'Hispanic' },
            { name: 'Other', label: 'Other' },
          ]}
          handleNestedChange={handleNestedChange}
        />
        <NestedCheckboxFieldset
          label="Admission Type"
          section="admission_type"
          options={[
            { name: 'admission_type_id_3', label: 'Emergency-Room' },
            { name: 'admission_type_id_5', label: 'Elective' },
          ]}
          handleNestedChange={handleNestedChange}
        />

        <NestedCheckboxFieldset
          label="Discharge Disposition (Chose any 1)"
          section="discharge_disposition"
          options={[
            { name: 'discharge_disposition_id_2', label: 'Discharged_to_home' },
            { name: 'discharge_disposition_id_7', label: 'Discharged_to_another_facility' },
            { name: 'discharge_disposition_id_10', label: 'Expired' },
            { name: 'discharge_disposition_id_18', label: 'Transferred_to_another_hospital' },
          ]}
          handleNestedChange={handleNestedChange}
        />

        <NestedCheckboxFieldset
          label="A1C Result"
          section="A1Cresult"
          options={[
            { name: 'A1Cresult_>8', label: '>8' },
            { name: 'A1Cresult_None', label: 'None' },
          ]}
          handleNestedChange={handleNestedChange}
        />

        <NestedCheckboxFieldset
          label="Admission Source"
          section="admission_source"
          options={[
            { name: 'admission_source_id_4', label: 'Transfer from another healthcare facility' },
            { name: 'admission_source_id_7', label: 'Emergency Room' },
            { name: 'admission_source_id_9', label: 'Clinic Referral' },
          ]}
          handleNestedChange={handleNestedChange}
        />

        <NestedCheckboxFieldset
          label="Max Glu Serum"
          section="max_glu_serum"
          options={[
            { name: 'max_glu_serum_None', label: 'None' },
            { name: 'max_glu_serum_>200', label: '>200' },
          ]}
          handleNestedChange={handleNestedChange}
        />

        <NestedCheckboxFieldset
          label="Level 1 Diagnosis"
          section="level1_diag"
          options={[
            { name: 'level1_diag1_1.0', label: 'Diabetes_mellitus' },
            { name: 'level1_diag1_2.0', label: 'Hypertension' },
            { name: 'level1_diag1_3.0', label: 'Heart_failure' },
            { name: 'level1_diag1_4.0', label: 'Copd' },
            { name: 'level1_diag1_5.0', label: 'Stroke' },
            { name: 'level1_diag1_6.0', label: 'Chronic_kidney_disease' },
            { name: 'level1_diag1_7.0', label: 'Cancer' },
            { name: 'level1_diag1_8.0', label: 'Asthma' },
          ]}
          handleNestedChange={handleNestedChange}
        />

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;