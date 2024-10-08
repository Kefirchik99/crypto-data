import React, { useState, useEffect } from 'react';
import { getCoinList, getCoinById } from '../../services/api';
import { Form, Button, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';

function CoinComparison() {
    const [coinList, setCoinList] = useState([]);
    const [coin1Id, setCoin1Id] = useState('');
    const [coin2Id, setCoin2Id] = useState('');
    const [coin1Data, setCoin1Data] = useState(null);
    const [coin2Data, setCoin2Data] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [coinDataCache, setCoinDataCache] = useState({});
    const [errorMessage, setErrorMessage] = useState('');


    const defaultCurrency = 'BTC';


    useEffect(() => {
        getCoinList(defaultCurrency)
            .then((data) => {
                if (Array.isArray(data)) {
                    setCoinList(data);
                } else {
                    setErrorMessage('Failed to fetch coin list: Invalid data format.');
                }
            })
            .catch((error) =>
                setErrorMessage(
                    'Failed to fetch coin list. Error: ' + error.toString()
                )
            );
    }, [defaultCurrency]);

    const handleCompare = () => {
        if (coin1Id && coin2Id) {
            setIsLoading(true);
            const promises = [];


            if (coinDataCache[coin1Id]) {
                promises.push(Promise.resolve(coinDataCache[coin1Id]));
            } else {
                promises.push(
                    getCoinById(coin1Id, defaultCurrency).then((data) => {
                        setCoinDataCache((prevCache) => ({
                            ...prevCache,
                            [coin1Id]: data,
                        }));
                        return data;
                    })
                );
            }


            if (coinDataCache[coin2Id]) {
                promises.push(Promise.resolve(coinDataCache[coin2Id]));
            } else {
                promises.push(
                    getCoinById(coin2Id, defaultCurrency).then((data) => {
                        setCoinDataCache((prevCache) => ({
                            ...prevCache,
                            [coin2Id]: data,
                        }));
                        return data;
                    })
                );
            }

            Promise.all(promises)
                .then(([data1, data2]) => {
                    setCoin1Data(data1);
                    setCoin2Data(data2);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setErrorMessage(
                        'Failed to fetch coin data. Error: ' + error.toString()
                    );
                    setIsLoading(false);
                });
        } else {
            setErrorMessage('Please select two coins to compare.');
        }
    };

    const getFormattedValue = (value, fractionDigits = 8) => {
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
            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                    {errorMessage}
                </Alert>
            )}
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
                                {Array.isArray(coinList) &&
                                    coinList.map((coin) => (
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
                                {Array.isArray(coinList) &&
                                    coinList.map((coin) => (
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
                            <td>Price (BTC)</td>
                            <td>
                                {getFormattedValue(
                                    coin1Data.quotes[defaultCurrency]?.price
                                )}
                            </td>
                            <td>
                                {getFormattedValue(
                                    coin2Data.quotes[defaultCurrency]?.price
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Market Cap (BTC)</td>
                            <td>
                                {getFormattedValue(
                                    coin1Data.quotes[defaultCurrency]?.market_cap,
                                    8
                                )}
                            </td>
                            <td>
                                {getFormattedValue(
                                    coin2Data.quotes[defaultCurrency]?.market_cap,
                                    8
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Rank</td>
                            <td>{coin1Data.rank ?? 'N/A'}</td>
                            <td>{coin2Data.rank ?? 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Volume 24h (BTC)</td>
                            <td>
                                {getFormattedValue(
                                    coin1Data.quotes[defaultCurrency]?.volume_24h,
                                    8
                                )}
                            </td>
                            <td>
                                {getFormattedValue(
                                    coin2Data.quotes[defaultCurrency]?.volume_24h,
                                    8
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
