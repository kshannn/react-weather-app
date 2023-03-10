import React from "react";
import Sun from "../assets/sun.png";

export const WeatherResult = () => {
  const sampleResult = {
    coord: {
      lon: 103.8501,
      lat: 1.2897,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04n",
      },
    ],
    base: "stations",
    main: {
      temp: 26.44,
      feels_like: 26.44,
      temp_min: 25.92,
      temp_max: 26.97,
      pressure: 1011,
      humidity: 84,
    },
    visibility: 10000,
    wind: {
      speed: 5.14,
      deg: 40,
    },
    clouds: {
      all: 75,
    },
    dt: 1678458464,
    sys: {
      type: 1,
      id: 9470,
      country: "SG",
      sunrise: 1678403534,
      sunset: 1678447087,
    },
    timezone: 28800,
    id: 1880252,
    name: "Singapore",
    cod: 200,
  };

  const {
    weather,
    main: { temp, humidity },
    dt,
    name,
    sys: { country },
  } = sampleResult;
  const { description } = weather[0];

  return (
    <div id="resultWrapper">
      <h1>Today's Weather</h1>
      <div id="mainResult">
        <div id="weatherInformation">
          <p id="temperature">{temp}°C</p>
          <div>{description}</div>
          <div>Humidity: {humidity}%</div>
        </div>
        <div id="weatherImageWrapper">
          <div id="weatherImage">
            <img src={Sun} alt="" id="sun" />
          </div>
        </div>
      </div>
      <div id="timeAndLocation">
        <div>
          {name},{country}
        </div>
        <div>{dt}</div>
      </div>
    </div>
  );
};
