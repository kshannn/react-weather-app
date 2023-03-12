import { useContext } from "react";
import moment from "moment";
import { CURRENT_RESULT_TIME_FORMAT } from "../constants";
import WeatherContext from "../contexts/WeatherContext";
import { capitalize } from "lodash";

export const WeatherResult = () => {
  const weatherContext = useContext(WeatherContext);
  const { weatherData }: any = weatherContext;
  const {
    country,
    countryCode,
    dateTime,
    description,
    humidity,
    temperature,
    icon,
    maxTemperature,
    minTemperature
  } = weatherData;

  return (
    <div id="resultWrapper">
      <h1>Today's Weather</h1>
      <div id="resultOverlay">
        <div id="mainResult">
          <div id="weatherInformation">
            <span id="temperature">{temperature}°C</span>
            <div>H: {maxTemperature}°C L: {minTemperature}°C</div>
            <div>Humidity: {humidity}%</div>
            <div>{capitalize(description)}</div>
          </div>
          <div id="weatherImageWrapper">
            <div id="weatherImage">
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather"
                id="weatherIcon"
              />
            </div>
          </div>
        </div>
        <div id="timeAndLocation">
          <div>{countryCode && country && `${country}, ${countryCode}`}</div>
          <div>{moment(dateTime, "X").format(CURRENT_RESULT_TIME_FORMAT)}</div>
        </div>
      </div>
    </div>
  );
};
