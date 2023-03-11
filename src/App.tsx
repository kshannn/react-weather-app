import { useEffect, useState } from "react";
import "./App.css";
import { SearchFields } from "./components/SearchFields";
import { SearchHistory } from "./components/SearchHistory";
import { WeatherResult } from "./components/WeatherResult";
import { HTTP_STATUS } from "./constants";
import WeatherContext from "./contexts/WeatherContext";
import { fetchWeather } from "./service/weatherService";

export interface Weather {
  temperature: number;
  humidity: number;
  dateTime: number;
  country: string;
  countryCode: string;
  description: string;
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
  const [listOfSearchHistory, setListOfSearchHistory] = useState([]);

  // NOTE: set the first search results according to page load, consider using user's location
  // useEffect(()=>{
  //   const fetchDefaultWeather = async() => {
  //     const weatherResponse:any = await fetchWeather()
  //     if (weatherResponse.status === HTTP_STATUS.OK){
  //       const {country, description, dt, humidity,name, temp} = weatherResponse.data

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
    <WeatherContext.Provider
      value={{ listOfSearchHistory, setListOfSearchHistory, weatherData, setWeatherData }}
    >
      <div id="App">
        <div id="container">
          <SearchFields/>
          <WeatherResult/>
          <SearchHistory />
        </div>
      </div>
    </WeatherContext.Provider>
  );
};

export default App;
