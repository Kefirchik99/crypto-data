import React from 'react';
import Table from 'react-bootstrap/Table';
import { getCoinList } from '../services/api';

function ListCoins() {
  const { coinList, setCoinList } = React.useState([]);
  React.useEffect(() => {
    getCoinList().then((data) => {
      setCoinList(data.slice(0, 100));
    })
  }, []);

  return (
    <Table striped bordered hover >
      <thead>
        <tr key={coin.rank}>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>1H</th>
          <th>24H</th>
          <th>7D</th>
          <th>Volume (24H)</th>
          <th>Liquidity</th>
          <th>Marketcap</th>
        </tr>
      </thead>
      <tbody>
        {coinList.map(coin => (
          <tr>
            <td>{coin.rank}</td>
            <td>{coin.name}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ListCoins;