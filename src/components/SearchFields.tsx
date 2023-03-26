import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { fetchWeather } from "../services/weatherService";
import WeatherContext from "../contexts/WeatherContext";
import { FETCH_DATA_FAIL_MESSAGE, HTTP_STATUS } from "../constants";

interface Query {
  country: string;
  city: string;
}

export const SearchFields = () => {
  const [query, setQuery] = useState<Query>({
    country: "",
    city: "",
  });
  const weatherContext: any = useContext(WeatherContext);
  const {
    listOfSearchHistory,
    setListOfSearchHistory,
    setWeatherData,
    isPendingAction,
    setIsPendingAction,
    setError,
    setDefaultDisplay,
  } = weatherContext;

  useEffect(() => {
    if (isPendingAction) {
      toast.loading("Fetching data...", { toastId: "fetchToast" });
    } else {
      toast.dismiss("fetchToast");
    }
  }, [isPendingAction]);

  const updateField = (e: any) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const addToSearchHistory = ({
    query,
    queryTime,
    countryCode,
  }: {
    query: string;
    queryTime: number;
    countryCode: string;
  }) => {
    const updatedSearchHistory = [
      {
        query,
        queryTime,
        countryCode,
      },
      ...listOfSearchHistory,
    ];
    setListOfSearchHistory(updatedSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
  };

  const searchQuery = async () => {
    setError("");
    if ((!query.city && !query.country) || !query.city) {
      toast.error("Please enter a valid city name");
      return;
    }
    setIsPendingAction(true);
    try {
      const weatherResponse: any = await fetchWeather({
        city: query.city,
        country: query.country,
        isCountryCode: false,
      });
      if (weatherResponse.status === HTTP_STATUS.OK) {
        const {
          country,
          description,
          dt,
          humidity,
          name,
          temp: temperature,
          icon,
          temp_max: maxTemperature,
          temp_min: minTemperature,
        } = weatherResponse.data;

        setWeatherData({
          temperature,
          maxTemperature,
          minTemperature,
          humidity,
          dateTime: dt,
          country: name,
          countryCode: country,
          description,
          icon,
        });

        addToSearchHistory({
          query: name,
          queryTime: dt,
          countryCode: country,
        });
        setDefaultDisplay(true);
      } else {
        setError(weatherResponse?.data?.message || FETCH_DATA_FAIL_MESSAGE);
      }
    } catch (err) {
      setError(FETCH_DATA_FAIL_MESSAGE);
    }
    setIsPendingAction(false);
  };

  const clearQuery = () => {
    setQuery({ city: "", country: "" });
  };

  return (
    <div id="searchWrapper">
      <div className="searchField">
        <input
          type="text"
          placeholder="Country"
          id="country"
          name="country"
          value={query.country}
          onChange={updateField}
        />
      </div>
      <div className="searchField">
        <input
          type="text"
          placeholder="City"
          id="city"
          name="city"
          value={query.city}
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
