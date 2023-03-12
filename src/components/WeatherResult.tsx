import React, { useContext } from "react";
import Sun from "../assets/sun.png";
import moment from "moment";
import { CURRENT_RESULT_TIME_FORMAT } from "../constants";
import WeatherContext from "../contexts/WeatherContext";
import {capitalize} from "lodash"

export const WeatherResult = () => {
  const weatherContext = useContext(WeatherContext);
  const { weatherData }: any = weatherContext;
  const { country, countryCode, dateTime, description, humidity, temperature } =
    weatherData;

  return (
    <div id="resultWrapper">
      <h1>Today's Weather</h1>
      <div id="resultOverlay">
        <div id="mainResult">
          <div id="weatherInformation">
            <span id="temperature">{temperature}°C</span>
            <div>{capitalize(description)}</div>
            <div>Humidity: {humidity}%</div>
          </div>
          <div id="weatherImageWrapper">
            <div id="weatherImage">
              <img src={Sun} alt="sun" id="sun" />
            </div>
          </div>
        </div>
        <div id="timeAndLocation">
          <div>{countryCode && country && `${countryCode}, ${country}`}</div>
          <div>{moment(dateTime, "X").format(CURRENT_RESULT_TIME_FORMAT)}</div>
        </div>
      </div>
    </div>
  );
};