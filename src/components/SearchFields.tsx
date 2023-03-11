import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { fetchWeather } from "../service/weatherService";
import WeatherContext from "../contexts/WeatherContext";
import { HTTP_STATUS } from "../constants";

export const SearchFields = () => {
  const [cityQuery, setCityQuery] = useState("");
  const [error, setError] = useState("");
  const weatherContext: any = useContext(WeatherContext);
  const {
    listOfSearchHistory,
    setListOfSearchHistory,
    setWeatherData,
    isPendingAction,
    setIsPendingAction,
  } = weatherContext;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isPendingAction) {
      toast.loading("Fetching data...", { toastId: "fetchToast" });
    } else {
      toast.dismiss("fetchToast");
    }
  }, [isPendingAction]);

  const updateField = (e: any) => {
    setCityQuery(e.target.value);
  };

  const addToSearchHistory = (body: {
    query: string;
    queryTime: number;
    countryCode: string;
  }) => {
    const updatedSearchHistory = [
      ...listOfSearchHistory,
      {
        query: body.query,
        queryTime: body.queryTime,
        countryCode: body.countryCode,
      },
    ];
    setListOfSearchHistory(updatedSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
  };

  const searchQuery = async () => {
    setError("");
    if (!cityQuery) return;
    setIsPendingAction(true);
    try {
      const weatherResponse: any = await fetchWeather(cityQuery);
      if (weatherResponse.status === HTTP_STATUS.OK) {
        const { country, description, dt, humidity, name, temp } =
          weatherResponse.data;

        setWeatherData({
          temperature: temp,
          humidity,
          dateTime: dt,
          country: name,
          countryCode: country,
          description,
        });

        addToSearchHistory({
          query: name,
          queryTime: dt,
          countryCode: country,
        });
      } else {
        setError(weatherResponse.data.message);
      }
    } catch (err) {
      console.log(err);
    }
    setIsPendingAction(false);

  };

  const clearQuery = () => {
    setCityQuery("");
  };

  return (
    <div id="searchWrapper">
      <div className="searchField">
        <input type="text" placeholder="Country" id="country" />
      </div>
      <div className="searchField">
        <input
          type="text"
          placeholder="City"
          id="city"
          name="city"
          value={cityQuery}
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
