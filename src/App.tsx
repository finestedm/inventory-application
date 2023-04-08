import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Catalog from './Pages/Catalog'
import Parts, { IPart } from './Pages/Parts';
import Locations from './Pages/Locations'
import Inventories from './Pages/Inventories'
import Tags from './Pages/Tags';
import Splash from './Pages/Splash';
import Part from './Pages/Part';
import Location from './Pages/Location';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Tag from './Pages/Tag';
import TopBar from './components/TopBar';
import BreadcrumbsComponent from './components/Breadcrumbs';
import { configureStore, createSlice, combineReducers, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import NewPartModal from './components/PartEditModal';
import PartDeleteModal from './components/PartDeleteModal';
import { useEffect } from 'react';
import { theme } from './style'
import { ThemeProvider } from '@mui/material';


axios.defaults.baseURL = 'http://localhost:5000/api/catalog'

// Part Modal for new parts and editing existing - boilerplate

interface IModalState {
  partEditModalOpen: boolean;
  partDeleteModalOpen: boolean;
  partData: IPart;
}

const initialState: IModalState = {
  partEditModalOpen: false,
  partDeleteModalOpen: false,
  partData: {
    _id: '',
    name: '',
    price: 0,
    manufacturer: '',
    tags: []
  },
};


const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setPartEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.partEditModalOpen = action.payload;
      if (!action.payload) {
        // Dispatch resetPartDataDeep when partEditModalOpen is set to false
        state.partData = initialState.partData;
      }
    },
    setPartDeleteModalOpen: (state, action: PayloadAction<{ partDeleteModalOpen: boolean, partData?: IPart }>) => {
      state.partDeleteModalOpen = action.payload.partDeleteModalOpen;
      state.partData = action.payload.partData ? action.payload.partData : state.partData = initialState.partData
    },
    setPartData(state, action: PayloadAction<IPart>) {
      state.partData = action.payload;
    },
    resetPartDataDeep(state) {
      state.partData = initialState.partData;
    },
  },
});

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  partData: modalSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const { setPartEditModalOpen, setPartDeleteModalOpen, setPartData } = modalSlice.actions;
export type RootState = ReturnType<typeof store.getState>

// Part Modal for new parts and editing existing - boilerplate

function App() {
  const location = useLocation();
  const isSplashPage = location.pathname === '/';

  return (
    <div className="App" id='AppContainer'>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {!isSplashPage && <TopBar />}
          {!isSplashPage && <BreadcrumbsComponent />}
          <NewPartModal />
          <PartDeleteModal />
          <Routes>
            <Route path='/' element={<Splash />} />
            <Route path='catalog'>
              <Route index element={<Catalog />} />
              <Route path='parts' element={<Parts />} />
              <Route path='parts/:id' element={<Part />} />
              <Route path='locations' element={<Locations />} />
              <Route path='locations/:id' element={<Location />} />
              <Route path='tags' element={<Tags />} />
              <Route path='tags/:name' element={<Tag />} />
              <Route path='availability' element={<Inventories />} />
            </Route>
          </Routes>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
