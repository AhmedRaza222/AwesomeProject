import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { login } from '../slices/appSlice';

interface TollActionSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const tollOptions = [
  'Zero Point',
  'NS Interchange',
  'Ph4 Interchange',
  'Ferozpur Interchange',
  'Lake City Interchange',
  'Raiwand Interchange',
  'Bahria Interchange',
];

const TollActionSheet: React.FC<TollActionSheetProps> = ({ isVisible, onClose }) => {
  const [selectedToll, setSelectedToll] = useState(tollOptions[0]); // Default to the first toll
  const dispatch = useDispatch();

  const handleSaveToll = async () => {
    try {
      await AsyncStorage.setItem('tollName', selectedToll); // Save toll in AsyncStorage
      dispatch(login(selectedToll)); // Update Redux state
      Alert.alert('Success', 'Toll name selected successfully!');
      onClose(); // Close the ActionSheet
    } catch (error) {
      console.error('Error saving toll name:', error);
      Alert.alert('Error', 'Failed to save toll name.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.actionSheet}>
          <Text style={styles.title}>Select Toll Name</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedToll}
              onValueChange={(itemValue) => setSelectedToll(itemValue)}
            >
              {tollOptions.map((toll) => (
                <Picker.Item key={toll} label={toll} value={toll} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveToll}>
            <Text style={styles.saveButtonText}>Save Toll Name</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  actionSheet: { backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20 },
  saveButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  saveButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});

export default TollActionSheet;
