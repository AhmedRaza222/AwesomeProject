import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../../services/httpService';
import { INTER_CHANGES } from '../../utils/constants';

interface EntryFormValues {
  entryInterchange: string;
  numberPlate: string;
}

const EntryScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<EntryFormValues>();

  const [dateTime, setDateTime] = useState(new Date()); // Default current date and time

  const interchanges = Object.values(INTER_CHANGES); // Convert constants to an array

  const onSubmit = async (data: EntryFormValues) => {
    const payload = {
      EntryDateTime: new Date().toISOString(),
      NumberPlate: data.numberPlate,
      EntryInterchange: data.entryInterchange,
      TripStatus: 'Active',
    };

    try {
      const response = await http.post('/trips', payload);
      console.log('Entry Added:', response);
      Alert.alert('Success', 'Vehicle entry recorded successfully!');
    } catch (error) {
      console.error('Error Adding Entry:', error);
      Alert.alert('Error', 'Failed to record vehicle entry.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Entry Interchange</Text>
      <Controller
        control={control}
        name="entryInterchange"
        defaultValue={INTER_CHANGES.ZERO_POINT}
        rules={{ required: 'Interchange is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
              {interchanges.map((interchange) => (
                <Picker.Item key={interchange} label={interchange} value={interchange} />
              ))}
            </Picker>
          </View>
        )}
      />
      {errors.entryInterchange && <Text style={styles.errorText}>{errors.entryInterchange.message}</Text>}

      <Text style={styles.label}>Vehicle Number Plate</Text>
      <Controller
        control={control}
        name="numberPlate"
        rules={{
          required: 'Number plate is required',
          pattern: { value: /^[A-Z]{3}-\d{3}$/, message: 'Invalid format (e.g., ABC-123)' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.numberPlate && styles.errorInput]}
            placeholder="Enter vehicle number (ABC-123)"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.numberPlate && <Text style={styles.errorText}>{errors.numberPlate.message}</Text>}

      <Button title={loading ? 'Processing...' : 'Record Entry'} onPress={handleSubmit(onSubmit)} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 10 },
});

export default EntryScreen;
