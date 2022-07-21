import logo from './allstatelogo.png';
import './App.css';
import PageHeader from './PageHeader/PageHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchClaims from './SearchClaims/SearchClaims';

import { useState } from 'react';

function App() {

  return (

    <BrowserRouter>
    <div className="App">

    <PageHeader/>
      
        <Routes>
          <Route path="/searchClaims" element={<SearchClaims />} />
         
        </Routes>
      </div>

      </BrowserRouter>
    
  );
}

export default App;