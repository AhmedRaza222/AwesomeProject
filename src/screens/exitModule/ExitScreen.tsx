import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import http from '../../services/httpService';
import { INTER_CHANGES } from '../../utils/constants';
import { useTollCalculation } from '../../hooks/useTollCalculation';


interface ExitFormValues {
  exitInterchange: string;
  numberPlate: string;
}

const ExitScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<ExitFormValues>();
  const { calculateTollAmount } = useTollCalculation();


  const interchanges = Object.values(INTER_CHANGES);

  const calculateToll = async (data: ExitFormValues) => {
    setLoading(true);

    try {
      const response = await http.get('/trips');
      const activeTrip = response.data.find(
        (trip: any) => trip.NumberPlate === data.numberPlate && trip.TripStatus === 'Active'
      );

      if (!activeTrip) {
        Alert.alert('Error', 'No active trip found for this vehicle.');
        return;
      }

      const tollAmount = calculateTollAmount(activeTrip, data.exitInterchange);
      const updatedTrip = {
        ...activeTrip,
        ExitDateTime: new Date().toISOString(),
        ExitInterchange: data.exitInterchange,
        TotalCostTrip: tollAmount,
        TripStatus: 'Completed',
      };

      await http.put(`/trips/${activeTrip.id}`, updatedTrip);
      Alert.alert('Success', `Total Toll: ${tollAmount.toFixed(2)} PKR`);
    } catch (error) {
      console.error('Error Calculating Toll:', error);
      Alert.alert('Error', 'Failed to calculate toll.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Exit Interchange</Text>
      <Controller
        control={control}
        name="exitInterchange"
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
      {errors.exitInterchange && <Text style={styles.errorText}>{errors.exitInterchange.message}</Text>}

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

      <Button title={loading ? 'Processing...' : 'Calculate Toll'} onPress={handleSubmit(calculateToll)} disabled={loading} />
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

export default ExitScreen;
