import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Catalog from './Pages/Catalog'
import Parts from './Pages/Parts';
import axios from 'axios';

const baseURL = axios.create({ baseURL: 'localhost:5000/catalog' })

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a header</h1>
      </header>
      <Routes>
        <Route path='catalog'>
          <Route index element={<Catalog />} />
          <Route path='parts' element={<Parts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
