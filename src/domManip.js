import { format } from "date-fns";
import getWeather from "./api";

function mainDOM(location, weather, icon, temp) {
  const locationElement = document.getElementById("location");
  const weatherElement = document.getElementById("weather");
  const dateElement = document.getElementById("date");
  const iconElement = document.getElementById("weatherIcon");
  const tempElement = document.getElementById("temp");

  locationElement.textContent = location;
  weatherElement.textContent = weather;
  dateElement.textContent = format(new Date(), "PPPppp");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@4x.png`
  );
  tempElement.textContent = temp;
}

// function dailyDOM() {
// It's Where it would display daily data, IF I COULD AFFORD IT
// }

function advancedDOM(temp, pressure, humidity, windSpeed) {
  const tempFLElement = document.getElementById("feelsLike");
  const pressureElement = document.getElementById("pressure");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("windSpeed");

  tempFLElement.textContent = `Feels Like\n${temp}`;
  pressureElement.textContent = `Pressure\n${pressure}`;
  humidityElement.textContent = `Humidity\n${humidity}`;
  windSpeedElement.textContent = `Wind Speed\n${windSpeed}`;
}

async function inputDataIntoDOM() {
  const weatherData = await getWeather();
  mainDOM(
    weatherData.name,
    weatherData.weather[0].main,
    weatherData.weather[0].icon,
    weatherData.main.temp
  );
  advancedDOM(
    weatherData.main.feels_like,
    weatherData.main.pressure,
    weatherData.main.humidity,
    weatherData.wind.speed
  );
  document.getElementById("locationInput").value = ""; // Reset input form
}

const eventListener = () => {
  const enterButton = document.getElementById("enterLocationInput");
  const middle = document.querySelector(".middle");
  enterButton.addEventListener("click", inputDataIntoDOM);
  middle.style.display = "none"; // Can't afford API key that forecasts daily sadge
};

export default eventListener;
