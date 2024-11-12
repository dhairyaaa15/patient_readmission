import React from 'react';

interface Option {
  name: string;
  label: string;
}

interface NestedCheckboxFieldsetProps {
  label: string;
  section: string;
  options: Option[];
  handleNestedChange: (section: string, name: string, checked: boolean) => void;
}

const NestedCheckboxFieldset: React.FC<NestedCheckboxFieldsetProps> = ({
  label,
  section,
  options,
  handleNestedChange
}) => (
  <fieldset className="mb-4 border border-gray-300 p-4 rounded-md">
    <legend className="text-sm font-medium text-gray-700">{label}</legend>
    <div className="grid grid-cols-2 gap-2 mt-2">
      {options.map((option) => (
        <div key={option.name} className="flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            id={`${section}-${option.name}`}
            name={`${section}.${option.name}`}
            onChange={(e) =>
              handleNestedChange(section, option.name, e.target.checked)
            }
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor={`${section}-${option.name}`}
            className="ml-2"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default NestedCheckboxFieldset;