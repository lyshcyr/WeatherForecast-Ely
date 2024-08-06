function displayTemperature(response) {
  let currentTemperature = document.querySelector("#temp-number");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let currentDescription = document.querySelector("#current-condition");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind");
  let currentIcon = document.querySelector("#temp-icon");

  cityElement.innerHTML = response.data.city;
  currentTemperature.innerHTML = temperature;
  currentDescription.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentWind.innerHTML = `${response.data.wind.speed}km/h`;
  currentIcon.innerHTML = `<img src="${response.data.condition.icon_url}">`;
  showForecast(response.data.city);
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
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=70eec3d2cba7671oeet42062d679704f&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#typesearch-city");
  search(searchInputElement.value);
}

//let currentdateElement = document.querySelector("#current-date");
//let currentDate = newDate();

//currentdateElement.innerHTML = formatDate(currentDate);

function fDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function showForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=70eec3d2cba7671oeet42062d679704f&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="forecast-day">
    <div class="forecast-date">${fDays(day.time)}</div>
    <img src="${day.condition.icon_url}" class="forecast-icon"/>
    <div class="forecast-temp"><span class="forecast-temp-low"> <strong> ${Math.round(
      day.temperature.maximum
    )}° </strong> </span>|<span class="forecast-temp-high">${Math.round(
          day.temperature.minimum
        )}°</span> </div>
  </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);

search("London");
