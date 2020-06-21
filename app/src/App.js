import React from 'react';
import './App.css';
import CardStack from './components/CardStack.js';

function App() {
  return (
    <>
      <header>
        <h1 id="logo" icon="🍴"><b>Meet</b>Your<b>Eat</b></h1>
      </header>
      <CardStack />
      <footer>
        <p>Swipe left to pass, swipe right to eat!</p>
      </footer>
    </>
  );
}

export default App;
