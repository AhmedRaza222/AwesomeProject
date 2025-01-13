import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { login } from '../../slices/appSlice';

const TollSelectionScreen: React.FC = () => {
  const dispatch = useDispatch();
  const currentTollName = useSelector((state: any) => state.app.tollName);

  const tollOptions = [
    'Zero Point',
    'NS Interchange',
    'Ph4 Interchange',
    'Ferozpur Interchange',
    'Lake City Interchange',
    'Raiwand Interchange',
    'Bahria Interchange',
  ];

  const [selectedToll, setSelectedToll] = useState<string>(currentTollName || tollOptions[0]);

  // Load toll name from AsyncStorage when the screen loads
  useEffect(() => {
    const loadTollName = async () => {
      const storedTollName = await AsyncStorage.getItem('tollName');
      if (storedTollName) {
        setSelectedToll(storedTollName);
      }
    };

    loadTollName();
  }, []);

  // Save the selected toll in AsyncStorage and Redux
  const saveTollName = async () => {
    try {
      await AsyncStorage.setItem('tollName', selectedToll); // Store in AsyncStorage
      dispatch(login(selectedToll)); // Update Redux state
      Alert.alert('Success', 'Toll name updated successfully!');
    } catch (error) {
      console.error('Error saving toll name:', error);
      Alert.alert('Error', 'Failed to save toll name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Toll Name</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedToll}
          onValueChange={(itemValue) => setSelectedToll(itemValue)}
          style={styles.picker}
        >
          {tollOptions.map((toll) => (
            <Picker.Item key={toll} label={toll} value={toll} />
          ))}
        </Picker>
      </View>
      <Button title="Save Toll Name" onPress={saveTollName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
  picker: { height: 50, width: '100%' },
});

export default TollSelectionScreen;
