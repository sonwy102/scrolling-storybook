import React from "react";
import './App.css';
import MapChart from './components/mapChart'

function App() {
  const [mapData, setMapData] = React.useState({
    type: 'loading',
    objects: 'loading',
    arcs: 'loading',
    bbox: 'loading',
    transform: 'loading'
  });

  console.log('mapData: ', mapData);

  const fetchJson = () => {
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
    fetchJson();
  }, []);

  return (
    <div className="App">
      <MapChart mapData={mapData}></MapChart>
    </div>
  );
}

export default App;
