import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapComponent = ({ origin, destination, directions }) => {
  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
    >
      <Marker coordinate={origin} title="Origin" description="Starting Point" pinColor="green" />
      <Marker
        coordinate={destination}
        title="Destination"
        description="Ending Point"
        pinColor="red"
      />

      {directions.length > 0 && (
        <Polyline coordinates={directions} strokeWidth={4} strokeColor="#007AFF" />
      )}
    </MapView>
  );
};

export default MapComponent;
