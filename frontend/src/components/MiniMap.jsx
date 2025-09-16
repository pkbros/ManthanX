import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationMarker({ position, onChange }) {
  useMapEvents({
    dragend: (e) => {
      // Not used, marker is draggable
    },
  });
  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          onChange({ lat: latlng.lat, lon: latlng.lng });
        },
      }}
    />
  );
}

const MiniMap = ({ location, onLocationChange, customMode, small }) => {
  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.setView([location.lat, location.lon], 13);
    }
  }, [location]);
  return (
    <div className={`relative rounded-lg overflow-hidden border border-primary-200 ${small ? 'w-48 h-48' : 'w-full h-64'}`}>
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        whenCreated={mapInstance => (mapRef.current = mapInstance)}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={[location.lat, location.lon]} onChange={onLocationChange} />
      </MapContainer>
      {customMode && (
        <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded shadow">Custom Location Mode</div>
      )}
    </div>
  );
};

export default MiniMap;
