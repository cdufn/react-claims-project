import './App.css';
import PageHeader from './PageHeader/PageHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import SearchClaims from './SearchClaims/SearchClaims';
import OpenClaims from './Claims/OpenClaims';
import HomePage from './HomePage/HomePage';
import NewClaim from './NewClaim/NewClaim';
import ViewClaimToEdit from './ViewClaim/ViewClaimToEdit';
import EditNewClaim from './ViewClaim/EditNewClaim';
function App() {


  return (
    <BrowserRouter>
      <div className="App">

        <PageHeader />

        <Menu />

        <Routes>
          <Route path="/HomePage" element = {<HomePage />} />
          <Route path="/openClaims" element={<OpenClaims />} />
          <Route path="/searchClaims" element = {<SearchClaims />} />
          <Route path="/searchClaims/:policyNumber" element = {<SearchClaims />} />
          <Route path="/editNewClaim/:id" element = {<EditNewClaim />} />
          <Route path="/viewClaimToEdit/:id" element = {<ViewClaimToEdit />} />
          <Route path="/newClaims" element = {<NewClaim />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;