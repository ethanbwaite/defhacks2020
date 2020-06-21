import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Login from './components/Login.js';
import CardsPage from './CardsPage.js';

import './App.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" component={CardsPage} />
      </Switch>
    </Router>
  );

}

export default App;
