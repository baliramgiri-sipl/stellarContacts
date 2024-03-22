import { Input } from 'postcss';
import React from 'react';


const ZipInput = ({ onChange, value, suffix }) => {
    const handleInputChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatInput(value);

        if (formattedValue.length <= 10) {
            onChange && onChange(formattedValue)
        }
    };

    const formatInput = (value) => {
        // Remove any non-digit characters from the input
        const numericValue = value.replace(/\D/g, '');

        // Format the numeric value with the desired pattern
        let formattedValue = '';
        if (numericValue.length > 5) {
            formattedValue = `${numericValue.slice(0, 5)}-${numericValue.slice(5, 9)}`;
        } else {
            formattedValue = numericValue;
        }

        return formattedValue;
    };

    return (
        <Input
            placeholder='XXXXX-XXXX'
            value={value || ""}
            onChange={handleInputChange}
            suffix={suffix}

        />
    );
};

export default ZipInput;
