// CoinPage.js
import React from "react";
import CoinPriceSection from "./CoinPriceSection";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CoinMetrics from "./CoinMetrics";
import CoinChart from "./CoinChart";
import ChartPeriods from './ChartPeriods';
import Button from "react-bootstrap/Button";
import ChartModal from "./ChartModal";
import { getCoinById } from "../../services/api";

function CoinPage({ selectedCurrency }) {
    const [chartModalShow, setChartModalShow] = React.useState(false);
    const [coinData, setCoinData] = React.useState(null);

    const handleShow = () => setChartModalShow(true);
    const handleClose = () => setChartModalShow(false);

    React.useEffect(() => {
        getCoinById('btc-bitcoin', selectedCurrency).then(setCoinData);
    }, [selectedCurrency]);

    return (
        <>
            <CoinPriceSection selectedCurrency={selectedCurrency} />
            <Row>
                <Col md={4}>
                    <CoinMetrics coinData={coinData} selectedCurrency={selectedCurrency} />
                </Col>
                <Col md={8}>
                    <CoinChart selectedCurrency={selectedCurrency} />
                    <Row>
                        <Col>
                            <ChartPeriods selectedCurrency={selectedCurrency} />
                        </Col>
                        <Col>
                            <Button onClick={handleShow} variant="primary">ZOOM IN</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ChartModal show={chartModalShow} handleClose={handleClose}>
                <CoinChart selectedCurrency={selectedCurrency} />
                <ChartPeriods selectedCurrency={selectedCurrency} />
            </ChartModal>
        </>
    );
}

export default CoinPage;
