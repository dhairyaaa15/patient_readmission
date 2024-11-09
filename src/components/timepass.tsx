const [formData, setFormData] = useState({
    "age": '',
    "time_in_hospital": '',
    "num_procedures": '',
    "num_medications": '',
    "number_outpatient_log1p": '',
    "number_emergency_log1p": '',
    "number_inpatient_log1p": '',
    "number_diagnoses": '',
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
    "gender_1": '',
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

  import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import NestedCheckboxFieldset from '../components/NestedCheckboxFieldset';

const PatientForm: React.FC = () => {
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
    gender_1: '',
    admission_type: {
      admission_type_id_3: false,
      admission_type_id_5: false,
    },
    discharge_disposition: {
      discharge_disposition_id_2: false,
      discharge_disposition_id_7: false,
      discharge_disposition_id_10: false,
      discharge_disposition_id_18: false,
    },
    admission_source: {
      admission_source_id_4: false,
      admission_source_id_7: false,
      admission_source_id_9: false,
    },
    A1Cresult: {
      A1Cresult_None: false,
      A1Cresult_>8: false,
    },
    max_glu_serum: {
      max_glu_serum_None: false,
      max_glu_serum_>200: false,
    },
    level1_diag: {
      level1_diag1_1.0: false,
      level1_diag1_2.0: false,
      level1_diag1_3.0: false,
      level1_diag1_4.0: false,
      level1_diag1_5.0: false,
      level1_diag1_6.0: false,
      level1_diag1_7.0: false,
      level1_diag1_8.0: false,
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number' && value === ''
        ? 0
        : value;

    if (name.includes('.')) {
      const [section, key] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: newValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleNestedChange = (section: string, name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: checked,
      },
    }));
  };

  const handleLogInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = parseFloat(e.target.value);
    const logValue = value > 0 ? Math.log1p(value) : 0;
    setFormData((prevData) => ({
      ...prevData,
      [field]: logValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validatedData = {
      ...formData,
      age: formData.age === '' ? 0 : formData.age,
      time_in_hospital: formData.time_in_hospital === '' ? 0 : formData.time_in_hospital,
      num_procedures: formData.num_procedures === '' ? 0 : formData.num_procedures,
      num_medications: formData.num_medications === '' ? 0 : formData.num_medications,
      number_outpatient_log1p: formData.number_outpatient_log1p === '' ? 0 : formData.number_outpatient_log1p,
      number_emergency_log1p: formData.number_emergency_log1p === '' ? 0 : formData.number_emergency_log1p,
      number_inpatient_log1p: formData.number_inpatient_log1p === '' ? 0 : formData.number_inpatient_log1p,
      number_diagnoses: formData.number_diagnoses === '' ? 0 : formData.number_diagnoses,
      medications: Object.fromEntries(
        Object.entries(formData.medications).map(([key, value]) => [key, value ? 1 : 0])
      ),
      demographics: Object.fromEntries(
        Object.entries(formData.demographics).map(([key, value]) => [key, value ? 1 : 0])
      ),
      admission_type: Object.fromEntries(
        Object.entries(formData.admission_type).map(([key, value]) => [key, value ? 1 : 0])
      ),
      discharge_disposition: Object.fromEntries(
        Object.entries(formData.discharge_disposition).map(([key, value]) => [key, value ? 1 : 0])
      ),
      admission_source: Object.fromEntries(
        Object.entries(formData.admission_source).map(([key, value]) => [key, value ? 1 : 0])
      ),
      A1Cresult: Object.fromEntries(
        Object.entries(formData.A1Cresult).map(([key, value]) => [key, value ? 1 : 0])
      ),
      max_glu_serum: Object.fromEntries(
        Object.entries(formData.max_glu_serum).map(([key, value]) => [key, value ? 1 : 0])
      ),
      level1_diag: Object.fromEntries(
        Object.entries(formData.level1_diag).map(([key, value]) => [key, value ? 1 : 0])
      ),
    };

    try {
      const response = await axios.post('https://readmission-backend.onrender.com/predict', validatedData);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Patient Information Form</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="block text-sm font-medium text-gray-700">Number of Outpatient Visits:</label>
          <input
            type="number"
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
          onChange={handleNestedChange}
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
            { name: 'admission_source_id_4', label: 'Emergency-Room' },
            { name: 'admission_source_id_7', label: 'Emergency-Room' },
            { name: 'admission_source_id_9', label: 'Elective' },
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
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded shadow hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
