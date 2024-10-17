import React from "react";
import { getPriceConverter } from "../../services/api";
import { useSelector } from "react-redux";
import lodash from "lodash";
import "../../styles/Converter.scss";
import swaplogo from "../../pictures/Swap-Logo.png";

const initialState = {
    from: {
        amount: 0,
        coin: "btc-bitcoin",
    },
    to: {
        amount: 0,
        coin: "eth-ethereum",
    },
};

function Converter() {
    const [values, setValues] = React.useState(initialState);
    const coinList = useSelector((state) => state.coinList);

    const convertDebounce = React.useCallback(
        lodash.debounce(async (values) => {
            const data = await getPriceConverter({
                baseCurrency: values.from.coin,
                quoteCurrency: values.to.coin,
                amount: values.from.amount,
            });

            setValues({
                ...values,
                to: {
                    ...values.to,
                    amount: data.price,
                },
            });
        }, 1000),
        []
    );

    React.useEffect(() => {
        convertDebounce(values);
    }, [values.from.amount, values.from.coin, values.to.coin]);

    const handleClick = () => {
        setValues({
            from: values.to,
            to: values.from,
        });
    };

    const handleOnChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setValues({
            ...values,
            [field]: {
                ...values[field],
                amount: value,
            },
        });
    };

    const handleOnSelect = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setValues({
            ...values,
            [field]: {
                ...values[field],
                coin: value,
            },
        });
    };

    if (!coinList.length) return null;

    return (
        <div className="converter-container">
            <div className="converter-input">
                <div className="input-group">
                    <label className="input-label" htmlFor="fromInput">From amount</label>
                    <input
                        id="fromInput"
                        name="from"
                        type="text"
                        className="input-field"
                        placeholder="0"
                        value={values.from.amount}
                        onChange={handleOnChange}
                    />
                    <label className="input-label" htmlFor="fromSelect">Coin</label>
                    <select
                        id="fromSelect"
                        name="from"
                        className="select-field"
                        value={values.from.coin}
                        onChange={handleOnSelect}
                    >
                        {coinList.map((coin) => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="converter-swap-button">
                <button className="swap-button" onClick={handleClick}>
                    <img src={swaplogo} alt="Crypto Olive Logo" className="navigation__logo" />
                </button>
            </div>

            <div className="converter-input">
                <div className="input-group">
                    <label className="input-label" htmlFor="toInput">To amount</label>
                    <input
                        id="toInput"
                        name="to"
                        type="text"
                        className="input-field"
                        placeholder="0"
                        value={values.to.amount}
                        onChange={handleOnChange}
                    />
                    <label className="input-label" htmlFor="toSelect">Coin</label>
                    <select
                        id="toSelect"
                        name="to"
                        className="select-field"
                        value={values.to.coin}
                        onChange={handleOnSelect}
                    >
                        {coinList.map((coin) => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Converter;
