function getCityName() {
  const cityName = "London"; // Get from DOM
  return cityName;
}

function getApiKey() {
  const apiKey = "187994b0d7f80b6c79921bcd4c94d49a";
  return apiKey;
}

function getApiCall() {
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${getCityName()}&appid=${getApiKey()}`;
  return apiCall;
}

async function getWeather() {
  const response = await fetch(getApiCall(), { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
}

export default getWeather;
