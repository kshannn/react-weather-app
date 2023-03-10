import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

export const SearchFields = () => {
  return (
    <div id="searchWrapper">
      <div className="searchField">
        <input type="text" placeholder="city" id="city" />
      </div>
      <div className="searchField">
        <input type="text" placeholder="country" id="country" />
      </div>
      <div className="searchFieldIcons">
        <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} id="search" />
      </div>

      <div className="searchFieldIcons">
        <FontAwesomeIcon icon={faXmark as IconProp} id="clear" />
      </div>
    </div>
  );
};
