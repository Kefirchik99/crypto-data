import React from 'react';
import Table from 'react-bootstrap/Table';
import { getCoinList } from '../services/api';
import { getGlobalData } from '../services/api';


function ListCoins() {
  const [coinList, setCoinList] = React.useState([]);
  const [globalData, setGlobalData] = React.useState({});

  React.useEffect(() => {
    getCoinList().then(data => {
      setCoinList(data.slice(0, 100));
    });
  }, []);

  React.useEffect(() => {
    getGlobalData().then(data => {
      setGlobalData(data);
    });
  }, []);

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
          <th>Volume (24H)</th>
          <th>Liquidity</th>
          <th>Marketcap</th>
        </tr>
      </thead>
      <tbody>
        {coinList.map(coin => (
          <tr key={coin.rank}>
            <td>{coin.rank}</td>
            <td>{coin.name}</td>
            <td></td>
            <td></td>
            <td>{globalData.volume_24h_ath_value}</td>
            <td></td>
            <td>{globalData.volume_24h_change_24h}</td>
            <td></td>
            <td>{globalData.market_cap_ath_value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListCoins;