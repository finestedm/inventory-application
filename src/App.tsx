import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Catalog from './Pages/Catalog'
import Parts from './Pages/Parts';


function App() {
  console.log(`${window.location.origin}${window.location.pathname}`)

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a header</h1>
      </header>
      <Routes>
        <Route path='catalog' element={<Catalog />} />
        <Route path='catalog/parts' element={<Parts />} />
      </Routes>
    </div>
  );
}

export default App;
