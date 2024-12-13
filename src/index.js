function updateWeatherInfo(response) {
  let tempraturevalue = response.data.temperature.current;
  let description = response.data.condition.description;
  let humidityvalue = response.data.temperature.humidity;
  let windvalue = response.data.wind.speed;
  let timevalue = new Date(response.data.time * 1000);
  let iconDesription = response.data.condition.icon;
  if (iconDesription.includes("day")) {
    document.body.style.backgroundColor = "#5D9FD5";
  } else {
    document.body.style.backgroundColor = "#123459";
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
    "saturday",
  ];
  let day = days[timevalue.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "71c9o8ef0370bd39a326b41301fb04bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchForm);
//document.body.style.backgroundColor = rndCol;
searchCity("Mashhad");
