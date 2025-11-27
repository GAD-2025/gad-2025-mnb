import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ServiceDescription from './components/ServiceDescription';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <ServiceDescription />
    </div>
  );
}

export default App;
