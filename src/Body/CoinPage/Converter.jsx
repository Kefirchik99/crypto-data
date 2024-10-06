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
    console.log("Converter");
    const [values, setValues] = React.useState(initialState);

    const coinList = useSelector((state) => state.coinList);

    React.useEffect(() => {
        (async () => {

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
        })();
    }, [values.from.amount, values.from.coin, values.to.coin]);

    const handleClick = () => {
        setValues({
            from: values.to,
            to: values.from,
        });
    };

    const handleOnChage = (event) => {
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
        <Row className="g-2">
            <Col md={5}>
                <InputGroup>
                    <FloatingLabel controlId="fromInput" label="From">
                        <Form.Control
                            name="from"
                            type="text"
                            placeholder="0"
                            value={values.from.amount}
                            onChange={handleOnChage}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="from" label="Coin">
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
            <Col md={2}>
                <FontAwesomeIcon icon={faArrowsRotate} onClick={handleClick} />
            </Col>
            <Col md={5}>
                <InputGroup>
                    <FloatingLabel controlId="toInput" label="To">
                        <Form.Control
                            name="to"
                            type="text"
                            placeholder="0"
                            value={values.to.amount}
                            onChange={handleOnChage}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="to" label="Coin">
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