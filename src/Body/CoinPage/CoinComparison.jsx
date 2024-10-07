import React, { useState, useEffect } from 'react';
import { getCoinList, getCoinById } from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorMessage } from '../../services/store';
import { Form, Button, Row, Col, Table, Spinner } from 'react-bootstrap';

function CoinComparison() {
    const dispatch = useDispatch();
    const selectedCurrency = useSelector((state) => state.selectedCurrency);

    const [coinList, setCoinList] = useState([]);
    const [coin1Id, setCoin1Id] = useState('');
    const [coin2Id, setCoin2Id] = useState('');
    const [coin1Data, setCoin1Data] = useState(null);
    const [coin2Data, setCoin2Data] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCoinList(selectedCurrency.name)
            .then((data) => {
                setCoinList(data);
            })
            .catch((error) =>
                dispatch(
                    setErrorMessage(
                        "Failed to fetch coin list. Error: " + error.toString()
                    )
                )
            );
    }, [selectedCurrency, dispatch]);

    const handleCompare = () => {
        if (coin1Id && coin2Id) {
            setIsLoading(true);
            Promise.all([
                getCoinById(coin1Id, selectedCurrency.name),
                getCoinById(coin2Id, selectedCurrency.name),
            ])
                .then(([data1, data2]) => {
                    setCoin1Data(data1);
                    setCoin2Data(data2);
                    setIsLoading(false);
                })
                .catch((error) => {
                    dispatch(
                        setErrorMessage(
                            "Failed to fetch coin data. Error: " + error.toString()
                        )
                    );
                    setIsLoading(false);
                });
        } else {
            dispatch(setErrorMessage("Please select two coins to compare."));
        }
    };

    const getFormattedValue = (value, fractionDigits = 2) => {
        return value !== undefined && value !== null
            ? Number(value).toLocaleString(undefined, {
                minimumFractionDigits: fractionDigits,
                maximumFractionDigits: fractionDigits,
            })
            : 'N/A';
    };

    return (
        <div>
            <h2>Compare Cryptocurrencies</h2>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="coin1Select">
                            <Form.Label>Select First Coin</Form.Label>
                            <Form.Control
                                as="select"
                                value={coin1Id}
                                onChange={(e) => setCoin1Id(e.target.value)}
                            >
                                <option value="">Select a coin</option>
                                {coinList.map((coin) => (
                                    <option key={coin.id} value={coin.id}>
                                        {coin.name} ({coin.symbol})
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="coin2Select">
                            <Form.Label>Select Second Coin</Form.Label>
                            <Form.Control
                                as="select"
                                value={coin2Id}
                                onChange={(e) => setCoin2Id(e.target.value)}
                            >
                                <option value="">Select a coin</option>
                                {coinList.map((coin) => (
                                    <option key={coin.id} value={coin.id}>
                                        {coin.name} ({coin.symbol})
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mt-3" onClick={handleCompare} disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'Compare'}
                </Button>
            </Form>
            {coin1Data && coin2Data && (
                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>{coin1Data.name}</th>
                            <th>{coin2Data.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Price ({selectedCurrency.symbol})</td>
                            <td>
                                {getFormattedValue(
                                    coin1Data.quotes[selectedCurrency.name]?.price
                                )}
                            </td>
                            <td>
                                {getFormattedValue(
                                    coin2Data.quotes[selectedCurrency.name]?.price
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Market Cap ({selectedCurrency.symbol})</td>
                            <td>
                                {getFormattedValue(
                                    coin1Data.quotes[selectedCurrency.name]?.market_cap,
                                    0
                                )}
                            </td>
                            <td>
                                {getFormattedValue(
                                    coin2Data.quotes[selectedCurrency.name]?.market_cap,
                                    0
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>Rank</td>
                            <td>{coin1Data.rank ?? 'N/A'}</td>
                            <td>{coin2Data.rank ?? 'N/A'}</td>
                        </tr>

                        <tr>
                            <td>Volume 24h ({selectedCurrency.symbol})</td>
                            <td>
                                {getFormattedValue(
                                    coin1Data.quotes[selectedCurrency.name]?.volume_24h,
                                    0
                                )}
                            </td>
                            <td>
                                {getFormattedValue(
                                    coin2Data.quotes[selectedCurrency.name]?.volume_24h,
                                    0
                                )}
                            </td>
                        </tr>
                    </tbody>

                </Table>
            )}
        </div>
    );
}

export default CoinComparison;
