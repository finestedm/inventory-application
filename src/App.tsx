import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Catalog from './Pages/Catalog'
import Parts from './Pages/Parts';
import Locations from './Pages/Locations'
import Inventories from './Pages/Inventories'
import Tags from './Pages/Tags';
import Splash from './Pages/Splash';
import Part from './Pages/Part';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Tag from './Pages/Tag';
import TopBar from './components/TopBar';

axios.create({ baseURL: 'localhost:5000/catalog' })

function App() {

  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='catalog'>
          <Route index element={<Catalog />} />
          <Route path='parts' element={<Parts />} />
          <Route path='parts/:id' element={<Part />} />
          <Route path='locations' element={<Locations />} />
          <Route path='tags' element={<Tags />} />
          <Route path='tags/:name' element={<Tag />} />
          <Route path='availability' element={<Inventories />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
