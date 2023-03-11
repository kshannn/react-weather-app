import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import WeatherContext from "../contexts/WeatherContext";
import { HTTP_STATUS, SEARCH_HISTORY_TIME_FORMAT } from "../constants";
import moment from "moment";
import { fetchWeather } from "../service/weatherService";

export const SearchHistory = () => {
  const weatherContext: any = useContext(WeatherContext);
  const { listOfSearchHistory, setListOfSearchHistory,setWeatherData } = weatherContext;

  useEffect(() => {
    const _searchHistoryList: any = localStorage.getItem("searchHistory");
    if (_searchHistoryList) {
      setListOfSearchHistory(JSON.parse(_searchHistoryList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearSearchHistory = (indexToDelete:number) => {
    const _updatedSearchHistory = listOfSearchHistory.filter((h:any, index:number)=>  index !== indexToDelete )
    localStorage.setItem('searchHistory', JSON.stringify(_updatedSearchHistory))
    setListOfSearchHistory(_updatedSearchHistory)
  }

  const recallSearchQuery = async(query:string) => {
    const weatherResponse:any = await fetchWeather(query)
    if (weatherResponse.status === HTTP_STATUS.OK){
      const {country, description, dt, humidity,name, temp} = weatherResponse.data


      setWeatherData({
        temperature: temp,
        humidity,
        dateTime: dt,
        country: name,
        countryCode: country,
        description,
      });
    }
  }

  const renderHistory = () => {
    if (listOfSearchHistory)
      return listOfSearchHistory.map(
        (
          {
            query,
            queryTime,
            countryCode,
          }: { query: string; queryTime: number; countryCode: string },
          index: number
        ) => {
          return (
            <div className="queryRow" key={index}>
              <div id="left">
                <div id="historyIndex">{index + 1}</div>
                <div id="query">
                  {countryCode}, {query}
                </div>
              </div>
              <div id="right">
                <div id="queryTime">
                  {moment(queryTime, "X").format(SEARCH_HISTORY_TIME_FORMAT)}
                </div>
                <div id="queryRecall">
                  <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} id="recall" onClick={()=>{
                    recallSearchQuery(query)
                  }}/>
                </div>
                <div id="historyDelete">
                  <FontAwesomeIcon icon={faTrashCan as IconProp} id="clearHistory" onClick={()=>{
                    clearSearchHistory(index)
                  }}/>
                </div>
              </div>
            </div>
          );
        }
      );
  };

  return (
    <div id="historyWrapper">
      <h1>Search History</h1>
      {renderHistory()}
    </div>
  );
};
