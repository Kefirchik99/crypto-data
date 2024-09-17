import React from 'react';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const initialState = {
    fromValue: 10,
    toValue: 50,
    fromCoin: '1',
    toCoin: '2',
};

function Converter() {
    const [state, setState] = React.useState(initialState);

    const handleSelectChange = (coinType, event) => {
        const newValue = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [coinType]: newValue,
        }));
    };

    const handleClick = () => {
        const { fromCoin, toCoin, fromValue, toValue } = state;

        if (fromCoin === '0' || toCoin === '0') {
            alert("Please select coin!");
            return;
        } else if (fromCoin === toCoin) {
            alert("Please select valid coin!");
            return;
        }

        setState(() => ({

            fromValue: toValue,
            toValue: fromValue,
            fromCoin: toCoin,
            toCoin: fromCoin,
        }));
    };

    return (
        <Row className="g-2" style={{ fontSize: '0.75rem', padding: '5px', width: '500px', marginLeft: '0' }}>
            <Col md>
                <InputGroup>
                    <FloatingLabel controlId="fromInput" label="From">
                        <Form.Control type="text" placeholder="0" value={state.fromValue} />
                    </FloatingLabel>
                    <FloatingLabel controlId="from" label="Select Coin">
                        <Form.Select value={state.fromCoin} onChange={(e) => handleSelectChange('fromCoin', e)}>
                            <option value="0"></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FloatingLabel>
                </InputGroup>
            </Col>
            <Col md={1} className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon
                    icon={faArrowsRotate}
                    onClick={handleClick}
                    style={{ fontSize: '1.8rem', color: 'blue' }}
                />
            </Col>
            <Col md>
                <InputGroup>
                    <FloatingLabel controlId="toInput" label="To">
                        <Form.Control type="text" placeholder="0" value={state.toValue} />
                    </FloatingLabel>
                    <FloatingLabel controlId="to" label="Select Coin">
                        <Form.Select value={state.toCoin} onChange={(e) => handleSelectChange('toCoin', e)}>
                            <option value="0"></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FloatingLabel>
                </InputGroup>
            </Col>
        </Row>
    );
}

export default Converter;
