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
  <fieldset className="mb-4">
    <legend className="text-sm font-medium text-gray-700">{label}</legend>
    <div className="mt-2 space-y-2">
      {options.map((option) => (
        <div key={option.name} className="flex items-center">
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
            className="ml-2 block text-sm text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default NestedCheckboxFieldset;
