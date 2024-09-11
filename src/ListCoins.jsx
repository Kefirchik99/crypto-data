import Table from 'react-bootstrap/Table';

function ListCoins() {
  return (
    <Table striped bordered hover variant="dark">
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
      </tbody>
    </Table>
  );
}

export default ListCoins;