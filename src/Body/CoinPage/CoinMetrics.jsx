import React from 'react';
import Table from 'react-bootstrap/Table';
import PriceNumber from '../PriceNumber';
import { currencies } from '../../constants';

function CoinMetrics({ coinData, selectedCurrency }) {
    if (!coinData) {
        return <div>Loading metrics...</div>;
    }

    const {
        name,
        symbol,
        quotes,
    } = coinData;

    // Extract quote for selectedCurrency
    const currencyQuote = quotes && quotes[selectedCurrency];
    const marketCap = currencyQuote?.market_cap;
    const volume24h = currencyQuote?.volume_24h;
    const athPrice = currencyQuote?.ath_price;
    const percentChange30d = currencyQuote?.percent_change_30d;
    const volToMarketCap =
        volume24h && marketCap && marketCap !== 0
            ? (volume24h / marketCap).toFixed(2)
            : 'N/A';

    // Get the currency symbol
    const symbolEntry = Object.entries(currencies).find(
        ([sym, currency]) => currency === selectedCurrency
    );
    const currencySymbol = symbolEntry ? symbolEntry[0] : '';

    return (
        <>
            <h3>{name} ({symbol}) Metrics</h3>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>Market Cap</td>
                        <td>
                            {typeof marketCap === 'number'
                                ? <PriceNumber value={marketCap} symbol={currencySymbol} decimalScale={2} />
                                : 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td>All Time High</td>
                        <td>
                            {typeof athPrice === 'number'
                                ? <PriceNumber value={athPrice} symbol={currencySymbol} decimalScale={2} />
                                : 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td>Volume (24H)</td>
                        <td>
                            {typeof volume24h === 'number'
                                ? <PriceNumber value={volume24h} symbol={currencySymbol} decimalScale={2} />
                                : 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td>Vol / M Cap (24h)</td>
                        <td>{volToMarketCap}</td>
                    </tr>
                    <tr>
                        <td>Percent Change (30d)</td>
                        <td>
                            {typeof percentChange30d === 'number'
                                ? <PriceNumber value={percentChange30d} suffix=" %" decimalScale={2} />
                                : 'N/A'}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default CoinMetrics;
