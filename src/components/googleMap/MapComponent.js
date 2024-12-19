import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet } from 'react-native';
import config from 'src/utils/config';

const MapComponent = ({ currentLocation, destination }) => {
  return (
    <MapView
      style={StyleSheet.absoluteFill}
      region={{
        latitude: currentLocation.latitude || 31.4300,
        longitude: currentLocation.longitude || 74.2509,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {currentLocation && (
        <Marker coordinate={currentLocation} title="Current Location" pinColor="blue" />
      )}
      {destination && <Marker coordinate={destination} title="Destination" pinColor="red" />}
      {currentLocation && destination && (
        <MapViewDirections
          origin={currentLocation}
          destination={destination}
          apikey={config.googleMapsApiKey}
          strokeWidth={4}
          strokeColor="#007AFF"
        />
      )}
    </MapView>
  );
};

export default MapComponent;
