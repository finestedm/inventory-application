import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import NewPartModal from './components/NewPartModal';


axios.defaults.baseURL = 'http://localhost:5000/api/catalog'

interface IModalState {
  newPartModalOpen: boolean;
  newPartData: IPart | null;
}

const initialState: IModalState = {
  newPartModalOpen: false,
  newPartData: null,  
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setNewPartModalOpen: (state, action: PayloadAction<boolean>) => {
      state.newPartModalOpen = action.payload;
    },
    setNewPartData(state, action: PayloadAction<IPart>) {
      state.newPartData = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  newPartData: modalSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const { setNewPartModalOpen, setNewPartData } = modalSlice.actions;
export type RootState = ReturnType<typeof store.getState>

function App() {

  return (
    <div className="App" id='AppContainer'>
      <Provider store={store}>
        <TopBar />
        <BreadcrumbsComponent />
        <NewPartModal />
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
    </div>
  );
}

export default App;
