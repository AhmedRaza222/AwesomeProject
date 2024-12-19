import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { requestLocationPermission, getCurrentLocation } from 'src/utils/locationsHelper';
import { fetchCoordinates } from 'src/services/mapServices';
import MapComponent from 'src/components/MapComponent';

const MapScreen = () => {
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [destination, setDestination] = useState(null);

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        const coords = await getCurrentLocation();
        setCurrentLocation(coords);
      } catch (error) {
        console.error('Error fetching current location:', error.message);
      }
    } else {
      alert('Location permission denied');
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  const handleSearch = async () => {
    const coords = await fetchCoordinates(location);
    if (coords) {
      setDestination(coords);
    } else {
      alert('Location not found!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a location"
          value={location}
          onChangeText={setLocation}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <MapComponent currentLocation={currentLocation} destination={destination} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});

export default MapScreen;
