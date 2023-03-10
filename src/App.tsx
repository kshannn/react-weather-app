import React from "react";
import "./App.css";
import { SearchFields } from "./components/SearchFields";
import { SearchHistory } from "./components/SearchHistory";
import { WeatherResult } from "./components/WeatherResult";

function App() {
  return (
    <div id="App">
      <div id="container">
        <SearchFields />
        <WeatherResult />
        <SearchHistory />
      </div>
    </div>
  );
}

export default App;
