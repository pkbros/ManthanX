
import React, { useState } from 'react';
import ChatBot from './components/ChatBot';
import LocationStats from './components/LocationStats';
import MiniMap from './components/MiniMap';

function App() {
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [customLocation, setCustomLocation] = useState(null);
  const effectiveLocation = customLocation || userLocation;
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Side panel */}
      <aside
        className={`relative h-screen transition-all duration-300 bg-white/95 border-r border-primary-100 shadow-lg flex flex-col items-center py-6 px-3 gap-6 overflow-y-auto ${sideCollapsed ? 'w-12 min-w-0 max-w-[3vw]' : 'w-80 min-w-[18rem] max-w-[22vw]'}`}
        style={{zIndex: 20}}
      >
        <button
          className="absolute top-2 right-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full p-1 w-8 h-8 flex items-center justify-center focus:outline-none"
          onClick={() => setSideCollapsed(v => !v)}
          title={sideCollapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {sideCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
        {!sideCollapsed && <>
          <h1 className="text-2xl font-bold text-primary-700 mb-2">MANTHANX</h1>
          <p className="text-sm text-primary-600 mb-4 text-center">Smart AgriAssist</p>
          {/* MiniMap in small square */}
          {effectiveLocation && (
            <div className="w-48 h-48 mb-4">
              <MiniMap
                location={effectiveLocation}
                onLocationChange={loc => setCustomLocation(loc)}
                customMode={!!customLocation}
                small
              />
            </div>
          )}
          {/* Stats panel */}
          <div className="w-full mb-4">
            <LocationStats
              onLocationChange={loc => {
                if (!customLocation) setUserLocation(loc);
              }}
              location={effectiveLocation}
              customMode={!!customLocation}
              showSuggestions={true}
            />
          </div>
          {/* Suggestions and recommendations */}
          <div className="w-full mb-4">
            <div className="font-semibold text-primary-600 mb-1">What can be done right now?</div>
            <div className="bg-primary-50 rounded p-2 text-sm mb-2" id="field-suggestion-side">(Field suggestion will appear here)</div>
            <div className="font-semibold text-primary-600 mb-1">Crops you can grow now</div>
            <div className="bg-primary-50 rounded p-2 text-sm" id="crop-recommendation-side">(Crop recommendation will appear here)</div>
          </div>
          {/* News section */}
          <div className="w-full mb-4">
            <div className="font-semibold text-primary-600 mb-1">Farming News</div>
            <ul className="bg-primary-50 rounded p-2 text-sm space-y-1">
              <li>🌱 Govt launches new crop insurance scheme</li>
              <li>🌾 Monsoon expected to be above normal this year</li>
              <li>🚜 Subsidy on agri-equipment extended</li>
              <li>📰 <span className="text-primary-500">(Live news API coming soon)</span></li>
            </ul>
          </div>
          {/* Mandi prices section */}
          <div className="w-full mb-4">
            <div className="font-semibold text-primary-600 mb-1">Current Mandi Prices</div>
            <table className="w-full text-xs bg-primary-50 rounded">
              <thead>
                <tr className="text-gray-600">
                  <th className="text-left">Crop</th>
                  <th>Price (₹/quintal)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Wheat</td><td>₹2,150</td></tr>
                <tr><td>Rice</td><td>₹1,900</td></tr>
                <tr><td>Sugarcane</td><td>₹3,100</td></tr>
                <tr><td>Maize</td><td>₹1,700</td></tr>
                <tr><td colSpan="2" className="text-primary-500">(Live mandi prices API coming soon)</td></tr>
              </tbody>
            </table>
          </div>
        </>}
      </aside>
      {/* Main area for chat */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-2 md:px-8 overflow-hidden">
        <div className="w-full max-w-3xl mb-8">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold text-primary-700 mb-2">MANTHANX</h1>
            <p className="text-lg text-primary-600">Smart AgriAssist for Indian Farmers</p>
          </header>
        </div>
        <div className="w-full max-w-3xl">
          <ChatBot />
        </div>
      </main>
    </div>
  );
}

export default App;