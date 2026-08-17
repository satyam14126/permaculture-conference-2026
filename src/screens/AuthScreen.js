import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import CountdownTimer from '../components/CountdownTimer';

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
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (mode === 'email' && !validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    setOtpSent(true);
    Alert.alert('OTP Sent Successfully', `Use demo verification code: 1234`);
  };

  const verifyOTP = () => {
    if (otp === '1234') {
      const user = {
        name: name.trim() || 'Participant',
        phone: mode === 'phone' ? phone : '',
        email: mode === 'email' ? email : '',
        loginMethod: mode,
      };
      onLogin(user);
    } else {
      Alert.alert('Invalid OTP', 'Incorrect code. Please enter 1234 for demo login.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Bigger Branding */}
        <View style={styles.header}>
          <Text style={styles.logo}>🌱</Text>
          <Text style={styles.title}>National Permaculture Conference 2026</Text>
          <Text style={styles.subtitle}>From Seeds to Sustainability</Text>
          <Text style={styles.venueBadge}>🏛️ Art of Living International Ashram, Bangalore</Text>

          {/* Prominent Large Countdown Timer on Login Screen */}
          <View style={styles.countdownBox}>
            <CountdownTimer size="large" />
          </View>
        </View>

        {/* Bigger Login Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Attendee Sign In</Text>
          <Text style={styles.cardSub}>Enter your details to access sessions & conference map</Text>

          {/* Phone / Email Mode Toggle */}
          <View style={styles.toggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, mode === 'phone' && styles.toggleActive]}
              onPress={() => { setMode('phone'); setOtpSent(false); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.toggleText, mode === 'phone' && styles.toggleTextActive]}>📱 Mobile Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, mode === 'email' && styles.toggleActive]}
              onPress={() => { setMode('email'); setOtpSent(false); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.toggleText, mode === 'email' && styles.toggleTextActive]}>📧 Email Address</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Full Name (e.g. Ramesh Kumar)"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          {mode === 'phone' ? (
            <TextInput
              style={styles.input}
              placeholder="10-digit Mobile Number (e.g. 9876543210)"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Email Address (e.g. attendee@artofliving.org)"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          )}

          {!otpSent ? (
            <TouchableOpacity style={styles.button} onPress={sendOTP} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Get Verification Code ›</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.otpSection}>
              <Text style={styles.otpLabel}>Enter 4-Digit Code (Demo: 1234)</Text>
              <TextInput
                style={[styles.input, styles.otpInput]}
                placeholder="• • • •"
                placeholderTextColor="#bbb"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
                autoFocus
              />
              <TouchableOpacity style={styles.button} onPress={verifyOTP} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Verify & Enter Conference 🚀</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOtpSent(false)} style={styles.changeBtn}>
                <Text style={styles.link}>← Change {mode === 'phone' ? 'mobile number' : 'email address'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.footer}>
          🌿 Official App • National Permaculture Conference 2026
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b3810',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'serif',
    lineHeight: 32,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#a8d774',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '600',
  },
  venueBadge: {
    fontSize: 12,
    color: '#d4ebd0',
    textAlign: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  countdownBox: {
    marginTop: 18,
    width: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSub: {
    fontSize: 12,
    color: '#777',
    marginBottom: 18,
    textAlign: 'center',
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#ebf2e4',
    borderRadius: 30,
    padding: 4,
    marginBottom: 18,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#2d5016',
    elevation: 2,
  },
  toggleText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#445533',
  },
  toggleTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#d0dfc4',
    backgroundColor: '#fbfdf9',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 14,
    color: '#222',
  },
  otpSection: {
    marginTop: 4,
  },
  otpLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 8,
    textAlign: 'center',
  },
  otpInput: {
    textAlign: 'center',
    letterSpacing: 10,
    fontSize: 22,
    fontWeight: 'bold',
    borderColor: '#4a7c23',
    backgroundColor: '#f5faf0',
  },
  button: {
    backgroundColor: '#3b6e1b',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.4,
  },
  changeBtn: {
    marginTop: 14,
    paddingVertical: 6,
  },
  link: {
    textAlign: 'center',
    color: '#2d5016',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 22,
  },
});
