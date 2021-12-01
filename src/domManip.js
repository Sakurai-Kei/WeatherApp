/* eslint-disable no-param-reassign */
import { format } from "date-fns";
import getWeather from "./api";

function mainDOM(location, weather, unix, icon, temp) {
  const locationElement = document.getElementById("location");
  const weatherElement = document.getElementById("weather");
  const dateElement = document.getElementById("date");
  const iconElement = document.getElementById("weatherIcon");
  const tempElement = document.getElementById("temp");

  locationElement.textContent = location;
  weatherElement.textContent = weather;
  dateElement.textContent = format(new Date(unix * 1000), "PPPPpppp");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@4x.png`
  );
  tempElement.textContent = `${Math.round((temp - 273.15) * 100) / 100} °C`;
}

function dailyDOM(data) {
  const dailyData = data;
  const dailyElement = Array.from(document.querySelectorAll(".daily"));
  let i = 1;
  dailyElement.forEach((element) => {
    element.children[0].textContent = format(
      new Date(dailyData.daily[i].dt * 1000),
      "EEEE"
    );
    element.children[1].textContent = `${
      Math.round((dailyData.daily[i].temp.day - 273.15) * 100) / 100
    } °C`;
    element.children[2].textContent = `${dailyData.daily[i].weather[0].main}`;
    i += 1;
  });
}

function advancedDOM(temp, pressure, humidity, windSpeed) {
  const tempFLElement = document.getElementById("feelsLike");
  const pressureElement = document.getElementById("pressure");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("windSpeed");

  tempFLElement.textContent = `Feels Like\n${
    Math.round((temp - 273.15) * 100) / 100
  } °C`;
  pressureElement.textContent = `Pressure\n${Math.round(
    (pressure * 0.1 * 100) / 100
  )} kPa`;
  humidityElement.textContent = `Humidity\n${humidity}%`;
  windSpeedElement.textContent = `Wind Speed\n${windSpeed} m/s`;
}

async function inputDataIntoDOM() {
  const weatherData = await getWeather();
  mainDOM(
    weatherData.currentData.name,
    weatherData.currentData.weather[0].main,
    weatherData.currentData.dt,
    weatherData.currentData.weather[0].icon,
    weatherData.currentData.main.temp
  );
  dailyDOM(weatherData.dailyData);
  advancedDOM(
    weatherData.currentData.main.feels_like,
    weatherData.currentData.main.pressure,
    weatherData.currentData.main.humidity,
    weatherData.currentData.wind.speed
  );
  document.getElementById("locationInput").value = ""; // Reset input form
}

const eventListener = () => {
  const enterButton = document.getElementById("enterLocationInput");
  enterButton.addEventListener("click", inputDataIntoDOM);
  window.addEventListener("load", inputDataIntoDOM);
};

export default eventListener;
