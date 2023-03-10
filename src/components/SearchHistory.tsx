import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export const SearchHistory = () => {
  const sampleHistory = [
    {
      query: "Singapore",
      queryTime: "3.14pm",
    },
    {
      query: "Malaysia",
      queryTime: "3.17pm",
    },
    {
      query: "Japan",
      queryTime: "4.20pm",
    },
  ];

  const renderHistory = () => {
    return sampleHistory.map(({ query, queryTime }, index) => {
      return (
        <div className="queryRow" key={index}>
          <div id="left">
            <div id="historyIndex">{index + 1}</div>
            <div id="query">{query}</div>
          </div>
          <div id="right">
            <div id="queryTime">{queryTime}</div>
            <div id="queryRecall">
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </div>
            <div id="historyDelete">
              <FontAwesomeIcon icon={faTrashCan as IconProp} />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="historyWrapper">
      <h1>SearchHistory</h1>
      {renderHistory()}
    </div>
  );
};
