import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchFields } from "./components/SearchFields";
import { SearchHistory } from "./components/SearchHistory";
import { WeatherResult } from "./components/WeatherResult";
import { fetchWeather } from "./service/weatherService";

export interface Weather {
  temperature: number, 
  humidity: number,
  dateTime: number,
  country: string,
  countryCode: string,
  description: string,
}

const App = () => {
  const [weatherData, setWeatherData] = useState<Weather>({
    temperature: 0,
    humidity: 0,
    dateTime: 0,
    country: "",
    countryCode: "",
    description: "",
  });

  // NOTE: set the first search results according to page load, consider using user's location
  // useEffect(()=>{
  //   const fetchDefaultWeather = async() => {
  //     const weatherResponse:any = await fetchWeather()
  //     if (weatherResponse.status === 200){
  //       const {
  //         weather,
  //         main: { temp, humidity },
  //         dt,
  //         name,
  //         sys: { country },
  //       } = weatherResponse.data;
  //       const { description } = weather[0];
  //       setWeatherData({
  //         temperature: temp,
  //         humidity,
  //         dateTime:dt,
  //         country:name,
  //         countryCode:country,
  //         description
  
  //       })
  //     }
  //   }
  //   fetchDefaultWeather()
  // },[])

  return (
    <div id="App">
      <div id="container">
        <SearchFields setWeatherData={setWeatherData} />
        <WeatherResult weatherData={weatherData} />
        <SearchHistory />
      </div>
    </div>
  );
};

export default App;
