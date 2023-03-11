import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchWeather } from "../service/weatherService";

export const SearchFields = ({ setWeatherData }: any) => {
  const [countryQuery, setCountryQuery] = useState("");

  const updateField = (e: any) => {
    setCountryQuery(e.target.value);
  };

  const searchQuery = async () => {
    try {
      const weatherResponse: any = await fetchWeather(countryQuery);
      if (weatherResponse.status === 200) {
        const {
          weather,
          main: { temp, humidity },
          dt,
          name,
          sys: { country },
        } = weatherResponse.data;
        const { description } = weather[0];

        setWeatherData({
          temperature: temp,
          humidity,
          dateTime: dt,
          country: name,
          countryCode: country,
          description,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearQuery = () => {
    setCountryQuery("");
  };

  return (
    <div id="searchWrapper">
      <div className="searchField">
        <input type="text" placeholder="city" id="city" />
      </div>
      <div className="searchField">
        <input
          type="text"
          placeholder="country"
          id="country"
          name="country"
          value={countryQuery}
          onChange={updateField}
        />
      </div>
      <div className="searchFieldIcons">
        <FontAwesomeIcon
          icon={faMagnifyingGlass as IconProp}
          id="search"
          onClick={searchQuery}
        />
      </div>

      <div className="searchFieldIcons">
        <FontAwesomeIcon
          icon={faXmark as IconProp}
          id="clear"
          onClick={clearQuery}
        />
      </div>
    </div>
  );
};
