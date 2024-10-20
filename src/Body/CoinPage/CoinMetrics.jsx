import Table from 'react-bootstrap/Table';
import '../../styles/CoinMetrics.scss'

function CoinMetrics({ name, symbol, quotes, currency, total_supply }) {
    return (
        <>
            <h3 className="coin-metrics-title">{name} ({symbol}) Metrics</h3>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>Market Cap</td>
                        <td>{quotes?.[currency.name]?.market_cap}</td>
                    </tr>
                    <tr>
                        <td>All Time High</td>
                        <td>{quotes?.[currency.name]?.ath_price}</td>
                    </tr>
                    <tr>
                        <td>Volume (24H)</td>
                        <td>{quotes?.[currency.name]?.volume_24h}</td>
                    </tr>
                    <tr>
                        <td>Vol change (24h)</td>
                        <td>{quotes?.[currency.name]?.volume_24h_change_24h}</td>
                    </tr>
                    <tr>
                        <td>Total supply</td>
                        <td>{total_supply}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default CoinMetrics;