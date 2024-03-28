import React from 'react';
import { Input } from '../ui/input';

const UsaFormatInput = ({ onChange, value, placeholder, suffix }) => {
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    // Check if the input is being cleared
    if (rawValue.length === 0) {
      onChange && onChange("")
      return;
    }
    const formattedValue = formatUsaPhoneNumber(rawValue); // Format as USA phone number
    onChange && onChange(formattedValue)
  };

  const formatUsaPhoneNumber = (value) => {
    let formattedValue = '';

    if (value.length >= 1) {
      formattedValue += `(${value.slice(0, 3)}`;
    }
    if (value.length >= 4) {
      formattedValue += `) ${value.slice(3, 6)}`;
    }
    if (value.length >= 7) {
      formattedValue += `-${value.slice(6, 10)}`;
    }

    return formattedValue;
  };

  return (
    <input
      type='text'
      value={value || ""}
      className='p-1.5 rounded-md  focus:outline-none placeholder:text-neutral-600 text-b-sm'
      onChange={handleChange}
      placeholder={placeholder || "(XXX) XXX-XXXX"}
      maxLength={14} // Limit the input length to match the formatted USA format
      suffix={suffix}
    />
  );
};

export default UsaFormatInput;
