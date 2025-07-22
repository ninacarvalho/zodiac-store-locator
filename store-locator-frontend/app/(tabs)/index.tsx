import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useGoogleMap } from '../../hooks/useGoogleMaps';

const { width, height } = Dimensions.get('window');

const containerStyle = {
  width: `${width}px`,
  height: `${height}px`,
};

const center = { lat: 45.4046987, lng: 12.2472504 };

const MapScreen = () => {
  const { isLoaded } = useGoogleMap();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <Marker position={center} />
        <InfoWindow position={center}>
          <View style={{ backgroundColor: 'white', padding: 5 }}>
            <Text>Marker Info</Text>
          </View>
        </InfoWindow>
      </>
    </GoogleMap>
  ) : null;
};

export default React.memo(MapScreen);
