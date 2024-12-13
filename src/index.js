function updateWeatherInfo(response) {
  let tempraturevalue = response.data.temperature.current;
  let tempratureElement = document.querySelector("#weather-app-temp");
  let cityElement = document.querySelector("#city-display");
  cityElement.innerHTML = response.data.city;
  tempratureElement.innerHTML = Math.round(tempraturevalue);
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
