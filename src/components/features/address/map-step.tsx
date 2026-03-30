'use client';

import { useState, useRef } from 'react';
// UI Components
import { Button } from '@/components/ui/button';
import { MapPinHouse } from 'lucide-react';
// Translation
import { useTranslations } from 'next-intl';
// Google Maps
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type MapStepProps = {
  onSelect: (lat: number, lng: number) => void;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
};

export default function MapStep({
  onSelect,
  initialCenter = { lat: 30.0444, lng: 31.2357 },
  initialZoom = 13,
}: MapStepProps) {
  // State
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number }>(
    initialCenter
  );

  // Ref
  const mapRef = useRef<google.maps.Map | null>(null);

  // Hooks
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  // Translation
  const t = useTranslations('address');

  // Variables 
  const zoomLevel = initialZoom;

  // Functions
  const handleFindMyLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setSelectedPosition(position);

        if (mapRef.current) {
          mapRef.current.panTo(position);
          mapRef.current.setZoom(15);
        }

        onSelect(position.lat, position.lng);
      },
      (err) => {},
      { enableHighAccuracy: true }
    );
  };



  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="relative w-full h-[21.81rem] rounded overflow-hidden border border-zinc-200">
      {/* Google Map */}
      <GoogleMap
        center={selectedPosition}
        zoom={zoomLevel}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onClick={(e) => {
          const lat = e.latLng?.lat();
          const lng = e.latLng?.lng();
          if (lat !== undefined && lng !== undefined) {
            const position = { lat, lng };
            setSelectedPosition(position);
            onSelect(lat, lng);
            if (mapRef.current) mapRef.current.panTo(position);
          }
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{ zoomControl: false }}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>

      {/* Find My Location Button */}
      <Button
        type="button"
        onClick={handleFindMyLocation}
        className="absolute group w-[9.375rem] flex gap-[0.625rem] top-[0.25rem] right-[0.25rem] z-50 bg-white text-maroon-600 font-semibold px-4 py-3 border border-maroon-600 rounded-[0.625rem] text-sm hover:text-white hover:bg-maroon-600 hover:border-white"
      >
        <MapPinHouse size={20} className="stroke-current" />
        {t('find-my-location')}
      </Button>
    </div>
  );
}
