import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Catalog from './Pages/Catalog'
import Parts from './Pages/Parts';
import Locations from './Pages/Locations'
import { IPart, ILocation, OpeningHours } from './components/interfaces';
import Inventories from './Pages/Inventories'
import Tags from './Pages/Tags';
import Splash from './Pages/Splash';
import Part from './Pages/Part';
import Location from './Pages/Location';
import axios from 'axios';
import Tag from './Pages/Tag';
import TopBar from './components/TopBar';
import BreadcrumbsComponent from './components/Breadcrumbs';
import { Provider } from "react-redux";
import PartEditModal from './components/Modals/PartEditModal';
import PartDeleteModal from './components/Modals/PartDeleteModal';
import { store } from './features/modalSlide'
import LocationEditModal from './components/Modals/LocationEditModal';
import LocationDeleteModal from './components/Modals/LocationDeleteModal';
import LocationOpenHoursEditModal from './components/Modals/LocationOpenHoursEditModal';
import TagEditModal from './components/Modals/TagEditModal';
import Footer from './components/Footer';


axios.defaults.baseURL = 'http://localhost:5000/api/catalog'

function App() {
  const location = useLocation();
  const isSplashPage = location.pathname === '/';

  return (
    <div className="App" id='AppContainer'>
      <Provider store={store}>
        {!isSplashPage && <TopBar />}
        {!isSplashPage && <BreadcrumbsComponent />}
        <PartEditModal />
        <PartDeleteModal />
        <LocationEditModal />
        <LocationDeleteModal />
        <LocationOpenHoursEditModal />
        <TagEditModal />
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
        {!isSplashPage && <Footer />}
      </Provider>
    </div>
  );
}

export default App;
