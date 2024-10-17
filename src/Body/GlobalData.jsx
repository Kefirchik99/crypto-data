import React from "react";
import Table from "react-bootstrap/Table";
import { getGlobalData } from "../services/api";
import { BodyContext } from "../providers/BodyProvider";
import "../styles/GlobalData.scss"

function GlobalData() {

    const [globalData, setGlobalData] = React.useState({});

    const { exchangeList } = React.useContext(BodyContext);

    React.useEffect(() => {
        getGlobalData().then(setGlobalData);
    }, []);

    return (
        <Table className="global-data-table">

            <tbody>
                <tr>
                    <td colSpan="2"><h3>Bitcoin data</h3></td>
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
        </Table >
    );
}

export default GlobalData;