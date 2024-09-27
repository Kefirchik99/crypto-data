import React from "react";
import CoinPriceSection from "./CoinPriceSection";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CoinMetrics from "./CoinMetrics";
import CoinChart from "./CoinChart";
import ChartPeriods from './ChartPeriods';
import Button from "react-bootstrap/Button";
import ChartModal from "./ChartModal";
import { getCoinById, getHistoricalData } from "../../services/api";
import { periods } from "./constants";


function CoinPage({ selectedCurrency }) {
    const [chartModalShow, setChartModalShow] = React.useState(false);
    const [coinData, setCoinData] = React.useState({});
    const [historicalData, setHistoricalData] = React.useState([]);
    const [selectedPeriod, setSelectedPeriod] = React.useState(periods[0]);

    const handleShow = () => setChartModalShow(true);
    const handleClose = () => setChartModalShow(false);

    React.useEffect(() => {
        getCoinById('btc-bitcoin', selectedCurrency.name).then(setCoinData);

    }, [selectedCurrency]);

    React.useEffect(() => {
        getHistoricalData({
            id: 'btc-bitcoin',
            currency: selectedCurrency.name,
            start: selectedPeriod.start(),
            interval: selectedPeriod.interval,
        }).then(data => setHistoricalData(
            data?.map(({ timestamp, ...rest }) => ({
                ...rest,
                timestamp: moment(timestamp).format(selectedPeriod.format)
            })
            )));
    }, [selectedPeriod, selectedCurrency]);

    return (
        <>
            <CoinPriceSection />
            <Row>
                <Col md={4}>
                    <CoinMetrics
                        {...coinData}
                        currency={selectedCurrency} />
                </Col>
                <Col md={8}>
                    <CoinChart data={historicalData} />
                    <Row>
                        <Col>
                            <ChartPeriods
                                selectedPeriod={selectedPeriod}
                                setSelectedPeriod={setSelectedPeriod}

                            />
                        </Col>
                        <Col>
                            <Button onClick={handleShow} variant="primary">ZOOM IN</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ChartModal show={chartModalShow} handleClose={handleClose}>
                <CoinChart data={historicalData} />
                <ChartPeriods
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                />
            </ChartModal>
        </>
    );
}

export default CoinPage;