
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockEvents, EventData } from '@/data/mockEvents';

// Set the Mapbox token directly since it's a public token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2h5aG56IiwiYSI6ImNtN3ZtcWxwczAxaGwyanBocmVrZW5oczYifQ.0S4sp26L8GdaxjCcsrN_AA';

interface UseMapboxProps {
  initialCenter?: [number, number];
  initialZoom?: number;
}

interface UseMapboxReturn {
  mapContainer: React.RefObject<HTMLDivElement>;
  map: React.RefObject<mapboxgl.Map | null>;
  loading: boolean;
  addEventMarker: (coords: [number, number], title: string, type: string) => void;
}

const useMapbox = ({ 
  initialCenter = [2.2137, 46.2276], // France center by default
  initialZoom = 5 
}: UseMapboxProps = {}): UseMapboxReturn => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // Try to get user's location first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(userCoords);
          initializeMap(userCoords);
        },
        (error) => {
          console.warn("Geolocation error:", error);
          initializeMap(initialCenter);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      initializeMap(initialCenter);
    }

    return () => {
      map.current?.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeMap = (center: [number, number]) => {
    if (!mapContainer.current) return;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: center,
        zoom: userLocation ? 10 : initialZoom,
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
        
        // Add all mock events as markers
        mockEvents.forEach(event => {
          addEventMarker(event.coords, event.title, event.type);
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  // Function to add event markers to the map
  const addEventMarker = (coords: [number, number], title: string, type: string) => {
    if (!map.current) return;
    
    // Create custom marker element
    const el = document.createElement('div');
    el.className = 'event-marker';
    
    // Set color based on event type
    let color;
    switch(type) {
      case 'hiking':
        color = '#6e9b6e'; // green
        break;
      case 'biking':
        color = '#b8937b'; // brown
        break;
      case 'water':
        color = '#7bb7cf'; // blue
        break;
      case 'camping':
        color = '#8e6db5'; // purple
        break;
      case 'climbing':
        color = '#cf7b7b'; // red
        break;
      default:
        color = '#7bb7cf'; // default blue
    }
    
    el.style.backgroundColor = color;
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

  return {
    mapContainer,
    map,
    loading,
    addEventMarker
  };
};

export default useMapbox;
