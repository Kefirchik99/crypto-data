import React from 'react';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const initialState = {
    from: {
        amount: 100,
        coin: 2,
    },
    to: {
        amount: 99,
        coin: 1,
    },
};

function Converter() {
    const [values, SetValues] = React.useState(initialState);
    const [leftToRight, setLeftToRight] = React.useState(true);

    const handleClick = () => {
        SetValues({
            from: values.to,
            to: values.from,
        });
    };
    return (
        <Row className="g-2">
            <Col md>
                <InputGroup>
                    <FloatingLabel controlId="fromInput" label="From">
                        <Form.Control type="text" placeholder="0" value={values.from.amount}
                            defaultValue={values.from.amount}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="from"
                        label="Coin">
                        <Form.Select value={values.from.coin}>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FloatingLabel>
                </InputGroup>
            </Col>
            <Col>
                <FontAwesomeIcon icon={faArrowsRotate} onClick={handleClick} />
            </Col>
            <Col md>
                <InputGroup>
                    <FloatingLabel controlId="toInput" label="To">
                        <Form.Control type="text" placeholder="0" value={values.to.amount}
                            defaultValue={values.to.amount}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="to"
                        label="Coin">
                        <Form.Select value={values.to.coin}>
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