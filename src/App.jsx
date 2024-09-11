import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
import ListCoins from './ListCoins';
import CoinPage from './CoinPage';

function App() {
  return (
    <Container>
      <Navigation />
      <ListCoins />
      <CoinPage />
    </Container>
  );
}

export default App;
