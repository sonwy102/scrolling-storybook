import * as d3 from "d3";
import * as topojson from "topojson-client";
import React from 'react';
import countryDataCSV from "./test_map_data.csv";


// import {legend} from "@d3/color-legend"

const MapChart = () => {

  const ref = React.useRef();

  const rename = new Map([
    ["Antigua and Barbuda", "Antigua and Barb."],
    ["Bolivia (Plurinational State of)", "Bolivia"],
    ["Bosnia and Herzegovina", "Bosnia and Herz."],
    ["Brunei Darussalam", "Brunei"],
    ["Central African Republic", "Central African Rep."],
    ["Cook Islands", "Cook Is."],
    ["Democratic People's Republic of Korea", "North Korea"],
    ["Democratic Republic of the Congo", "Dem. Rep. Congo"],
    ["Dominican Republic", "Dominican Rep."],
    ["Equatorial Guinea", "Eq. Guinea"],
    ["Iran (Islamic Republic of)", "Iran"],
    ["Lao People's Democratic Republic", "Laos"],
    ["Marshall Islands", "Marshall Is."],
    ["Micronesia (Federated States of)", "Micronesia"],
    ["Republic of Korea", "South Korea"],
    ["Republic of Moldova", "Moldova"],
    ["Russian Federation", "Russia"],
    ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
    ["Saint Vincent and the Grenadines", "St. Vin. and Gren."],
    ["Sao Tome and Principe", "São Tomé and Principe"],
    ["Solomon Islands", "Solomon Is."],
    ["South Sudan", "S. Sudan"],
    ["Swaziland", "eSwatini"],
    ["Syrian Arab Republic", "Syria"],
    ["The former Yugoslav Republic of Macedonia", "Macedonia"],
    ["United Republic of Tanzania", "Tanzania"],
    ["Venezuela (Bolivarian Republic of)", "Venezuela"],
    ["Viet Nam", "Vietnam"],
  ]);


  const [mapData, setMapData] = React.useState({
    type: "loading",
    objects: null,
    arcs: "loading",
    bbox: "loading",
    transform: "loading",
  });
  const [countriesData, setData] = React.useState([]);

  console.log('mapData: ', mapData)
  console.log('countriesData: ', countriesData);

  const color = d3
    .scaleSequential()
    .domain(d3.extent(Array.from(countriesData.values())))
    .interpolator(d3.interpolateYlGnBu)
    .unknown("#ccc");
  const projection = d3.geoEqualEarth();
  const path = d3.geoPath(projection);
  const width = 975;
  const height = 475;
  const outline = { type: "Sphere" };

  const svg = d3
    .select(ref.current)
    .style("display", "block")
    .attr("viewBox", [0, 0, width, height]);

  const defs = svg.append("defs");

  const g = svg
    .append("g")
    .attr("clip-path", `url(${new URL("#clip", window.location)})`);

  

  const fetchJson = async () => {
    console.log("fetching json");
    return fetch("./data/world-happiness-dataset/countries-50m.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('Server response wasn\'t OK');
        }
      })
      .then((data) => {
        console.log(data)
        setMapData(data);
      })
  };

  const getData = async () => {

    d3.csv(countryDataCSV)
      .then((data) => {
        console.log('csv data: ', data)
        return new Map(data.map(i => [rename.get(i.country) || i.country, i.hale]))
      }).then(map => {
        setData(map)
      })
    
  }
  

  React.useEffect(() => {
    fetchJson();

    getData();
    
  }, []);

  if (mapData.objects && countriesData.size > 0) {
    defs.append("path").attr("id", "outline").attr("d", path(outline));
    defs
      .append("clipPath")
      .attr("id", "clip")
      .append("use")
      .attr("xlink:href", new URL("#outline", window.location));
    g.append("use")
      .attr("xlink:href", new URL("#outline", window.location))
      .attr("fill", "white");
    g.append("g")
      .selectAll("path")
      .data(topojson.feature(mapData, mapData.objects.countries).features)
      .join("path")
      .attr("fill", (d) => color(countriesData.get(d.properties.name)))
      .attr("d", path)
      .append("title")
      .text(
        (d) => `${d.properties.name}
        ${countriesData.has(d.properties.name) ? countriesData.get(d.properties.name) : "N/A"}`
      );
    g.append("path")
      .datum(topojson.mesh(mapData, mapData.objects.countries, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
    svg
      .append("use")
      .attr("xlink:href", new URL("#outline", window.location))
      .attr("fill", "none")
      .attr("stroke", "black");
  }
  
  
  
  return(
    <div className="mapChart">
      <svg ref={svg}></svg>
    </div>
  );
}

export default MapChart;
