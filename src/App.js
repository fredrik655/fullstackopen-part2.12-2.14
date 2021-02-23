import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CountryInfo from './components/CountryInfo';
import WeatherInfo from './components/WeatherInfo';

function App() {
  const [countries, setCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [countryFound, setCountryFound] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountryData, setSelectedCountryData] = useState({
    temp: "",
    img: "",
    wind: "",
    wind_dir: "",
  });

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data);
    })
  },[]);

  useEffect(() => {
    if(countryFound) {
      setCountryFound(false);
      axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${filteredCountries[0].capital}`)
      .then(response => {
        console.log(response.data);
        const objectData = {
          temp: response.data.current.temperature,
          img: response.data.current.weather_icons[0],
          wind: response.data.current.wind_speed,
          wind_dir: response.data.current.wind_dir,
        };
        setSelectedCountryData(objectData);
      })
      .catch(error => {
        console.warn(error);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[countryFound]);

  useEffect(() => {
    console.table(selectedCountryData);
  },[selectedCountryData]);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(c => {
        return (inputText !== '' ) ? c.name.toLowerCase().includes(inputText) : false;
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inputText]);

  useEffect(() => {
    if(filteredCountries.length === 1 && countryFound === false) {
      setCountryFound(true);
    }
    else {
      setCountryFound(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filteredCountries]);

  const handleInput = event => {
    setInputText(event.target.value);
  }

  const showCountry = event => {
    setInputText(event.target.parentNode.firstChild.textContent.toLowerCase());
  }

  const displayData = () => {
        return (
          <div>
            <CountryInfo countries={filteredCountries} showCountry={showCountry}/>
            <WeatherInfo countries={filteredCountries} weatherData={selectedCountryData}/>
          </div>
        );
  }

  return (
    <div>
      <form >
        find countries <input value={inputText} onChange={handleInput}/>
      </form>
      {displayData()}
    </div>
  );
}

export default App;
