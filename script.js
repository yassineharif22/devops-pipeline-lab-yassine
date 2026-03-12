/* ============================================
   Weather Forecast App - JavaScript Logic
   ============================================ */

// ============================================
// API CONFIGURATION
// ============================================

/**
 * OpenWeatherMap API Key
 * 
 * IMPORTANT: Replace 'YOUR_API_KEY' with your actual API key
 * 
 * Steps to get your free API key:
 * 1. Visit: https://openweathermap.org/api
 * 2. Click on "5 day / 3 hour Forecast" API
 * 3. Click "Subscribe" (Free Plan)
 * 4. Sign up for a free account
 * 5. Go to your API keys section
 * 6. Copy the API key and replace 'YOUR_API_KEY' below
 */
const API_KEY = 'YOUR_API_KEY';

// API endpoint for 5-day forecast
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// ============================================
// DOM ELEMENTS
// ============================================

// Input and button elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

// Display elements
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const forecastContainer = document.getElementById('forecastContainer');

// Weather detail elements
const cityName = document.getElementById('cityName');
const dateTime = document.getElementById('dateTime');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');

// ============================================
// EVENT LISTENERS
// ============================================

// Search button click event
searchBtn.addEventListener('click', handleSearch);

// Allow Enter key to trigger search
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Handle search button click and input validation
 */
function handleSearch() {
    const city = cityInput.value.trim();

    // Validate input
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    // API key validation
    if (API_KEY === 'YOUR_API_KEY') {
        showError('Please add your OpenWeatherMap API key to the script.js file (line 19)');
        return;
    }

    // Fetch weather data
    fetchWeatherData(city);
}

/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} city - City name to search for
 */
async function fetchWeatherData(city) {
    try {
        // Show loading spinner and hide previous content
        showLoading(true);
        clearError();

        // Build the API URL with parameters
        const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        // Fetch data from API
        const response = await fetch(url);

        // Handle HTTP errors
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please try another city.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your API key.');
            } else {
                throw new Error('Error fetching weather data. Please try again.');
            }
        }

        // Parse JSON response
        const data = await response.json();

        // Display current weather
        displayCurrentWeather(data);

        // Display 5-day forecast
        displayForecast(data);

        // Hide loading spinner
        showLoading(false);

    } catch (error) {
        // Handle errors and show error message
        showLoading(false);
        showError(error.message);
    }
}

/**
 * Display current weather information
 * @param {object} data - Weather data from API
 */
function displayCurrentWeather(data) {
    // Extract current weather data (first 3-hour interval)
    const currentData = data.list[0];
    const cityInfo = data.city;

    // Update city name
    cityName.textContent = `${cityInfo.name}, ${cityInfo.country}`;

    // Format and display date/time
    const now = new Date();
    const dateOptions = { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    dateTime.textContent = now.toLocaleDateString('en-US', dateOptions);

    // Update temperature (rounded to nearest integer)
    temperature.textContent = Math.round(currentData.main.temp) + '°C';

    // Display weather description
    const description = currentData.weather[0].description;
    weatherDescription.textContent = description;

    // Update weather icon
    const iconCode = currentData.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = description;

    // Display additional weather information
    feelsLike.textContent = Math.round(currentData.main.feels_like) + '°C';
    humidity.textContent = currentData.main.humidity + '%';
    windSpeed.textContent = Math.round(currentData.wind.speed) + ' m/s';
    pressure.textContent = currentData.main.pressure + ' hPa';

    // Show current weather card
    currentWeatherDiv.classList.remove('hidden');
}

/**
 * Display 5-day forecast
 * @param {object} data - Weather data from API
 */
function displayForecast(data) {
    // Clear previous forecast cards
    forecastContainer.innerHTML = '';

    // Get forecast data for each day
    // API provides data every 3 hours, so we take one entry per day (index 0, 8, 16, etc.)
    const forecastList = data.list;

    // Store processed days to avoid duplicate dates
    const processedDates = new Set();

    // Filter forecast data to get one entry per day
    const dailyForecasts = forecastList.filter(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('en-US');

        // Only include first occurrence of each day to limit to 5 days
        if (!processedDates.has(dayKey) && processedDates.size < 5) {
            processedDates.add(dayKey);
            return true;
        }
        return false;
    });

    // Create and append forecast cards
    dailyForecasts.forEach(forecast => {
        const card = createForecastCard(forecast);
        forecastContainer.appendChild(card);
    });

    // Show forecast section
    forecastSection.classList.remove('hidden');
}

/**
 * Create a forecast card element
 * @param {object} forecast - Single forecast data point
 * @returns {HTMLElement} Forecast card element
 */
function createForecastCard(forecast) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'forecast-card';

    // Format date
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Extract forecast information
    const temp = Math.round(forecast.main.temp);
    const tempMin = Math.round(forecast.main.temp_min);
    const tempMax = Math.round(forecast.main.temp_max);
    const description = forecast.weather[0].description;
    const iconCode = forecast.weather[0].icon;

    // Build card HTML
    card.innerHTML = `
        <div class="forecast-date">${dayName}, ${dayDate}</div>
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" 
             class="forecast-icon" 
             alt="${description}">
        <div class="forecast-temp">${temp}°C</div>
        <div class="forecast-temp-range">
            <span class="temp-high">H: ${tempMax}°C</span> | 
            <span class="temp-low">L: ${tempMin}°C</span>
        </div>
        <div class="forecast-description">${description}</div>
    `;

    return card;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Show or hide loading spinner
 * @param {boolean} show - Whether to show or hide the spinner
 */
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
        currentWeatherDiv.classList.add('hidden');
        forecastSection.classList.add('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

/**
 * Clear error message
 */
function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the app on page load
 */
window.addEventListener('load', () => {
    // Focus on input field for better UX
    cityInput.focus();
    
    // Optional: Load default city (London) on startup
    // Uncomment the line below if you want to show weather for a default city
    // cityInput.value = 'London';
    // handleSearch();
});
