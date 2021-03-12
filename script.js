// DOM SELECTORS
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchHistory = document.querySelector(".search-history");
const cityName = document.querySelector(".city-name");
const cityDate = document.querySelector(".city-date");
const cityIcon = document.querySelector(".city-icon");
const cityTemperature = document.querySelector(".city-temperature");
const cityHumidity = document.querySelector(".city-humidity");
const cityWind = document.querySelector(".city-wind");
const cityUv = document.querySelector(".city-uv");
const forecastDays = document.querySelector(".forecast-days");

// FUNCTIONS
const searchHistoryArray = [];

const searchCity = () => {
  const API_KEY = "e6bd2b4788c4a97929b4dd7c3827bbc7";

  if (searchInput.value === "") {
    alert("Please enter a city name");
  } else {
    const searchCity = searchInput.value;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`;

    // current forecast
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        // get the data
        const date = new Date();
        const currentDate = date.toLocaleDateString();
        const currentCityName = data.name;
        const currentCityIconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const currentCityTemp = data.main.temp;
        const currentCityHumidity = data.main.humidity;
        const currentCityWind = data.wind.speed;

        // populate current city card
        cityName.innerHTML = currentCityName;
        cityDate.innerHTML = currentDate;
        cityIcon.src = currentCityIconUrl;
        cityTemperature.innerHTML = currentCityTemp;
        cityHumidity.innerHTML = currentCityHumidity;
        cityWind.innerHTML = currentCityWind;

        // populate search history
        searchHistoryArray.push(currentCityName);
        localStorage.setItem("searchHistory", searchHistoryArray);

        const li = document.createElement("li");
        li.className = "search-history-item";
        li.innerHTML = currentCityName;
        searchHistory.appendChild(li);

        // 5 day forecast
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            // clear the list of cards
            forecastDays.innerHTML = "";

            for (let i = 0; i < 5; i++) {
              console.log(data.daily[i]);
              // create forecast cards
              const li = document.createElement("li");
              li.className = "forecast-card";

              const h3 = document.createElement("h3");
              h3.className = "forecast-card-date";
              h3.innerHTML = `${date.getMonth() + 1}/${
                date.getDate() + (i + 1)
              }/${date.getFullYear()}`;

              const img = document.createElement("img");
              img.src = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
              img.className = "forecast-card-icon";

              const p1 = document.createElement("p");
              p1.className = "forecast-card-temp";
              p1.innerHTML = `Temp: ${data.daily[i].temp.day}`;

              const p2 = document.createElement("p");
              p2.className = "forecast-card-humidity";
              p2.innerHTML = `Humidity: ${data.daily[i].humidity}`;

              li.appendChild(h3);
              li.appendChild(img);
              li.appendChild(p1);
              li.appendChild(p2);

              forecastDays.appendChild(li);
            }
          });
      });

    searchInput.value = "";
  }
};

const reSearchCity = (e) => {
  if (e.target.className === "search-history-item") {
    const API_KEY = "e6bd2b4788c4a97929b4dd7c3827bbc7";
    const reSearchCity = e.target.innerHTML;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${reSearchCity}&appid=${API_KEY}`;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        // get the data
        const currentDate = new Date().toLocaleDateString();
        const currentCityName = data.name;
        const currentCityIconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const currentCityTemp = data.main.temp;
        const currentCityHumidity = data.main.humidity;
        const currentCityWind = data.wind.speed;

        // populate current city card
        cityName.innerHTML = currentCityName;
        cityDate.innerHTML = currentDate;
        cityIcon.src = currentCityIconUrl;
        cityTemperature.innerHTML = currentCityTemp;
        cityHumidity.innerHTML = currentCityHumidity;
        cityWind.innerHTML = currentCityWind;

        // populate search history
        searchHistoryArray.push(currentCityName);
        localStorage.setItem("searchHistory", searchHistoryArray);

        // <li class="search-history-item">Austin</li>
        const li = document.createElement("li");
        li.className = "search-history-item";
        li.innerHTML = currentCityName;
        searchHistory.appendChild(li);

        // 5 day forecast
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            // clear the list of cards
            forecastDays.innerHTML = "";
            const date = new Date();

            for (let i = 0; i < 5; i++) {
              console.log(data.daily[i]);
              // create forecast cards
              const li = document.createElement("li");
              li.className = "forecast-card";

              const h3 = document.createElement("h3");
              h3.className = "forecast-card-date";
              h3.innerHTML = `${date.getMonth() + 1}/${
                date.getDate() + (i + 1)
              }/${date.getFullYear()}`;

              const img = document.createElement("img");
              img.src = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
              img.className = "forecast-card-icon";

              const p1 = document.createElement("p");
              p1.className = "forecast-card-temp";
              p1.innerHTML = `Temp: ${data.daily[i].temp.day}`;

              const p2 = document.createElement("p");
              p2.className = "forecast-card-humidity";
              p2.innerHTML = `Humidity: ${data.daily[i].humidity}`;

              li.appendChild(h3);
              li.appendChild(img);
              li.appendChild(p1);
              li.appendChild(p2);

              forecastDays.appendChild(li);
            }
          });
      });
    searchInput.value = "";
  }
};

// EVENT LISTNERS
searchBtn.addEventListener("click", searchCity);
searchHistory.addEventListener("click", reSearchCity);
