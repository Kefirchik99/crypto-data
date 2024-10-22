import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/Top3Coins.scss'

function Top3Coins() {
    const [topCoins, setTopCoins] = useState([]);

    useEffect(() => {
        fetch('https://api.coinpaprika.com/v1/tickers?limit=3')
            .then((response) => response.json())
            .then((data) => {
                const sortedData = data.sort(
                    (a, b) => b.quotes.USD.market_cap - a.quotes.USD.market_cap
                );
                setTopCoins(sortedData.slice(0, 3));
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="top-cryptos-container">
            <Table className="global-data-table table table-striped table-bordered table-hover">
                <tbody>
                    <tr>
                        <td colSpan="2">
                            <h3>Top 3 coins by Market Cap</h3>
                        </td>
                    </tr>

                    {topCoins.map((coin) => (
                        <tr key={coin.id}>
                            <td>{coin.name}</td>
                            <td>
                                <div>Market Cap: ${coin.quotes.USD.market_cap.toLocaleString()}</div>
                                <div>Price: ${coin.quotes.USD.price.toFixed(2)}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Top3Coins;
