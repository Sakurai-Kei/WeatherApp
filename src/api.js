function getCityName() {
  const cityName = document.getElementById("locationInput").value; // Get from DOM
  return cityName;
}

function getApiKey() {
  const apiKey = "187994b0d7f80b6c79921bcd4c94d49a";
  return apiKey;
}

function getApiCall(lat, lon) {
  const apiCall = [
    `https://api.openweathermap.org/data/2.5/weather?q=${getCityName()}&appid=${getApiKey()}`,
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${getApiKey()}`,
  ];
  return apiCall;
}

async function getWeather() {
  const response1 = await fetch(getApiCall()[0], { mode: "cors" });
  const currentData = await response1.json();
  const response2 = await fetch(
    getApiCall(currentData.coord.lat, currentData.coord.lon)[1],
    { mode: "cors" }
  );
  const dailyData = await response2.json();
  return { currentData, dailyData };
}

export default getWeather;
