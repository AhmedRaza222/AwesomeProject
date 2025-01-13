import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigation from './src/navigation/AppNavigation';
import TollActionSheet from './src/components/TollActionSheet';
import appReducer, { login } from './src/slices/appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

const App: React.FC = () => {
  const [showTollSheet, setShowTollSheet] = useState(false);
  const isLoggedIn = useSelector((state: any) => state.app.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginState = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const tollName = await AsyncStorage.getItem('tollName');

      if (loggedIn === 'true') {
        dispatch(login(tollName || '')); // Update Redux state
        if (!tollName) {
          setShowTollSheet(true); // Show Toll ActionSheet if toll is not set
        }
      }
    };

    checkLoginState();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigation isLoggedIn={isLoggedIn} />
      <TollActionSheet
        isVisible={showTollSheet}
        onClose={() => setShowTollSheet(false)}
      />
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
