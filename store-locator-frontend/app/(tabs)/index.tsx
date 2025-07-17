import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { Text, View } from 'react-native'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = { lat: 45.4046987, lng: 12.2472504 }

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDeFwZHbm34mi8v9k2p1l2FxgRNuh7vDw8',
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!`
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker
          position={{ lat: 45.4046987, lng: 12.2472504 }}
        />
        <InfoWindow position={{ lat: 45.4046987, lng: 12.2472504 }}>
          <View style={{ backgroundColor: "white", padding: 5 }}>
            <Text>Marker Info</Text>
          </View>
        </InfoWindow>
      </>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)