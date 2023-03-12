import { useEffect, useState } from "react";
import { SearchFields } from "./components/SearchFields";
import { SearchHistory } from "./components/SearchHistory";
import { WeatherResult } from "./components/WeatherResult";
import { FETCH_DATA_FAIL_MESSAGE, HTTP_STATUS } from "./constants";
import WeatherContext from "./contexts/WeatherContext";
import { fetchWeather } from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export interface Weather {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  dateTime: number;
  country: string;
  countryCode: string;
  description: string;
  icon: string;
}

const App = () => {
  const [weatherData, setWeatherData] = useState<Weather>({
    temperature: 0,
    maxTemperature: 0,
    minTemperature: 0,
    humidity: 0,
    dateTime: 0,
    country: "",
    countryCode: "",
    description: "",
    icon: "",
  });
  const [listOfSearchHistory, setListOfSearchHistory] = useState([]);
  const [isPendingAction, setIsPendingAction] = useState(false);
  const [error, setError] = useState("");
  const [defaultDisplay, setDefaultDisplay] = useState(true);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      try {
        const weatherResponse: any = await fetchWeather();
        if (weatherResponse.status === HTTP_STATUS.OK) {
          const {
            country,
            description,
            dt,
            humidity,
            name,
            temp,
            icon,
            temp_max,
            temp_min,
          } = weatherResponse.data;

          setWeatherData({
            temperature: temp,
            maxTemperature: temp_max,
            minTemperature: temp_min,
            humidity,
            dateTime: dt,
            country: name,
            countryCode: country,
            description,
            icon,
          });
          setDefaultDisplay(true);
        } else {
          setError(weatherResponse?.data?.message || FETCH_DATA_FAIL_MESSAGE);
          setDefaultDisplay(false);
        }
      } catch (err) {
        setError(FETCH_DATA_FAIL_MESSAGE);
        setDefaultDisplay(false);
      }
    };
    fetchDefaultWeather();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        listOfSearchHistory,
        setListOfSearchHistory,
        weatherData,
        setWeatherData,
        setIsPendingAction,
        isPendingAction,
        error,
        setError,
        defaultDisplay,
        setDefaultDisplay,
      }}
    >
      <div id="App">
        <div id="container">
          <SearchFields />
          <WeatherResult />
          <SearchHistory />
        </div>
        <ToastContainer />
      </div>
    </WeatherContext.Provider>
  );
};

export default App;
