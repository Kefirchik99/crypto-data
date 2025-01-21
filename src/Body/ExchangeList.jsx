// ExchangeList.jsx
import React from 'react';
import Table from 'react-bootstrap/Table';
import { BodyContext } from '../providers/BodyProvider';
import '../styles/ExchangeList.scss'; 

function ExchangeList() {
    const { exchangeList } = React.useContext(BodyContext);

    if (!exchangeList || exchangeList.length === 0) {
        return <p>Loading exchanges...</p>;
    }

    return (
        <div className="exchange-list">
            <Table className='exchange-table' striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Website</th>
                        <th>Currencies</th>
                        <th>Markets</th>
                    </tr>
                </thead>
                <tbody>
                    {exchangeList.slice(0, 50).map((exchange) => {
                        const rank = exchange.adjusted_rank ?? 'N/A';
                        const name = exchange.name ?? 'N/A';
                        const currencies = exchange.currencies ?? 'N/A';
                        const markets = exchange.markets ?? 'N/A';
                        const websiteLinks = exchange.links?.website ?? [];

                        return (
                            <tr key={exchange.id}>
                                <td>{rank}</td>
                                <td>{name}</td>
                                <td>
                                    {websiteLinks.length > 0 ? (
                                        <a href={websiteLinks[0]} target="_blank" rel="noopener noreferrer">
                                            {websiteLinks[0]}
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td>{currencies}</td>
                                <td>{markets}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ExchangeList;
