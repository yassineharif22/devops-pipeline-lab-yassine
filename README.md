# 🌤️ Weather Forecast Web App

A modern, responsive weather application built with vanilla HTML, CSS, and JavaScript. Get real-time weather data and 5-day forecasts for any city in the world.

## Features

✨ **Modern UI Design**
- Clean, centered card layout with smooth animations
- Gradient backgrounds and glassmorphism effects
- Fully responsive (desktop, tablet, mobile)
- Beautiful hover effects and transitions

🔍 **Search Functionality**
- Search weather by city name
- Support for Enter key submission
- Real-time error handling
- Loading state indicator

🌡️ **Current Weather Display**
- City name and country
- Current temperature
- Weather description and icon
- Feels-like temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure

📅 **5-Day Forecast**
- Daily weather cards with date
- Temperature trends (high/low)
- Weather icons and descriptions
- Hover effects for better interactivity

❌ **Error Handling**
- City not found notification
- Invalid API key warning
- Network error handling
- Auto-closing error messages

## Project Structure

```
weather-app/
├── index.html       # HTML structure and layout
├── style.css        # Responsive styling and animations
├── script.js        # JavaScript logic and API integration
└── README.md        # Documentation (this file)
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An OpenWeatherMap API key (free)
- Text editor or IDE to edit the API key

### Installation & Setup

#### Step 1: Get Your Free API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Click on the **"5 day / 3 hour Forecast"** API box
3. Click the **"Subscribe"** button (Free Plan available)
4. Sign up for a FREE account at https://openweathermap.org/users/register
5. Go to your account **API Keys** section
6. Copy your API key

#### Step 2: Add API Key to the App

1. Open `script.js` in your text editor
2. Find line 19:
   ```javascript
   const API_KEY = 'YOUR_API_KEY';
   ```
3. Replace `'YOUR_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = 'abc123def456xyz789';
   ```
4. Save the file

#### Step 3: Run the App

1. Open `index.html` in your web browser, or
2. Right-click `index.html` and select "Open with" → your preferred browser, or
3. Use a local server (recommended for better performance):
   - Python 3: `python -m http.server 8000`
   - Python 2: `python -m SimpleHTTPServer 8000`
   - Node.js: `npx http-server`
   
   Then open `http://localhost:8000` in your browser

### Usage

1. **Search for a City**
   - Type a city name in the search bar (e.g., "London", "Tokyo", "New York")
   - Click the "Search" button or press Enter
   - The app will fetch and display the weather data

2. **View Current Weather**
   - Temperature and weather description
   - Real "feels like" temperature
   - Humidity, wind speed, and pressure information
   - Large weather icon

3. **Check 5-Day Forecast**
   - Scroll down to see the forecast cards
   - Each card shows date, temperature range, and description
   - Hover over cards for interactive effects

4. **Error Handling**
   - If you see a pink error message, read it carefully
   - Common issues:
     - City name not found → Try another spelling
     - API key error → Check that you added the correct key in script.js
     - API limit reached → Wait a moment and try again (free tier has limits)

## Code Documentation

### HTML Structure (index.html)
- Semantic HTML5 layout
- Accessibility-friendly elements
- Well-organized sections with comments

### CSS Styling (style.css)
- Modern gradient backgrounds
- CSS Grid for responsive layouts
- Flexbox for component alignment
- Smooth animations and transitions
- Mobile-first responsive design
- Detailed comments for each section

### JavaScript (script.js)
- Modular function-based architecture
- Comprehensive error handling
- OpenWeatherMap API integration
- DOM manipulation and event handling
- Well-commented code explaining each function

## API Details

**API Provider:** OpenWeatherMap (Free Tier)

**Endpoint:** `https://api.openweathermap.org/data/2.5/forecast`

**Query Parameters:**
- `q` - City name
- `appid` - Your API key
- `units=metric` - Temperature in Celsius

**Response Data Used:**
- City information (name, country)
- Current weather (temperature, description, humidity, etc.)
- 5-day forecast (48+ data points, 3-hour intervals)

**Free Tier Limitations:**
- 5-day forecast available
- 60 calls per minute
- Sufficient for personal/development use

## Customization

### Change Default City
In `script.js` (around line 230), uncomment to load a default city:
```javascript
cityInput.value = 'London';
handleSearch();
```

### Adjust Update Frequency
Current setup uses one weather entry per day for the 5-day forecast. To change:
- Modify the `displayForecast()` function in script.js
- Adjust the forecasting algorithm as needed

### Customize Colors
Edit the gradient colors in `style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Temperature Units
In `script.js`, modify the API URL:
- Metric (Celsius): `units=metric`
- Imperial (Fahrenheit): `units=imperial`
- Kelvin: remove `units` parameter

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### "Please add your OpenWeatherMap API key"
**Solution:** Make sure you've replaced `'YOUR_API_KEY'` with your actual API key on line 19 of script.js

### "City not found"
**Solution:** Check the spelling of the city name. Try searching for major cities first.

### "Invalid API key"
**Solution:** 
- Verify the API key is correct
- Check that you copied it without extra spaces
- Ensure the key hasn't expired (regenerate if needed)

### No data displays after search
**Solution:**
- Open browser Developer Tools (F12)
- Check the Console tab for error messages
- Verify your internet connection
- Check OpenWeatherMap API status

### App works but no icons showing
**Solution:**
- Check your internet connection
- Icons are loaded from OpenWeatherMap CDN
- Try clearing browser cache and refreshing

## Performance Tips

- The app uses async/await for non-blocking API calls
- Loading state prevents multiple simultaneous requests
- Error messages auto-dismiss after 5 seconds
- Smooth CSS animations for better UX

## License

Free to use, modify, and distribute for personal and commercial projects.

## Credits

- **Weather Data:** [OpenWeatherMap API](https://openweathermap.org)
- **Icons:** OpenWeatherMap free weather icons
- **Fonts:** System fonts for optimal performance

## Future Enhancement Ideas

- 🗺️ Add geolocation support (auto-detect user location)
- 💾 Save favorite cities with localStorage
- 🌙 Dark/Light theme toggle
- 📊 Air quality index display
- 🌍 Multiple language support
- 📲 PWA capabilities (offline support)
- 🔔 Weather alerts/notifications
- 📈 Historical weather charts

---

**Created:** March 2026  
**Last Updated:** March 12, 2026
