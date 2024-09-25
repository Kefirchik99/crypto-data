import React from 'react';
import Table from 'react-bootstrap/Table';
import { getCoinList } from '../services/api';
import Alert from 'react-bootstrap/Alert';
import PriceNumber from './PriceNumber';
import { currencies } from '../constants';

function ListCoins({ selectedCurrency }) {
  const [coinList, setCoinList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Find the symbol corresponding to the selected currency
  const symbol = Object.entries(currencies).find(
    ([sym, currency]) => currency === selectedCurrency
  )?.[0];

  React.useEffect(() => {
    setIsLoading(true);
    getCoinList(selectedCurrency).then(data => {
      setCoinList(data.slice(0, 100));
      setIsLoading(false);
    });
  }, [selectedCurrency]);

  if (isLoading)
    return (
      <Alert key={"info"} variant={"info"}>
        Loading
      </Alert>
    );

  return (
    <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>1H</th>
          <th>24H</th>
          <th>7D</th>
          <th>30 Days</th>
          <th>Volume (24H)</th>
          <th>Marketcap</th>
        </tr>
      </thead>
      <tbody>
        {coinList.map(coin => (
          <tr key={coin.rank}>
            <td>{coin.rank}</td>
            <td>{coin.name}</td>
            <td>
              <PriceNumber
                value={coin.quotes[selectedCurrency]?.price}
                symbol={symbol}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </td>
            <td>
              <PriceNumber
                value={coin.quotes[selectedCurrency]?.percent_change_1h}
                suffix=" %"
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </td>
            <td>
              <PriceNumber
                value={coin.quotes[selectedCurrency]?.percent_change_24h}
                suffix=" %"
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </td>
            <td>
              <PriceNumber
                value={coin.quotes[selectedCurrency]?.percent_change_7d}
                suffix=" %"
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </td>
            <td>
              <PriceNumber
                value={coin.quotes[selectedCurrency]?.percent_change_30d}
                suffix=" %"
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </td>
            <td>
              <PriceNumber
                value={coin.quotes[selectedCurrency]?.volume_24h}
                symbol={symbol}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </td>
            <td>
              <PriceNumber
                value={coin.quotes[selectedCurrency]?.market_cap}
                symbol={symbol}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ListCoins;
