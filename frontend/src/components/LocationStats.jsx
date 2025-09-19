
import React, { useEffect, useState } from 'react';

const LocationStats = ({ onLocationChange, location, customMode, onAreaName }) => {
  const [internalLocation, setInternalLocation] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [areaName, setAreaName] = useState(null);
  const [areaLoading, setAreaLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Helper to get date string in YYYY-MM-DD
  const getDateString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  // Get geolocation
  useEffect(() => {
    if (location) {
      setInternalLocation(location);
      return;
    }
    if (customMode) return; // Don't auto-detect if in custom mode
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setInternalLocation(coords);
        if (onLocationChange) onLocationChange(coords);
      },
      (err) => {
        setError('Unable to retrieve your location');
      }
    );
  }, [location, customMode, onLocationChange]);

  // Fetch weather and area name when location is set
  useEffect(() => {
    if (!location) return;
    setWeatherLoading(true);
    setWeather(null);
    setError(null);
    // Open-Meteo API: https://open-meteo.com/en/docs
    // We'll fetch daily temperature min/max and precipitation for 7 days past and 7 days future
    const start = getDateString(-7);
    const end = getDateString(7);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.daily);
        setWeatherLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch weather data');
        setWeatherLoading(false);
      });

    // Fetch area/city name using Nominatim reverse geocoding
    setAreaLoading(true);
    setAreaName(null);
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}`;
    fetch(nominatimUrl)
      .then((res) => res.json())
      .then((data) => {
        // Try to get city, town, village, or state_district, fallback to display_name
        const address = data.address || {};
        const area = address.city || address.town || address.village || address.hamlet || address.state_district || address.state || address.county || data.display_name || 'Unknown area';
        setAreaName(area);
        if (onAreaName) onAreaName(area);
        setAreaLoading(false);
      })
      .catch(() => {
        setAreaName('Unknown area');
        setAreaLoading(false);
      });
  }, [location]);

  // Helper to get current weather summary (simple icon + description)
  const getCurrentWeatherSummary = () => {
    if (!weather || !weather.time) return { icon: '❓', desc: 'Unknown' };
    // Use the weather for today (index 7, since we fetch 7 days past and 7 days future)
    const todayIdx = 7;
    // Simple logic: if rain > 0, "Rainy"; else if max temp > 32, "Sunny"; else if min temp < 18, "Cool"; else "Cloudy"
    const rain = weather.precipitation_sum[todayIdx];
    const tmax = weather.temperature_2m_max[todayIdx];
    const tmin = weather.temperature_2m_min[todayIdx];
    if (rain > 2) return { icon: '🌧️', desc: 'Rainy' };
    if (tmax > 32) return { icon: '☀️', desc: 'Sunny' };
    if (tmin < 18) return { icon: '🌫️', desc: 'Cool' };
    return { icon: '⛅', desc: 'Cloudy' };
  };

  // Placeholder for field suggestion and crop recommendation
  const getFieldSuggestion = () => {
    // This can be replaced with AI or rules later
    const { desc } = getCurrentWeatherSummary();
    if (desc === 'Rainy') return 'Avoid field work, check drainage.';
    if (desc === 'Sunny') return 'Good day for planting or harvesting.';
    if (desc === 'Cool') return 'Monitor for pests, irrigate if needed.';
    return 'Suitable for general field activities.';
  };
  const getCropRecommendation = () => {
    // This can be replaced with AI or rules later
    const { desc } = getCurrentWeatherSummary();
    if (desc === 'Rainy') return 'Paddy, Jute, Sugarcane';
    if (desc === 'Sunny') return 'Maize, Groundnut, Cotton';
    if (desc === 'Cool') return 'Wheat, Mustard, Barley';
    return 'Vegetables, Pulses, Millets';
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-white/90 shadow-lg rounded-lg border border-primary-100 transition-all duration-300 ${expanded ? 'w-[32rem] max-w-[95vw] h-[38rem] max-h-[95vh] p-8' : 'w-60 h-16 p-2 flex items-center cursor-pointer'}`}
      onClick={() => !expanded && setExpanded(true)}
      style={{overflow: expanded ? 'auto' : 'hidden'}}
    >
      {/* Collapsed view */}
      {!expanded && (
        <div className="flex items-center w-full h-full">
          <div className="flex-1 flex items-center gap-2">
            <span className="text-2xl">{getCurrentWeatherSummary().icon}</span>
            <span className="font-semibold text-primary-700 text-lg">{getCurrentWeatherSummary().desc}</span>
          </div>
          <button
            className="ml-auto px-2 py-1 text-xs bg-primary-100 rounded hover:bg-primary-200"
            onClick={e => { e.stopPropagation(); setExpanded(true); }}
            title="Expand"
          >
            Expand
          </button>
        </div>
      )}
      {/* Expanded view */}
      {expanded && (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-2">{getCurrentWeatherSummary().icon}</span>
            <span className="font-bold text-2xl text-primary-700 mr-4">{getCurrentWeatherSummary().desc}</span>
            <span className="text-gray-600 text-lg">{areaLoading ? 'Detecting area...' : areaName}</span>
            <button
              className="ml-auto px-3 py-1 text-xs bg-primary-100 rounded hover:bg-primary-200"
              onClick={e => { e.stopPropagation(); setExpanded(false); }}
              title="Collapse"
            >
              Collapse
            </button>
          </div>
          <div className="flex gap-8 mb-4">
            <div>
              <div className="text-xs text-gray-500">Latitude</div>
              <div className="font-mono text-base">{location?.lat.toFixed(5)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Longitude</div>
              <div className="font-mono text-base">{location?.lon.toFixed(5)}</div>
            </div>
          </div>
          {/* Suggestions and recommendations */}
          <div className="mb-4">
            <div className="font-semibold text-primary-600 mb-1">What can be done right now?</div>
            <div className="bg-primary-50 rounded p-2 text-sm mb-2">{getFieldSuggestion()}</div>
            <div className="font-semibold text-primary-600 mb-1">Crops you can grow now</div>
            <div className="bg-primary-50 rounded p-2 text-sm">{getCropRecommendation()}</div>
          </div>
          {/* Weekly weather report */}
          <div className="mt-2">
            <div className="font-medium text-primary-600 mb-1">Weekly Weather Report</div>
            {weatherLoading && <div className="text-gray-500 text-xs">Loading weather...</div>}
            {weather && weather.time && (
              <div className="max-h-48 overflow-y-auto mt-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-600">
                      <th className="text-left">Date</th>
                      <th>Min</th>
                      <th>Max</th>
                      <th>Rain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weather.time.map((date, i) => (
                      <tr key={date} className="odd:bg-primary-50 even:bg-white">
                        <td>{date}</td>
                        <td>{weather.temperature_2m_min[i]}°C</td>
                        <td>{weather.temperature_2m_max[i]}°C</td>
                        <td>{weather.precipitation_sum[i]} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {!location && !error && (
        <div className="text-gray-500 text-sm">Detecting location...</div>
      )}
    </div>
  );
};

export default LocationStats;
