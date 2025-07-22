import CardContainer from '@/components/ui/CardContainer';
import HorizontalScrollList from '@/components/ui/HorizontalScrollList';
import SearchInput from '@/components/ui/SearchInput';
import { CustomInfoWindow } from '@/features/map/components/CustomInfoWindow';
import CustomMarker from '@/features/map/components/CustomMarker';
import StoreCell from '@/features/stores/components/StoreCell';
import { useStores } from '@/features/stores/hooks/useStores';
import { GoogleMap } from '@react-google-maps/api';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Store } from '../../features/stores/types';
import { useGoogleMap } from '../../hooks/useGoogleMaps';

const { width, height } = Dimensions.get('window');

const containerStyle = {
  width: `${width}px`,
  height: `${height}px`,
};

const defaultCenter = { lat: 45.4046987, lng: 12.2472504 };

const MapScreen = () => {
  const { isLoaded } = useGoogleMap();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { stores, loading } = useStores();
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  const onLoad = useCallback((map: google.maps.Map) => {
    if (stores.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      stores.forEach((store) => {
        bounds.extend({ lat: store.latitude, lng: store.longitude });
      });
      map.fitBounds(bounds);
    } else {
      map.setCenter(defaultCenter);
    }
    setMap(map);
  }, [stores]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleSelect = (id: number) => {
    setSelectedStoreId(id);
    const store = stores.find((s) => s.id === id);
    if (store && map) {
      map.panTo({ lat: store.latitude, lng: store.longitude });
      map.setZoom(15);
    }
  };

  const filteredStores = useMemo(() => {
    return stores.filter((store) =>
      store.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [stores, searchText]);

  if (!isLoaded || loading) return null;

  return (
    <View style={{ flex: 1 }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ clickableIcons: false }}
      >
        {stores.map((store: Store) => (
          <CustomMarker
            key={store.id}
            item={store}
            position={{ lat: store.latitude, lng: store.longitude }}
            isSelected={(item) => selectedStoreId === item.id}
            onSelect={handleSelect}
            onDeselect={() => setSelectedStoreId(null)}
            getId={(item) => item.id}
            getTitle={(item) => item.name}
            renderOverlay={(item) => (
              <CustomInfoWindow
                position={{ lat: item.latitude, lng: item.longitude }}
                onCloseClick={() => setSelectedStoreId(null)}
              >
                <StoreCell store={item} showDescription={true} />
              </CustomInfoWindow>
            )}
          />
        ))}
      </GoogleMap>

      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
        <SearchInput
          placeholder="Search by store name"
          onChangeText={setSearchText}
        />
        <HorizontalScrollList
          data={filteredStores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardContainer>
              <StoreCell
                store={item}
                onPress={() => handleSelect(item.id)}
                showDescription={false}
              />
            </CardContainer>
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
    </View>
  );
};

export default React.memo(MapScreen);
