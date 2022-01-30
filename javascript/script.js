//display the current date and time

let dateTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[dateTime.getDay()];
document.getElementById("day-name").innerHTML = `${day}`;

let hour = dateTime.getHours();
let mins = dateTime.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}

if (hour < 10) {
  hour = `0${hour}`;
}

let realTime = `${hour}:${mins}`;
document.getElementById("real-time").innerHTML = `${realTime}`;

//Add a search engine

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city-here");
  let cityName = `${searchInput.value}`;
  document.querySelector("#city-name").innerHTML = `${searchInput.value}`;
  let apiKey = "d2f3282615c12b4088e624b5c0dbf8d2";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(`${apiLink}`).then(showTemp);
}

let searchForm = document.querySelector("#search-box");
searchForm.addEventListener("submit", searchCity);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temperature}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function showForecastdata(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class=row>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="WeatherForecastPreview">
                <div class="forecast-time">${formatDay(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" />
                <div class="forecast-temperature">
                   <span class="forecast-temperature-max">${Math.round(
                     forecastDay.temp.max
                   )}°</span
                  > <span class="forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            </div>        
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d2f3282615c12b4088e624b5c0dbf8d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecastdata);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let Fday = date.getDay();
  let dayname = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayname[Fday];
}
