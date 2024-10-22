import React from "react";
import { getGlobalData } from "../services/api";
import { BodyContext } from "../providers/BodyProvider";
import Converter from "../Body/CoinPage/Converter";
import Table from 'react-bootstrap/Table';
import "../styles/GlobalData.scss";
import "../styles/Converter.scss";
import Top3Coins from "./Top3Coins";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function GlobalData() {
    const [globalData, setGlobalData] = React.useState({});
    const { exchangeList } = React.useContext(BodyContext);

    React.useEffect(() => {
        getGlobalData().then(setGlobalData);
    }, []);

    return (
        <div className="global-converter-container">
            <Row className="mb-3">
                <Col md={4} className="global-data">
                    <Table className="global-data-table table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <h3>Bitcoin data</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>BTC Dominance</td>
                                <td>{globalData.bitcoin_dominance_percentage} %</td>
                            </tr>
                            <tr>
                                <td>Vol 24h</td>
                                <td>{globalData.volume_24h_usd}</td>
                            </tr>
                            <tr>
                                <td>Market Cap</td>
                                <td>{globalData.market_cap_usd}</td>
                            </tr>
                            <tr>
                                <td>Exchanges count</td>
                                <td>{exchangeList.length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>

                <Col md={4}>
                    <Top3Coins />
                </Col>

                <Col md={4}>
                    <Converter />
                </Col>
            </Row>
        </div>
    );
}

export default GlobalData;