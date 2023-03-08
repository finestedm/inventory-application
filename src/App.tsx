import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Catalog from './components/Catalog'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a header</h1>
      </header>
      <Routes>
        <Route path='/catalog' element={<Catalog />} />
        {/* <Route path='/part:id' element={<Part />} /> */}
      </Routes>
    </div>
  );
}

export default App;
