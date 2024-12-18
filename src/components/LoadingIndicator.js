import React from 'react';
import { Text, StyleSheet } from 'react-native';

const LoadingIndicator = ({ loadingMsg }) => {
  return <Text style={styles.loading}>{loadingMsg}</Text>;
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoadingIndicator;
