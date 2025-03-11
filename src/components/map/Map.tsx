import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Compass, Layers, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Set the Mapbox token directly since it's a public token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2h5aG56IiwiYSI6ImNtN3ZtcWxwczAxaGwyanBocmVrZW5oczYifQ.0S4sp26L8GdaxjCcsrN_AA';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
}

const Map: React.FC<MapProps> = ({
  initialCenter = [-98.5795, 39.8283],
  initialZoom = 3,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePOIFilter, setActivePOIFilter] = useState<string | null>(null);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: initialCenter,
        zoom: initialZoom,
        pitch: 30,
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

      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [initialCenter, initialZoom]);

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

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-earth-100 z-10">
          <p className="text-earth-800 text-lg">Chargement de la carte...</p>
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
