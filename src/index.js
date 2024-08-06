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
}
function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=70eec3d2cba7671oeet42062d679704f`;
  axios.get(apiUrl).then(displayTemperature);
}
function searchSubmit(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#typesearch-city");
  search(searchInputElement.value);
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

let currentdateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentdateElement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="forecast-day">
    <div class="forecast-date">${day}</div>
    <div class="forecast-icon">☀️</div>

    <div class="forecast-temp2><span class="forecast-temp-low">15°</span>|<span class="forecast-temp-high">20°</span> </div>
  </div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

search("London");
displayForecast();
