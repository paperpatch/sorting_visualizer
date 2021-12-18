import React from 'react';
import styled from 'styled-components';
import { NavBar } from './components/NavBar'
import { Controller } from './components/Controller'
import { AlgoDisplay } from './components/AlgoDisplay';
import { Footer }from './components/Footer'

const Container = styled.div`
  margin: 0 10px;
  min-height: calc(100vh - 50px);
  position: relative;
  margin-bottom: 50px;
`;

function App() {
  return (
    <Container>
      <div className="App">
        <NavBar />
        <Controller />
        <AlgoDisplay/>
        <Footer />
      </div>
    </Container>
  );
}

export default App;
