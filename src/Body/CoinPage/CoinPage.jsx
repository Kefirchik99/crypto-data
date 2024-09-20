import React from "react";
import CoinPriceSection from "./CoinPriceSection";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CoinMetrics from "./CoinMetrics";
import CoinChart from "./CoinChart";
import ChartPeriods from './ChartPeriods';
import Button from "react-bootstrap/Button";
import ChartModal from "./ChartModal";


function CoinPage() {
    const [chartModalShow, setChartModalShow] = React.useState(false);

    const handleShow = () => setChartModalShow(true);
    const handleClose = () => setChartModalShow(false);

    return (
        <>
            <CoinPriceSection />
            <Row>
                <Col md={4}>
                    <CoinMetrics />
                </Col>
                <Col md={8}>
                    <CoinChart />
                    <Row>
                        <Col>
                            <ChartPeriods />
                        </Col>
                        <Col>
                            <Button onClick={handleShow} variant="primary">ZOOM IN</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ChartModal show={chartModalShow} handleClose={handleClose}>
                <CoinChart />
                <ChartPeriods />
            </ChartModal>
        </>
    );
}

export default CoinPage;