import logo from './allstatelogo.png';
import './App.css';
import PageHeader from './PageHeader/PageHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from 'react';

function App() {

  return (

    <div className="App">

    <PageHeader/>

        <nav class="navigations">
           
            <button onclick="newClaim()" id="newClaimBtn" type="button">New Claim</button>
            <a href="searchClaims.html">
                <button>Search Existing Claims</button>
            </a>
        </nav>

      
        <p>Welcomes to the Allstate Small Claims Sytem. Please make the relevant selection and input the required information</p>
        
      </div>
    
  );
}

export default App;
