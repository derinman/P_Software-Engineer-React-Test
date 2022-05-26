import { useState, useEffect } from "react";
import axios from "axios";

import { ReactComponent as SearchIcon } from "./img/search.svg";
import { ReactComponent as BinIcon } from "./img/recycle-bin-line.svg";

import fToC from "./util/convertTempFtoC.js";
import { timeStampToDatetime, timeStampToTime } from "./util/convertTimestamp";

import {
  Wrapper,
  Title,
  SearchBarWrapper,
  Button,
  SearchResultWrapper,
  ErrorMsg,
  SearchHistoryWrapper,
  SearchHistoryItemDiv,
  IconWrapper,
} from "./style/style.js";

const locationInit = {
  lat: null,
  lon: null,
  city: null,
  country: null,
};

const currentSearchResultInit = {
  city: null,
  country: null,
  weather: null,
  description: null,
  temperature: null,
  humidity: null,
  time: null,
};

const SearchHistoryItem = ({
  index,
  searchHistoryItem,
  searchHistory,
  setSearchHistory,
  fetchGeoCodingData,
}) => {
  let { city, country, timestamp } = searchHistoryItem;
  return (
    <SearchHistoryItemDiv>
      <div>{`${index + 1}. ${city}, ${country}`}</div>
      <div>
        <div>{timeStampToTime(timestamp)}</div>
        <IconWrapper style={{ marginLeft: "1rem" }}>
          <SearchIcon
            onClick={() => {
              fetchGeoCodingData(city, country, false);
            }}
          />
        </IconWrapper>
        <IconWrapper
          style={{ marginLeft: "1rem" }}
          onClick={() => {
            setSearchHistory((prevArray) =>
              prevArray.filter((data) => data.timestamp !== timestamp)
            );
          }}
        >
          <BinIcon />
        </IconWrapper>
      </div>
    </SearchHistoryItemDiv>
  );
};

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [currentSearchResult, setCurrentSearchResult] = useState(
    currentSearchResultInit
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchHistoryLoad, setIsSearchHistoryLoad] = useState(false);

  const fetchGeoCodingData = (city, country, addToSearchHistory = false) => {
    if (!city && !country) {
      setErrorMsg("Please input the city name and country name");
      return;
    } else if (!city) {
      setErrorMsg("Please input the city name");
      return;
    } else if (!country) {
      setErrorMsg("Please input the country name");
      return;
    }
    let location = locationInit;
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city},_,${country}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )
      .then((res) => {
        // console.log('fetchGeoCodingData->res',res)
        // console.log('fetchGeoCodingData->res.data',res.data);
        let location = {
          lat: res.data[0].lat,
          lon: res.data[0].lon,
          city: res.data[0].name,
          country: res.data[0].country,
        };
        // console.log('location:', location);
        if (Object.values(location).every((v) => v)) {
          fetchCurrentWeatherData(location, addToSearchHistory);
        }
      })
      .catch((err) => {
        // console.log(err);
        setErrorMsg("Result not found");
      });
  };

  const fetchCurrentWeatherData = (location, addToSearchHistory = false) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )
      .then((res) => {
        if (!res || res.status !== 200) {
          console.log("error");
          return;
        }
        // console.log('fetchCurrentWeatherData->res',res);
        // console.log('fetchCurrentWeatherData->res.data',res.data);
        let timestamp = new Date().getTime();
        setCurrentSearchResult({
          lat: location.lat,
          lon: location.lon,
          city: location.city,
          country: location.country,
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description,
          temp_min: res.data.main.temp_min,
          temp_max: res.data.main.temp_max,
          humidity: res.data.main.humidity,
          timestamp: timestamp,
        });
        setCity("");
        setCountry("");
        setErrorMsg("");
        if (addToSearchHistory) {
          let searchHistoryItem = {
            city: location.city,
            country: location.country,
            timestamp: timestamp,
          };
          setSearchHistory((prevArray) => [searchHistoryItem, ...prevArray]);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Result not found");
      });
  };

  const loadSearchHistory = () => {
    let tmp = JSON.parse(localStorage.getItem("searchHistory"));
    if (tmp) {
      setSearchHistory(tmp);
    }
  };

  //load search history from localstorage
  useEffect(() => {
    if (!isSearchHistoryLoad) {
      loadSearchHistory();
      setIsSearchHistoryLoad(true);
    }
  }, []);

  //set search history at localstorage
  useEffect(() => {
    if (isSearchHistoryLoad) {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  return (
    <Wrapper>
      <Title>Today's Weather</Title>
      <SearchBarWrapper>
        <label>
          City:&nbsp;
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Country:&nbsp;
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <Button
          onClick={() => {
            fetchGeoCodingData(city, country, true);
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setCity("");
            setCountry("");
            setErrorMsg("");
            setCurrentSearchResult(currentSearchResultInit);
          }}
        >
          Clear
        </Button>
      </SearchBarWrapper>
      {Object.values(currentSearchResult).every((v) => v) && !errorMsg && (
        <SearchResultWrapper>
          <div>
            {`${currentSearchResult.city}, ${currentSearchResult.country}`}
          </div>
          <div>{currentSearchResult.weather}</div>
          <div>
            <div>
              <span>Description:</span>
              <span>{currentSearchResult.description}</span>
            </div>
            <div>
              <span>Temperature:</span>
              <span>{`${fToC(currentSearchResult.temp_min)}°C~${fToC(
                currentSearchResult.temp_max
              )}°C`}</span>
            </div>
            <div>
              <span>Humidity:</span>
              <span>{`${currentSearchResult.humidity} %`}</span>
            </div>
            <div>
              <span>Time:</span>
              <span>{timeStampToDatetime(currentSearchResult.timestamp)}</span>
            </div>
          </div>
        </SearchResultWrapper>
      )}
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <Title>Search History</Title>
      <SearchHistoryWrapper>
        {searchHistory.map((item, i) => (
          <SearchHistoryItem
            key={item.timestamp}
            index={i}
            searchHistoryItem={item}
            searchHistory={searchHistory}
            setSearchHistory={setSearchHistory}
            fetchGeoCodingData={fetchGeoCodingData}
          />
        ))}
      </SearchHistoryWrapper>
    </Wrapper>
  );
}

export default App;
