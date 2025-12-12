function refresh(response) {
  let iconid = response.data.weather[0].icon;
  let date = new Date((response.data.timezone + response.data.dt) * 1000);

  function formatdate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tueday",
      "Wednsday",
      "Thursday",
      "Friday",
      "Saterday",
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let currentDate = document.querySelector("#currentDate");
    currentDate.innerHTML = `${day} ${hours}:${minutes}`;
  }
  function iconChange(iconid) {
    let iconurl = `https://openweathermap.org/img/wn/${iconid}@2x.png`;
    let icon = document.querySelector(".weather-app-icon");
    icon.innerHTML = `<img src=${iconurl}>`;
  }
  function wheatherData(response) {
    let temperature = document.querySelector(".weather-app-temperature");
    let cityElement = document.querySelector(".city");
    let weather = document.querySelector("#weather");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    temperature.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    weather.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = `${response.data.main.humidity}%`;
    wind.innerHTML = `${response.data.wind.speed}km/h`;
  }
  iconChange(iconid);
  formatdate(date);
  wheatherData(response);
  getforecast(response.data.name);
}
function searchCity(city) {
  let apikey = "a4d1ffe2f22e7da134fe0f4895a8bed3";
  apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(refresh);
}
function SearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  searchCity(searchInput.value);
}

let formBtn = document.querySelector(".search-form");
formBtn.addEventListener("submit", SearchSubmit);

function getforecast(city) {
  let apikey = "a4d1ffe2f22e7da134fe0f4895a8bed3";
  apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

  axios.get(apiurl).then(displayforecast);
}
function displayforecast(response) {
  let forecastElement = document.querySelector(".weather-forecast");
  let list = response.data.list;

  let days = list.filter((item) => item.dt_txt.includes("12:00:00"));

  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecast = "";

  days.forEach((day) => {
    let date = new Date(day.dt_txt);
    let dayName = dayNames[date.getDay()];

    let tempMax = Math.round(day.main.temp_max);
    let tempMin = Math.round(day.main.temp_min);
    let iconId = day.weather[0].icon;

    forecast += `
      <div class="wf-days">
        <div class="wf-date">${dayName}</div>
        <img 
          src="https://openweathermap.org/img/wn/${iconId}@2x.png"
          class="wf-icon"
        />
        <div class="wf-tempratures">
          <div class="wf-temp"><strong>${tempMax}º</strong></div>
          <div class="wf-temp">${tempMin}º</div>
        </div>
      </div>`;
  });

  forecastElement.innerHTML = forecast;
}
searchCity("paris");
getforecast("paris");
