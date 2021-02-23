import React from 'react';


const WeatherInfo = props => {
    if(props.countries.length === 1) {
      return (
        <div>
          <h3>{`Weather in ${props.countries[0].capital}`}</h3> 
          <p><strong>Temperature: </strong>{`${props.weatherData.temp} Celsius`}</p> 
          <img src={props.weatherData.img} alt="weather" style={{border: "1px solid black"}}/>
          <p><strong>Wind: </strong>{`${props.weatherData.wind} mph direction ${props.weatherData.wind_dir}`}</p> 
        </div>
      );
    }
    else  {
      return null;
    }
};

export default WeatherInfo;