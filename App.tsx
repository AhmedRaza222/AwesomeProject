import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapScreen from 'src/screens/MapScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MapScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
