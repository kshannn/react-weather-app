import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { fetchWeather } from "../service/weatherService";
import WeatherContext from "../contexts/WeatherContext";
import { HTTP_STATUS } from "../constants";

interface Query {
  country: string;
  city: string;
}

export const SearchFields = () => {
  const [query, setQuery] = useState<Query>({
    country: "",
    city: "",
  });
  // const [cityQuery, setCityQuery] = useState("");
  // const [countryQuery, setCountryQuery] = useState("");
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
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
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
