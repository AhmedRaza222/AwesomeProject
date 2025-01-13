import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface SpinnerComponentProps {
  visible: boolean;
}

const SpinnerComponent: React.FC<SpinnerComponentProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 10,
  },
});

export default SpinnerComponent;
