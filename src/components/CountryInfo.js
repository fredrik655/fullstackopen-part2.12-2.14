import React from 'react';


const CountryInfo = props => {
    if(props.countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    else if (props.countries.length <= 10 && props.countries.length !== 1) {
      return props.countries.map(c => {
        return (
          <div key={c.numericCode + "d"}>
            <p key={c.numericCode}>{c.name}</p>
            <button key="button001" onClick={props.showCountry}>show</button>
          </div>
        );
    });
    }
    else if(props.countries.length === 1) {
      return (
        <div>
          <h2>{props.countries[0].name}</h2>
          <p>{`capital ${props.countries[0].capital}`  }</p>
          <h3>Languages</h3>
          <ul>
            {props.countries[0].languages.map(s => <li>{s.name}</li>)} 
          </ul>
          <img  src={props.countries[0].flag} alt="Country flag" style={{width: "100px", border: "1px solid black"}}/>
        </div>
      );
    }
    else {
      return null;
    }
}

export default CountryInfo;