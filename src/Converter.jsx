import React from 'react';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const initialState = {
    from: 10,
    to: 50,
};

const initialCoin = {
    from: '1',
    to: '2',
};

function Converter() {
    const [values, SetValues] = React.useState(initialState);
    const [leftToRight, setLeftToRight] = React.useState(true);
    const [coins, SetCoins] = React.useState(initialCoin);

    const handleSelectChange = (coinType, event) => {
        const newValue = event.target.value;
        SetCoins((prevCoins) => ({
            ...prevCoins,
            [coinType]: newValue,
        }));
    };


    const handleClick = () => {

        if (coins.to === '0' || coins.from === "0") {
            alert("Please select coin!");
            return;
        } else if (coins.to === coins.from) {
            alert("Please select valid coin!");
            return;
        }

        SetValues({
            from: values.to,
            to: values.from,
        })
        SetCoins({
            from: coins.to,
            to: coins.from,
        });

        setLeftToRight(!leftToRight);


    };
    return (
        <Row className="g-2" style={{ fontSize: '0.75rem', padding: '5px', width: '500px', marginLeft: '0' }}>
            <Col md>
                <InputGroup>
                    <FloatingLabel controlId="fromInput" label="From">
                        <Form.Control type="text" placeholder="0" value={values.from} />
                    </FloatingLabel>
                    <FloatingLabel controlId="from" label="Select Coin">
                        <Form.Select value={coins.from} onChange={(e) => handleSelectChange('from', e)}>
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
                        <Form.Control type="text" placeholder="0" value={values.to} />
                    </FloatingLabel>
                    <FloatingLabel controlId="to" label="Select Coin">
                        <Form.Select value={coins.to} onChange={(e) => handleSelectChange('to', e)}>
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