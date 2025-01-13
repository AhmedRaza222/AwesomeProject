import React, { useState } from 'react';
import { Animated, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

interface BottomAlertProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const BottomAlert: React.FC<BottomAlertProps> = ({ message, visible, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  if (visible) {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.alertBox}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    zIndex: 10,
  },
  alertBox: {
    backgroundColor: '#ff4d4d', // Red background for error
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default BottomAlert;
