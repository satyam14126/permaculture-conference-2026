import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, Alert
} from 'react-native';

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('phone'); // 'phone' or 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const validatePhone = (p) => /^[6-9]\d{9}$/.test(p);
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const sendOTP = () => {
    if (mode === 'phone' && !validatePhone(phone)) {
      Alert.alert('Invalid', 'Enter a valid 10-digit Indian mobile number');
      return;
    }
    if (mode === 'email' && !validateEmail(email)) {
      Alert.alert('Invalid', 'Enter a valid email address');
      return;
    }
    setOtpSent(true);
    Alert.alert('OTP Sent', `Demo OTP: 1234 (use this to login)`);
  };

  const verifyOTP = () => {
    if (otp === '1234') {
      const user = {
        name: name || 'Participant',
        phone: mode === 'phone' ? phone : '',
        email: mode === 'email' ? email : '',
        loginMethod: mode,
      };
      onLogin(user);
    } else {
      Alert.alert('Invalid', 'Incorrect OTP. Use 1234 for demo.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.logo}>🌱</Text>
          <Text style={styles.title}>Permaculture Conference 2026</Text>
          <Text style={styles.subtitle}>From Seeds to Sustainability • Aug 22-23 • Bangalore</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.toggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, mode === 'phone' && styles.toggleActive]}
              onPress={() => { setMode('phone'); setOtpSent(false); }}
            >
              <Text style={[styles.toggleText, mode === 'phone' && styles.toggleTextActive]}>📱 Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, mode === 'email' && styles.toggleActive]}
              onPress={() => { setMode('email'); setOtpSent(false); }}
            >
              <Text style={[styles.toggleText, mode === 'email' && styles.toggleTextActive]}>📧 Email</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          {mode === 'phone' ? (
            <TextInput
              style={styles.input}
              placeholder="10-digit Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          )}

          {!otpSent ? (
            <TouchableOpacity style={styles.button} onPress={sendOTP}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP (demo: 1234)"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                <Text style={styles.buttonText}>Verify & Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOtpSent(false)}>
                <Text style={styles.link}>Change {mode === 'phone' ? 'number' : 'email'}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={styles.footer}>
          By logging in, you agree to receive conference updates
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2d5016' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  logo: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', fontFamily: 'serif' },
  subtitle: { fontSize: 13, color: '#8fbc5a', textAlign: 'center', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 24, elevation: 8 },
  toggle: { flexDirection: 'row', backgroundColor: '#f0f0f0', borderRadius: 30, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 26, alignItems: 'center' },
  toggleActive: { backgroundColor: '#4a7c23' },
  toggleText: { fontWeight: '600', color: '#666' },
  toggleTextActive: { color: '#fff' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, fontSize: 15, marginBottom: 14 },
  button: { backgroundColor: '#4a7c23', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { textAlign: 'center', color: '#4a7c23', marginTop: 12, fontWeight: '500' },
  footer: { textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 20 },
});
