
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockEvents, EventData } from '@/data/mockEvents';

// Set the Mapbox token directly since it's a public token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2h5aG56IiwiYSI6ImNtN3ZtcWxwczAxaGwyanBocmVrZW5oczYifQ.0S4sp26L8GdaxjCcsrN_AA';

interface UseMapboxProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  eventsToShow?: EventData[];
}

interface UseMapboxReturn {
  mapContainer: React.RefObject<HTMLDivElement>;
  map: React.RefObject<mapboxgl.Map | null>;
  loading: boolean;
  addEventMarker: (coords: [number, number], title: string, type: string, eventId: string, locationInfo?: string) => void;
}

const useMapbox = ({ 
  initialCenter = [2.2137, 46.2276], // France center by default
  initialZoom = 5,
  eventsToShow = mockEvents
}: UseMapboxProps = {}): UseMapboxReturn => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState(false);

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
      // Only attempt to remove the map if it exists and has been initialized
      if (map.current && mapInitialized) {
        try {
          // Safely remove markers first
          markersRef.current.forEach(marker => {
            try {
              marker.remove();
            } catch (e) {
              console.warn("Error removing marker:", e);
            }
          });
          markersRef.current = [];
          
          // Then safely remove the map
          map.current.remove();
        } catch (e) {
          console.warn("Error during map cleanup:", e);
        }
      }
      map.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect to update markers when filtered events change
  useEffect(() => {
    if (map.current && !loading && mapInitialized) {
      // Clear existing markers
      markersRef.current.forEach(marker => {
        try {
          marker.remove();
        } catch (e) {
          console.warn("Error removing marker:", e);
        }
      });
      markersRef.current = [];
      
      // Add filtered event markers
      if (eventsToShow && eventsToShow.length > 0) {
        eventsToShow.forEach(event => {
          if (event && event.coords && event.location) {
            const locationInfo = `${event.location.city}, ${event.location.region}`;
            addEventMarker(event.coords, event.title, event.type, event.id, locationInfo);
          }
        });
        
        // If we have filtered events and they're not too many, adjust the map view
        if (eventsToShow.length > 0 && eventsToShow.length < 5) {
          fitMapToMarkers(eventsToShow.filter(e => e && e.coords).map(event => event.coords));
        }
      }
    }
  }, [eventsToShow, loading, mapInitialized]); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeMap = (center: [number, number]) => {
    if (!mapContainer.current) return;
    
    try {
      if (map.current) {
        console.warn("Map already initialized, skipping initialization");
        return;
      }
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: center,
        zoom: userLocation ? 10 : initialZoom,
        pitch: 30,
      });

      // Add navigation controls (zoom, rotation)
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add geolocation control - this will allow users to re-center on their location
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
        setMapInitialized(true);
        
        // Only add markers if there's no filtered list (added later otherwise)
        if ((!eventsToShow || eventsToShow === mockEvents) && map.current) {
          // Add all mock events as markers
          mockEvents.forEach(event => {
            if (event && event.location) {
              const locationInfo = `${event.location.city}, ${event.location.region}`;
              addEventMarker(event.coords, event.title, event.type, event.id, locationInfo);
            }
          });
        }
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
    }
  };

  // Function to fit map to show all markers
  const fitMapToMarkers = (coordinates: [number, number][]) => {
    if (!map.current || coordinates.length === 0 || !mapInitialized) return;
    
    try {
      // Calculate bounds that include all coordinates
      const bounds = new mapboxgl.LngLatBounds();
      coordinates.forEach(coord => {
        if (coord && coord.length === 2) {
          bounds.extend(coord);
        }
      });
      
      // Add some padding to the bounds
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    } catch (error) {
      console.warn("Error fitting map to markers:", error);
    }
  };

  // Function to add event markers to the map
  const addEventMarker = (coords: [number, number], title: string, type: string, eventId: string, locationInfo?: string) => {
    if (!map.current || !mapInitialized) return;
    
    try {
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
      
      // Add popup with location info
      const locationHtml = locationInfo 
        ? `<p class="text-xs text-gray-500 mt-1">${locationInfo}</p>` 
        : '';
        
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${title}</h3>
            ${locationHtml}
            <p class="text-sm text-gray-600 mt-2">
              <a href="/events/${eventId}" style="color: #2563eb; text-decoration: underline;">
                Voir détails
              </a>
            </p>
          </div>
        `);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map.current);
        
      // Store marker reference
      markersRef.current.push(marker);
    } catch (error) {
      console.warn("Error adding marker:", error);
    }
  };

  return {
    mapContainer,
    map,
    loading,
    addEventMarker
  };
};

export default useMapbox;
