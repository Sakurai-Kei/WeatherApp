import "./style.css";
import eventListener from "./domManip";
import backgroundImage from "./background.jpg"; // Image credit to Dave Hoefler on unsplash (https://unsplash.com/photos/lsoogGC_5dg)

// eslint-disable-next-line no-unused-vars
const initialise = (() => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${backgroundImage})`;

  document.getElementById("locationInput").value = "Malaysia";

  eventListener();
})();
