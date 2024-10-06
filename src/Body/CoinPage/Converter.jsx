import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { getPriceConverter } from "../../services/api";
import { useSelector } from "react-redux";


function Converter({ defaultFromCoin }) {

    const [values, setValues] = React.useState(() => ({
        from: {
            amount: 0,
            coin: "btc-bitcoin",
        },
        to: {
            amount: 0,
            coin: defaultFromCoin || "eth-ethereum",
        },
    }));

    const coinList = useSelector((state) => state.coinList);

    React.useEffect(() => {

        if (values.from.amount > 0) {
            (async () => {
                try {
                    const data = await getPriceConverter({
                        baseCurrency: values.from.coin,
                        quoteCurrency: values.to.coin,
                        amount: values.from.amount,
                    });

                    setValues((prevValues) => ({
                        ...prevValues,
                        to: {
                            ...prevValues.to,
                            amount: data.price,
                        },
                    }));
                } catch (error) {
                    console.error("Error fetching conversion rate:", error);

                }
            })();
        }
    }, [values.from.amount, values.from.coin, values.to.coin]);

    const handleClick = () => {
        setValues((prevValues) => ({
            from: prevValues.to,
            to: prevValues.from,
        }));
    };

    const handleOnChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setValues((prevValues) => ({
            ...prevValues,
            [field]: {
                ...prevValues[field],
                amount: value,
            },
        }));
    };

    const handleOnSelect = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setValues((prevValues) => ({
            ...prevValues,
            [field]: {
                ...prevValues[field],
                coin: value,
            },
        }));
    };

    if (!coinList.length) return null;

    return (
        <Row className="g-2">
            <Col md={5}>
                <InputGroup>
                    <FloatingLabel controlId="fromInput" label="From">
                        <Form.Control
                            name="from"
                            type="number" // Changed to number for better UX
                            placeholder="0"
                            value={values.from.amount}
                            onChange={handleOnChange}
                            min="0"
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="fromCoinSelect" label="Coin">
                        <Form.Select
                            value={values.from.coin}
                            name="from"
                            onChange={handleOnSelect}
                        >
                            {coinList.map((coin) => (
                                <option key={coin.id} value={coin.id}>
                                    {coin.name}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </InputGroup>
            </Col>
            <Col md={2} className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon
                    icon={faArrowsRotate}
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                    title="Swap"
                />
            </Col>
            <Col md={5}>
                <InputGroup>
                    <FloatingLabel controlId="toInput" label="To">
                        <Form.Control
                            name="to"
                            type="number"
                            placeholder="0"
                            value={values.to.amount}
                            onChange={handleOnChange}
                            min="0"
                            readOnly // Typically, 'to' amount is calculated
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="toCoinSelect" label="Coin">
                        <Form.Select
                            value={values.to.coin}
                            name="to"
                            onChange={handleOnSelect}
                        >
                            {coinList.map((coin) => (
                                <option key={coin.id} value={coin.id}>
                                    {coin.name}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </InputGroup>
            </Col>
        </Row>
    );
}

export default Converter;
