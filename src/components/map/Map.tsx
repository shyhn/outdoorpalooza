
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Compass, Layers, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Placeholder for when user hasn't entered their Mapbox token yet
const PLACEHOLDER_TOKEN = 'YOUR_MAPBOX_TOKEN';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
}

const Map: React.FC<MapProps> = ({
  initialCenter = [-98.5795, 39.8283], // Center of USA as default
  initialZoom = 3,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || PLACEHOLDER_TOKEN;
  });
  const [showTokenInput, setShowTokenInput] = useState(mapToken === PLACEHOLDER_TOKEN);
  const [loading, setLoading] = useState(true);
  const [activePOIFilter, setActivePOIFilter] = useState<string | null>(null);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current || mapToken === PLACEHOLDER_TOKEN) return;

    mapboxgl.accessToken = mapToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12', // Outdoor style for hiking/activities
        center: initialCenter,
        zoom: initialZoom,
        pitch: 30, // Add some 3D perspective
      });

      // Add navigation controls (zoom, rotation)
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add geolocation control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );
      
      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      
      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

      map.current.on('load', () => {
        setLoading(false);
        
        // Example: Add a sample event marker
        addEventMarker([-98.5795, 39.8283], 'Sample Hiking Event', 'hiking');
        addEventMarker([-97.5, 38.5], 'Mountain Biking Adventure', 'biking');
        addEventMarker([-99.3, 40.1], 'Kayaking Trip', 'water');
      });

      // Cleanup on unmount
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setShowTokenInput(true);
    }
  }, [initialCenter, initialZoom, mapToken]);

  // Function to add event markers to the map
  const addEventMarker = (coords: [number, number], title: string, type: string) => {
    if (!map.current) return;
    
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
    new mapboxgl.Marker(el)
      .setLngLat(coords)
      .setPopup(popup)
      .addTo(map.current);
  };

  // Function to toggle POI filters
  const togglePOIFilter = (poiType: string) => {
    setActivePOIFilter(activePOIFilter === poiType ? null : poiType);
    // Here we would update the map to show/hide POIs based on the filter
    console.log(`Toggled POI filter: ${poiType}`);
  };

  // Save token and initialize map
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById('mapbox-token') as HTMLInputElement;
    const token = input.value.trim();
    
    if (token && token !== PLACEHOLDER_TOKEN) {
      localStorage.setItem('mapbox_token', token);
      setMapToken(token);
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <div className="w-full h-full bg-earth-100 rounded-lg shadow-inner flex flex-col items-center justify-center p-4">
        <h2 className="text-earth-800 text-xl font-semibold mb-4">Mapbox Token Required</h2>
        <p className="text-earth-600 text-center mb-6">
          To use the interactive map, please enter your Mapbox public token.
          You can get one for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-forest-600 underline">mapbox.com</a>
        </p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
          <div className="flex flex-col space-y-4">
            <input
              id="mapbox-token"
              type="text"
              placeholder="Enter your Mapbox public token"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-forest-500"
              defaultValue={mapToken !== PLACEHOLDER_TOKEN ? mapToken : ''}
            />
            <button
              type="submit"
              className="h-12 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
            >
              Save & Load Map
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-earth-100 z-10">
          <p className="text-earth-800 text-lg">Loading map...</p>
        </div>
      )}
      
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* POI Filter Toggles */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
        <button
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors",
            activePOIFilter === 'water' ? "bg-sky-600 text-white" : "bg-white text-sky-600"
          )}
          onClick={() => togglePOIFilter('water')}
          title="Water sources"
        >
          <Compass className="w-5 h-5" />
        </button>
        
        <button
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors",
            activePOIFilter === 'camp' ? "bg-earth-600 text-white" : "bg-white text-earth-600" 
          )}
          onClick={() => togglePOIFilter('camp')}
          title="Camping sites"
        >
          <MapPin className="w-5 h-5" />
        </button>
        
        <button
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors",
            activePOIFilter === 'trails' ? "bg-forest-600 text-white" : "bg-white text-forest-600"
          )}
          onClick={() => togglePOIFilter('trails')}
          title="Hiking trails"
        >
          <Layers className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Map;
