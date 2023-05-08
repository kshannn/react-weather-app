import { useContext } from "react";
import moment from "moment";
import { CURRENT_RESULT_TIME_FORMAT } from "../constants";
import WeatherContext from "../contexts/WeatherContext";
import { capitalize } from "lodash";

export const renderCountryDetails = (
  countryCode = "",
  country: string = ""
) => {
  return `${country && country}${country && countryCode && `, `} ${
    countryCode && countryCode
  }`;
};

export const WeatherResult = () => {
  const weatherContext = useContext(WeatherContext);
  const { weatherData = [], defaultDisplay }: any = weatherContext;
  const {
    country,
    countryCode,
    dateTime,
    description,
    humidity,
    temperature,
    icon,
    maxTemperature,
    minTemperature,
  } = weatherData;

  const formattedTime = moment(dateTime, "X").format(
    CURRENT_RESULT_TIME_FORMAT
  );

  return (
    <div id="resultWrapper">
      <h1>Today's Weather</h1>
      {defaultDisplay ? (
        <div className="resultOverlay">
          <div id="mainResult">
            <div id="weatherInformation">
              <span id="temperature">{temperature}°C</span>
              <div>
                H: {maxTemperature}°C L: {minTemperature}°C
              </div>
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
            <div title="country">{renderCountryDetails(countryCode, country)}</div>
            <div>{formattedTime}</div>
          </div>
        </div>
      ) : (
        <div className="resultOverlay noResult">No result to display</div>
      )}
    </div>
  );
};
