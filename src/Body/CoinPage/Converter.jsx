import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { getCoinList, getConverter } from '../../services/api';

const initialState = {
    from: {
        amount: 1,
        coin: 'btc-bitcoin',
    },
    to: {
        amount: 0,
        coin: 'eth-ethereum',
    },
};

function Converter() {
    const [coinList, setCoinList] = useState([]);
    const [values, setValues] = useState(initialState);

    useEffect(() => {
        const fetchCoins = async () => {
            const coins = await getCoinList('EUR');
            setCoinList(coins);
        };

        fetchCoins();
    }, []);

    useEffect(() => {
        const fetchConversion = async () => {
            const result = await getConverter({
                base_currency_id: values.from.coin,
                quote_currency_id: values.to.coin,
                amount: values.from.amount,
            });

            setValues((prevValues) => ({
                ...prevValues,
                to: {
                    ...prevValues.to,
                    amount: result.price,
                },
            }));
        };

        if (values.from.amount && values.from.coin && values.to.coin) {
            fetchConversion();
        }
    }, [values.from.amount, values.from.coin, values.to.coin]);

    const handleClick = () => {
        setValues((prevValues) => ({
            from: prevValues.to,
            to: prevValues.from,
        }));
    };

    const handleOnChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;

        setValues((prevValues) => ({
            ...prevValues,
            [field]: {
                ...prevValues[field],
                amount: value,
            },
        }));
    };

    const handleOnSelect = (event) => {
        const value = event.target.value;
        const field = event.target.name;

        setValues((prevValues) => ({
            ...prevValues,
            [field]: {
                ...prevValues[field],
                coin: value,
            },
        }));
    };

    return (
        <Row className="g-2">
            <Col md>
                <InputGroup>
                    <FloatingLabel controlId="fromInput" label="From">
                        <Form.Control
                            name="from"
                            type="text"
                            placeholder="0"
                            value={values.from.amount}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="fromCoin" label="Coin">
                        <Form.Select value={values.from.coin} name="from" onChange={handleOnSelect}>
                            {coinList.map((coin) => (
                                <option key={coin.id} value={coin.id}>
                                    {coin.name} ({coin.symbol})
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </InputGroup>
            </Col>
            <Col xs="auto">
                <FontAwesomeIcon
                    icon={faArrowsRotate}
                    onClick={handleClick}
                    style={{ cursor: 'pointer', marginTop: '1.5rem' }}
                />
            </Col>
            <Col md>
                <InputGroup>
                    <FloatingLabel controlId="toInput" label="To">
                        <Form.Control
                            name="to"
                            type="number"
                            placeholder="0"
                            value={values.to.amount}
                            onChange={handleOnChange}
                            disabled
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="toCoin" label="Coin">
                        <Form.Select value={values.to.coin} name="to" onChange={handleOnSelect}>
                            {coinList.map((coin) => (
                                <option key={coin.id} value={coin.id}>
                                    {coin.name} ({coin.symbol})
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
