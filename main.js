function addCloudEffect() {
    removeWeatherEffect();
    const clouds = document.createElement('div');
    clouds.classList.add('clouds');
    sky.appendChild(clouds);
}
    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('searchButton');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const weatherIcon = document.getElementById('weatherIcon');
    const sky = document.getElementById('sky');
    const API_KEY = '71d3a50a7c469ef7909a274fc17be49e';

    searchButton.addEventListener('click', () => {
      const city = locationInput.value;
      if (city) {
        fetchWeather(city);
      } else {
        alert('Please enter a city name');
      }
    });

    async function fetchWeather(city) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
          // Display weather info
          locationElement.innerText = `${data.name}, ${data.sys.country}`;
          temperatureElement.innerText = `Temperature: ${data.main.temp} °C`;
          descriptionElement.innerText = `Description: ${data.weather[0].description}`;
          humidityElement.innerText = `Humidity: ${data.main.humidity}%`;
          windElement.innerText = `Wind Speed: ${data.wind.speed} m/s`;

          // Set weather icon and show it
          const iconCode = data.weather[0].icon;
          weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          weatherIcon.style.display = 'block';

          // Change background and effect based on weather
          if (data.weather[0].main === 'Clear') {
            sky.style.background = 'linear-gradient(to top, #87CEEB, #FFD700)'; // Sunny gradient
            removeWeatherEffect();
          } else if (data.weather[0].main === 'Clouds') {
            sky.style.background = 'linear-gradient(to top, #B0C4DE, #778899)';
            addCloudEffect();
          } else if (data.weather[0].main === 'Rain') {
            sky.style.background = 'linear-gradient(to top, #778899, #333333)';
            addRainEffect();
          } else {
            sky.style.background = 'linear-gradient(to top, #f0f0f0, #cccccc)';
            removeWeatherEffect();
          }
        } else {
          alert('City not found');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    function addCloudEffect() {
      removeWeatherEffect();
      const clouds = document.createElement('div');
      clouds.classList.add('clouds');
      sky.appendChild(clouds);
    }

    function addRainEffect() {
      removeWeatherEffect();
      const rain = document.createElement('div');
      rain.classList.add('rain');
      sky.appendChild(rain);
    }

    function removeWeatherEffect() {
      sky.innerHTML = '';
    }