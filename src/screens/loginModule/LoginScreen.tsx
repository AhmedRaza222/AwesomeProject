import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../slices/appSlice';

const LoginScreen: React.FC = () => {
  const [tollName, setTollName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (username && password) {
      // Store login state and toll name in local storage
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('tollName', tollName);

      // Dispatch Redux login action
      dispatch(login(tollName));
      Alert.alert('Success', 'Logged in successfully!');
    } else {
      Alert.alert('Error', 'Please enter valid credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Toll Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your toll name"
        value={tollName}
        onChangeText={setTollName}
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
});

export default LoginScreen;
