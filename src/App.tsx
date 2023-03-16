import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Catalog from './Pages/Catalog'
import Parts from './Pages/Parts';
import Locations from './Pages/Locations'
import Inventories from './Pages/Inventories'
import Tags from './Pages/Tags';
import axios from 'axios';

axios.create({ baseURL: 'localhost:5000/catalog' })

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
          <Route path='locations' element={<Locations />} />
          <Route path='tags' element={<Tags />} />
          <Route path='availability' element={<Inventories />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
