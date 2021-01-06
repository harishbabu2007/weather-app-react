import React, { useState, useEffect } from "react";
import "./App.css";
import CloseIcon from "@material-ui/icons/Close";
import { Converter } from "./utlis";

function App() {
  const [text, setText] = useState();
  const [apiData, setapiData] = useState(false);

  const inputChange = (event) => {
    setText(event.target.value);
  };

  const clearText = () => {
    setText("");
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=322c9ca1e007fa1cb48e0dd25f0c6e44`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setapiData(data);
          } else {
            setapiData(false);
          }
        });
    };
    fetchData();
  }, [text]);

  return (
    <div className="app">
      <header className="app__header">Weather App</header>
      <div className="app__input">
        <input type="text" onChange={inputChange} value={text} />
        <button onClick={clearText} className="app__cls_btn">
          <CloseIcon className="clear" />
        </button>
      </div>
      {!apiData ? (
        <div className="app__results">
          <h1>Type a City Name</h1>
        </div>
      ) : (
        <div className="app__results">
          <div className="app__location">
            <i class="fas fa-street-view pin"></i>
            <h1 className="location">{apiData.name}</h1>
          </div>
          <div className="app__info">
            <h1 className="weather">{apiData.weather[0].main}</h1>
            <h1 className="tempurature">
              {`${parseInt(Converter(apiData.main.temp))} °C`}
            </h1>
            <h1 className="feels">
              Feels Like {parseInt(Converter(apiData.main.feels_like))} °C
            </h1>
            <h3>
              Max {parseInt(Converter(apiData.main.temp_max))} °C | Min{" "}
              {parseInt(Converter(apiData.main.temp_min))} °C
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
