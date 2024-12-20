//getting data from API and replacing in HTML, also changing HTML bg color based on API weather icon
function updateWeatherInfo(response) {
  let tempraturevalue = response.data.temperature.current;
  let description = response.data.condition.description;
  let humidityvalue = response.data.temperature.humidity;
  let windvalue = response.data.wind.speed;
  let timevalue = new Date(response.data.time * 1000);
  let iconDesription = response.data.condition.icon;
  if (iconDesription.includes("day")) {
    document.body.style.backgroundColor = "#5D9FD5";
    document.body.style.backgroundImage = "url('images/day.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else {
    document.body.style.backgroundColor = "#123459";
    document.body.style.backgroundImage = "url('images/night.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
  }
  let tempratureElement = document.querySelector("#weather-app-temp");
  let descriptionElement = document.querySelector("#weather-description");
  let humidtiyElement = document.querySelector("#weather-humidity");
  let windElement = document.querySelector("#weather-wind");
  let cityElement = document.querySelector("#city-display");
  let timeElement = document.querySelector("#weather-time");
  let iconElement = document.querySelector("#weather-app-icon");
  cityElement.innerHTML = response.data.city;
  tempratureElement.innerHTML = Math.round(tempraturevalue);
  descriptionElement.innerHTML = description;
  humidtiyElement.innerHTML = `${Math.round(humidityvalue)}%`;
  windElement.innerHTML = `${Math.round(windvalue)}km/h`;
  timeElement.innerHTML = formatTime(timevalue);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-img-icon"/>`;
}
//formating API time to day hours:minutes
function formatTime(timevalue) {
  let minutes = timevalue.getMinutes();
  let hours = timevalue.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[timevalue.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
//formating forecast API time to days
function forecastDayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "sat"];

  return days[date.getDay()];
}
//getting weather forecasting  data
function forecastDisplay(response) {
  let forecast = "";
  response.data.daily.forEach(function forecastformat(day, index) {
    if (index < 5) {
      forecast += `<div class="weather-forecast-date"><div class="weather-forecast-day">${forecastDayFormat(
        day.time
      )}</div>
            <div class="weather-forecast-icon"><img src="${
              day.condition.icon_url
            }" class="icon-forecast"/></div>
            <div class="weather-forecast-temps">
              <span class="min">${Math.round(day.temperature.minimum)}°</span>
              <span class="max">${Math.round(day.temperature.maximum)}°</span>
            </div> </div>`;
    }
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecast;
}
//getting the insterest data that a user wanted
function searchCity(city) {
  let apiKey = "71c9o8ef0370bd39a326b41301fb04bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let apiUrlforecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
  axios.get(apiUrlforecast).then(forecastDisplay);
}
// getting HTML input that a user submit
function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchForm);
//
searchCity("Mashhad");
