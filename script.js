document
  .getElementById("get-weather-btn")
  .addEventListener("click", getWeather);

function getWeather() {
  const apiKey = "013ae8e60319eb11e764370cecd623ca";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter city name");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error getting current weather:", error);
      alert("Try again");
    });

  fetch(forecastUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      displayHourlyWeather(data);
    })
    .catch((error) => {
      console.error("Error getting forecast weather:", error);
      alert("Try again");
    });
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weather-result");
  const weatherIcon = document.getElementById("weather-icon");
  const tempDiv = document.getElementById("temp");
  const weatherInfoDiv = document.getElementById("weather-info");

  weatherResult.innerText = `Weather in ${data.name}`;
  tempDiv.innerText = `Temperature: ${data.main.temp} °C`;
  weatherInfoDiv.innerText = `Description: ${data.weather[0].description}`;
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.style.display = "block";
}

function displayHourlyWeather(data) {
  const hourlyWeatherDiv = document.getElementById("hourly-weather");
  hourlyWeatherDiv.innerHTML = "";

  for (let i = 0; i < data.list.length; i += 8) {
    const weatherItem = data.list[i];
    const date = new Date(weatherItem.dt * 1000).toLocaleDateString();
    const time = new Date(weatherItem.dt * 1000).toLocaleTimeString();
    const temp = weatherItem.main.temp;
    const description = weatherItem.weather[0].description;
    const iconUrl = `http://openweathermap.org/img/w/${weatherItem.weather[0].icon}.png`;

    const weatherHTML = `
      <div class="hourly-weather-item">
        <h5>${date} ${time}</h5>
        <img src="${iconUrl}" alt="${description}">
        <p>Temp: ${temp} °C</p>
        <p>${description}</p>
      </div>
    `;
    hourlyWeatherDiv.innerHTML += weatherHTML;
  }
}
