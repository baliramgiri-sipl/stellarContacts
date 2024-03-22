import { Input } from "../ui/input";

export default function PriceInput({ onChange, value, placeholder, suffix, ...rest }) {

    const handlePriceChange = (event) => {
        const inputValue = event.target.value;
        let numericValue = inputValue.replace(/[^0-9]/g, '');
        let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (formattedValue) {
            formattedValue = `$${formattedValue}`;
        }
        onChange && onChange(formattedValue);
    };

    return (
        <Input
            {...rest}
            placeholder={placeholder || "Enter Price"}
            value={value || ""}
            onChange={handlePriceChange}
            width={"100%"}
            suffix={suffix}
        />
    );
}
