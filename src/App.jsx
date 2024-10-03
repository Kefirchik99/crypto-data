import './App.scss'
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import React from 'react';
import { currencies } from './constants';


function App() {

  return (
    <Container>
      <Header />
      <Body />
    </Container>
  );
}

export default App;
