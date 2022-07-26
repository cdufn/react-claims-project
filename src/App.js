import './App.css';
import PageHeader from './PageHeader/PageHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Footer/Footer';
import Menu from './Menu/Menu';
import SearchClaims from './SearchClaims/SearchClaims';
import OpenClaims from './Claims/OpenClaims';
import HomePage from './HomePage/HomePage';

function App() {

  return (

    <BrowserRouter>
      <div className="App">

        <PageHeader />

        <Menu />

        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/openClaims" element={<OpenClaims />} />
          <Route path="/searchClaims" element = {<SearchClaims />} />
          <Route path="/searchClaims/:policyNumber" element = {<SearchClaims />} />
          <Route path="/searchClaims" element = {<SearchClaims />} />
        </Routes>

      </div>

      <div>

        <Footer />


      </div>

    </BrowserRouter>

  );
}

export default App;