import React from "react";
import './App.css';
import MapChart from './components/mapChart'
import RadarChart from './components/RadarChart'

function App() {
  
  return (
    <div className="App">
      <MapChart></MapChart>
      <RadarChart />
    </div>
  );
}

export default App;
