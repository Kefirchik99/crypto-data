// PriceNumber.jsx
import { NumericFormat } from "react-number-format";

const PriceNumber = ({ value, symbol = '', suffix = '', decimalScale = 2, fixedDecimalScale = true }) => {
    return (
        <NumericFormat
            value={value}
            thousandSeparator="."
            decimalSeparator=","
            displayType="text"
            prefix={`${symbol} `}
            suffix={suffix}
            decimalScale={decimalScale}
            fixedDecimalScale={fixedDecimalScale}
        />
    );
};

export default PriceNumber;
