function displayWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let windSpeed = response.data.wind.speed;
  let humidity = response.data.temperature.humidity;
  let icon = response.data.condition.icon_url;
  let city = response.data.city;
  let date = new Date(response.data.time * 1000);

  document.querySelector("#current-temperature").innerHTML = temperature;
  document.querySelector("#current-city").innerHTML = city;
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#wind").innerHTML = windSpeed;
  document.querySelector("#humidity").innerHTML = humidity;
   document.querySelector("#current-date").innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", icon);

  getForecast(response.data.coordinates);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function getForecast(coordinates) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastHtml = "";

  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="forecast-day">
          <p>${formatDay(day.time)}</p>
          <img src="${day.condition.icon_url}" width="40" />
          <p>${Math.round(day.temperature.maximum)}° / ${Math.round(day.temperature.minimum)}°</p>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHtml;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
