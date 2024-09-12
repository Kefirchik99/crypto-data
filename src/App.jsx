import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
import ListCoins from './ListCoins';
import CoinPage from './CoinPage';
import GlobalData from './GlobalData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResultsTbl from './SearchResultsTbl';

function App() {
  return (
    <Router>
      <Container>
        <Navigation />
        {/* <ListCoins /> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <GlobalData />
                <CoinPage />
              </>
            }
          />
          <Route path="/SearchResultsTbl" element={<SearchResultsTbl />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;