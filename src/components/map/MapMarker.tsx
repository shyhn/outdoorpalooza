
import React from 'react';
import mapboxgl from 'mapbox-gl';

interface MapMarkerProps {
  coords: [number, number];
  title: string;
  type: string;
  map: mapboxgl.Map;
}

const MapMarker: React.FC<MapMarkerProps> = ({ coords, title, type, map }) => {
  React.useEffect(() => {
    // Create custom marker element
    const el = document.createElement('div');
    el.className = 'event-marker';
    el.style.backgroundColor = type === 'hiking' ? '#6e9b6e' : type === 'biking' ? '#b8937b' : '#7bb7cf';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
    el.style.cursor = 'pointer';
    
    // Add popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${title}</h3>
          <p class="text-sm text-gray-600">Click to view details</p>
        </div>
      `);
    
    // Add marker to map
    const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
      .setPopup(popup)
      .addTo(map);
    
    // Cleanup on unmount
    return () => {
      marker.remove();
    };
  }, [coords, title, type, map]);

  return null; // This is a logical component, no UI rendering
};

export default MapMarker;
