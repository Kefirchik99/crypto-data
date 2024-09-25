import React from 'react';
import Table from 'react-bootstrap/Table';
import { getGlobalData } from '../services/api';
import PriceNumber from './PriceNumber';

function GlobalData() {
    const [globalData, setGlobalData] = React.useState([]);

    React.useEffect(() => {
        getGlobalData().then(setGlobalData);
    }, []);

    return (
        <Table >
            <tbody>
                <tr>
                    <td>BTC Dominance:</td>
                    <td>{globalData.bitcoin_dominance_percentage} %</td>
                </tr>
                <tr>
                    <td>Vol 24h:</td>
                    <td><PriceNumber value={globalData.volume_24h_usd} $ /></td>
                </tr>
                <tr>
                    <td>Market Cap:</td>
                    <td><PriceNumber value={globalData.market_cap_usd} $ /></td>
                </tr>
            </tbody>
        </Table>
    );
};

export default GlobalData;