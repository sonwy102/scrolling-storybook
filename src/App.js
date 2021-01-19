import React from "react";
import './App.css';
import MapChart from './components/mapChart'
import RadarChart from './components/RadarChart'

function App() {
  const [mapData, setMapData] = React.useState({
    type: 'loading',
    objects: null,
    arcs: 'loading',
    bbox: 'loading',
    transform: 'loading'
  });

  console.log('mapData: ', mapData);

  const fetchJson = () => {
    console.log('fetching json')
    fetch("./data/world-happiness-dataset/countries-50m.json",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.json())
    .then((data) => {
      console.log("data from fetchJson: ", data);
      setMapData(data);
    })
    .catch(function(err) {
      console.log(err, ' error')});
  };

  React.useEffect(() => {
    console.log('calling useEffect')
    fetchJson();
  }, []);

  
  return (
    <div className="App">
      {/* <MapChart mapData={mapData}></MapChart> */}
      <RadarChart />
    </div>
  );
  
  
}

export default App;
