import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
 
} from "@material-ui/core";
import axios from "axios";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from './Table';
import {sortData} from './utli';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    
    const allData = async () => {
      const data = await axios.get("https://disease.sh/v3/covid-19/all");
       setCountryInfo(data.data)
    }
    allData();
  },[])
  useEffect(() => {
    const getCountry = async () => {
      const getcountry = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      const countries = getcountry.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(getcountry.data);
      setTableData(sortedData)
      setCountries(countries);
    };
    getCountry();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const data = await axios.get(url);
    setCountry(countryCode);
    setCountryInfo(data.data);
  };
  // console.log(countryInfo);
  return (
    <div className="app">
      {/* header */}
      <div className="app__left">
        <div className="app__header">
          <h1>COVED-19 TRACKER</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem value={country.value} key={index}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* box  */}
          <InfoBox
            title="Coronavirus Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          {/* box  */}
          <InfoBox
            title="Recovered "
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />

          {/* box  */}
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>

        {/* map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          {/* graph */}
          <h3>WorldWide new cases</h3>
          <LineGraph
          center={mapCenter}
          zoom={mapZoom}

          />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
