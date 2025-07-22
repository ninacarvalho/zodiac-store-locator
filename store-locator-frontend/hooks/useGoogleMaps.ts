import { useJsApiLoader } from '@react-google-maps/api';

export const useGoogleMap = () =>
  useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
