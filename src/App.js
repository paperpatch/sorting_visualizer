import React from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar'
import Controller from './'
import Main from './components/Main';
import Footer from './'

import './App.css';

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
        <Main/>
        <Footer />
      </div>
    </Container>
  );
}

export default App;
