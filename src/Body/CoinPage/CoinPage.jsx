import React from "react";
import CoinPriceSection from "./CoinPriceSection";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CoinMetrics from "./CoinMetrics";
import CoinChart from "./CoinChart";
import ChartPeriods from "./ChartPeriods";
import Button from "react-bootstrap/Button";
import ChartModal from "./ChartModal";
import { getCoinById, getHistoricalData } from "../../services/api";
import { periods } from "./constants";
import moment from "moment";
import { useParams } from "react-router-dom";
import Converter from "./Converter";
import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage } from "../../services/store";
import { BodyContext } from "../../providers/BodyProvider";

function CoinPage() {

    const dispatch = useDispatch();
    const [chartModalShow, setChartModalShow] = React.useState(false);
    const [coinData, setCoinData] = React.useState({});
    const [historicalData, setHistoricalData] = React.useState([]);
    const [selectedPeriod, setSelectedPeriod] = React.useState(periods[0]);

    const { setHistoryLog } = React.useContext(BodyContext);

    const selectedCurrency = useSelector((state) => state.selectedCurrency);

    const { coinId } = useParams();

    const handleShow = () => setChartModalShow(true);
    const handleClose = () => setChartModalShow(false);

    React.useEffect(() => {
        getCoinById(coinId, selectedCurrency.name).then((data) => {
            setHistoryLog((prevState) => [
                ...prevState.filter((log) => log.id !== coinId),
                {
                    id: coinId,
                    name: data.name,
                },
            ]);
            setCoinData(data);
        });
    }, [selectedCurrency, coinId]);

    React.useEffect(() => {
        getHistoricalData({
            id: coinId,
            currency: selectedCurrency.name,
            start: selectedPeriod.start(),
            interval: selectedPeriod.interval,
        })
            .then((data) => {
                setHistoricalData(
                    data?.map(({ timestamp, ...rest }) => ({
                        ...rest,
                        timestamp: moment(timestamp).format(selectedPeriod.format),
                    }))
                );
            })
            .catch((error) =>
                dispatch(
                    setErrorMessage(
                        "Historical data is not avaible at the moment. Error: " +
                        error.toString()
                    )
                )
            );
    }, [selectedPeriod, selectedCurrency, coinId]);

    return (
        <>
            <CoinPriceSection />
            <Row>
                <Col md={4}>
                    <CoinMetrics {...coinData} currency={selectedCurrency} />
                    <Converter />
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
                            <Button onClick={handleShow} variant="primary">
                                Zoom
                            </Button>
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