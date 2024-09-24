import './App.scss'
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import React from 'react';
import { currencies } from './constants';

function App() {
  const [selectedCurrency, setSelectedCurrency] = React.useState(currencies[0]);

  return (
    <Container>
      <Header
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
      <Body selectedCurrency={selectedCurrency} />
    </Container>
  );
}

export default App;
