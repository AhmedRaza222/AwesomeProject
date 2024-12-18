import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ORIGIN, DESTINATION } from 'constants/locations';
import { useFetchDirections } from 'hooks/useFetchDirections';
import MapComponent from 'components/googleMap/MapComponent';
import LoadingIndicator from 'components/LoadingIndicator';

const MapScreen = () => {
  const { directions, isLoading, fetchDirections } = useFetchDirections(ORIGIN, DESTINATION);

  useEffect(() => {
    fetchDirections();
  }, []);

  return (
    <View style={styles.container}>
      <MapComponent origin={ORIGIN} destination={DESTINATION} directions={directions} />
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
