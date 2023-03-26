import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import WeatherContext from "../contexts/WeatherContext";
import {
  FETCH_DATA_FAIL_MESSAGE,
  HTTP_STATUS,
  NUM_OF_ITEMS_PER_PAGE,
  SEARCH_HISTORY_TIME_FORMAT,
} from "../constants";
import moment from "moment";
import { fetchWeather } from "../services/weatherService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { renderCountryDetails } from "./WeatherResult";

export const SearchHistory = () => {
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
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const _searchHistoryList: any = localStorage.getItem("searchHistory");
    if (_searchHistoryList) {
      setListOfSearchHistory(JSON.parse(_searchHistoryList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPendingAction) {
      toast.loading("Fetching data...", { toastId: "fetchToast" });
    } else {
      toast.dismiss("fetchToast");
    }
  }, [isPendingAction]);

  const clearSearchHistory = (indexToDelete: number) => {
    const _updatedSearchHistory = listOfSearchHistory.filter(
      (h: any, index: number) => index !== indexToDelete
    );
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(_updatedSearchHistory)
    );
    setListOfSearchHistory(_updatedSearchHistory);
  };

  const recallSearchQuery = async (city: string, country: string) => {
    setIsPendingAction(true);

    try {
      const weatherResponse: any = await fetchWeather({
        city: city,
        country: country,
        isCountryCode: true,
      });

      if (weatherResponse.status === HTTP_STATUS.OK) {
        const {
          country: countryCode,
          description,
          dt: dateTime,
          humidity,
          name: country,
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
          dateTime,
          country,
          countryCode,
          description,
          icon,
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

  const renderHistory = () => {
    const offset = currentPage * NUM_OF_ITEMS_PER_PAGE;
    const currentPageHistory = listOfSearchHistory.slice(
      offset,
      offset + NUM_OF_ITEMS_PER_PAGE
    );

    if (currentPageHistory.length) {
      return currentPageHistory.map(
        (
          {
            query,
            queryTime,
            countryCode,
          }: { query: string; queryTime: number; countryCode: string },
          index: number
        ) => {
          const currentIndex = index + offset;
          const formattedSearchHistoryTime = moment(queryTime, "X").format(
            SEARCH_HISTORY_TIME_FORMAT
          );

          return (
            <div className="queryRow" key={currentIndex}>
              <div className="left">
                <div id="historyIndex">{currentIndex + 1}</div>
              </div>
              <div className="middle">
                <div id="query">{renderCountryDetails(countryCode, query)}</div>
                <div id="queryTime">{formattedSearchHistoryTime}</div>
              </div>
              <div className="right">
                <div id="queryRecall">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass as IconProp}
                    id="recall"
                    onClick={() => {
                      recallSearchQuery(query, countryCode);
                    }}
                  />
                </div>
                <div id="historyDelete">
                  <FontAwesomeIcon
                    icon={faTrashCan as IconProp}
                    id="clearHistory"
                    onClick={() => {
                      clearSearchHistory(currentIndex);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        }
      );
    } else {
      return <div className="queryRow">No Record</div>;
    }
  };

  return (
    <div id="historyWrapper">
      <h1>Search History</h1>

      {renderHistory()}

      <ReactPaginate
        pageCount={Math.ceil(
          listOfSearchHistory.length / NUM_OF_ITEMS_PER_PAGE
        )}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        renderOnZeroPageCount={() => {}}
      />
    </div>
  );
};
