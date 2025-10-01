import React from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  allLabel?: string;
  className?: string;
}

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    border: '1px solid #e2e8f0',
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: '20px',
    padding: '4px',
  }),
  control: (provided: any) => ({
    ...provided,
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    padding: '4px 8px',
    minHeight: '44px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '12px',
    backgroundColor: state.isSelected 
      ? '#3b82f6' 
      : state.isFocused 
      ? '#f1f5f9' 
      : 'white',
    color: state.isSelected ? 'white' : '#1e293b',
    margin: '2px 0',
    cursor: 'pointer',
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  allLabel = 'All',
  className = '',
}) => {
  const selectOptions: Option[] = options.map((opt) => ({
    value: opt,
    label: opt === 'all' ? allLabel : opt,
  }));

  const selectedOption = selectOptions.find((opt) => opt.value === value) || null;

  return (
    <Select
      value={selectedOption}
      onChange={(option) => option && onChange(option.value)}
      options={selectOptions}
      styles={customStyles}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default CustomSelect;