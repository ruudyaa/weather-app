function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// function getForecast(coordinates) {
//   console.log(coordinates);
//   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
//   console.log(apiUrl);
// }

function showTemperature(response) {
  document.querySelector("#cityShown").innerHTML = response.data.name;
  document.querySelector("#cityFirst").innerHTML = response.data.name;
  document.querySelector("#citySecond").innerHTML = response.data.name;
  document.querySelector("#cityThird").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#temperatureSecond").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#visibility").innerHTML = response.data.visibility;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#highTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lowTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#skyClouds").innerHTML = response.data.clouds.all;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  console.log(response.data);

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celciusTemperature = Math.round(response.data.main.temp);
}

// getForecast(response.data.coord);

function searchCity(city) {
  // var apiKey = "98837ed6c6a161339073bfa306c0bccd";
  var apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  var city = document.querySelector("#inputCity").value;
  searchCity(city);
}

function currentLocationTemperature(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocationTemperature);
}

var searchForm = document.querySelector(".searchCity");
searchForm.addEventListener("submit", showCity);
var currentLocationButton = document.querySelector(".location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperatureSecond");

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureSecond");

  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelsiusTemperature);

let celciusTemperature = null;
