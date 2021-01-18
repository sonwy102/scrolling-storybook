import * as d3 from "d3";
import * as topojson from "topojson-client";
import Papa from 'papaparse';

// import {legend} from "@d3/color-legend"

const MapChart = (props) => {
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

  // const data = Object.assign(new Map(d3.csvParse(FileAttachment("test_map_data.csv").text(), ({country, hale}) =>
  // [rename.get(country) || country, +hale])), {title: "Healthy life expectancy (years)"})

  console.log(props);

  const fetchCsv = async () => {
    const response = await fetch(
      "data/world-happiness-dataset/test_map_data.csv"
    );
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result.value);

    return csv;
  };

  const getData = async () => {
    const data = Papa.parse(await fetchCsv());
    console.log(data)
    return data;
  }

  

  const data = getData();
  const countriesData = new Map(data.data);
   
  
  

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

  const countries_var = topojson.feature(props, props.objects.countries);
}

export default MapChart;
