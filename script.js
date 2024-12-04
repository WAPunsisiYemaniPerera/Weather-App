const apiKey = "eb532800a19e10535efb8e2594d5b9d9";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loadingPage = document.getElementById("loading-page");
    const mainContent = document.getElementById("main-content");

    if (loadingPage && mainContent) {
      loadingPage.style.opacity = "0";
      loadingPage.style.transition = "opacity 1s ease";

      setTimeout(() => {
        loadingPage.style.display = "none";
        mainContent.style.display = "block";
      }, 1000);
    }
  }, 3000);
});

function changeCountry(city) {
  const backgroundImage = document.getElementById("background-image");

  if (backgroundImage) {
    backgroundImage.setAttribute("data-city", city);
    updateBackground(city);
    getWeather(city);
  }
}

function updateBackground(city) {
  const backgroundImage = document.getElementById("background-image");
  const cityImages = {
    "New York": "assets/newyork.jpg",
    London: "assets/london.jpg",
    Tokyo: "assets/tokyo.jpg",
    Colombo: "assets/colombo.jpg",
    Dubai: "assets/dubai.jpg",
  };

  if (backgroundImage && cityImages[city]) {
    backgroundImage.style.backgroundImage = `url(${cityImages[city]})`;
  }
}

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error((await response.json()).message || "City not found");
    }
    const data = await response.json();
    displayWeather(data, city);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data. Please try again.");
  }
}

function displayWeather(data, city) {
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const windSpeed = document.getElementById("wind-speed");
  const humidity = document.getElementById("humidity");
  const feelsLike = document.getElementById("feels-like");

  if (
    cityName &&
    temperature &&
    description &&
    windSpeed &&
    humidity &&
    feelsLike
  ) {
    cityName.textContent = city;
    temperature.textContent = `Temperature: ${data.main.temp.toFixed(1)} °C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    feelsLike.textContent = `Feels Like: ${data.main.feels_like.toFixed(1)} °C`;
  }
}
