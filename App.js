import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';
import { AuthContext } from './src/utils/AuthContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) setIsLoggedIn(true);
    } catch (e) {
      // not logged in
    }
    setLoading(false);
  };

  const handleLogin = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingLogo}>🌱</Text>
        <Text style={styles.loadingText}>Permaculture Conference 2026</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <AuthContext.Provider value={{ logout: handleLogout }}>
      <AppNavigator onLogout={handleLogout} />
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2d5016' },
  loadingLogo: { fontSize: 48, marginBottom: 12 },
  loadingText: { fontSize: 18, color: '#8fbc5a', fontWeight: 'bold' },
});
