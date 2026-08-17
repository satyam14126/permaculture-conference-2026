import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../utils/AuthContext';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const u = await AsyncStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🌿</Text>
        <Text style={styles.heroTitle}>National Permaculture Conference 2026</Text>
        <Text style={styles.heroSubtitle}>From Seeds to Sustainability</Text>
        <View style={styles.datePill}>
          <Text style={styles.dateText}>August 22 & 23, 2026 • Sat-Sun</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.welcomeRow}>
          <View style={styles.welcomeInfo}>
            <Text style={styles.label}>Namaste {user?.name || 'Participant'},</Text>
            {user?.phone ? <Text style={styles.contactSub}>📱 {user.phone}</Text> : null}
            {user?.email ? <Text style={styles.contactSub}>📧 {user.email}</Text> : null}
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          This two-day immersive conference brings together farmers, scientists, entrepreneurs,
          and changemakers to build a regenerative future. Gain timeless wisdom from Gurudev Sri Sri Ravi Shankar
          and learn from India's leading permaculture practitioners.
        </Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Program')}>
          <Text style={styles.cardEmoji}>📋</Text>
          <Text style={styles.cardTitle}>Full Program</Text>
          <Text style={styles.cardDesc}>Sessions, schedule & timings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Program')}>
          <Text style={styles.cardEmoji}>👤</Text>
          <Text style={styles.cardTitle}>Speakers</Text>
          <Text style={styles.cardDesc}>Bios & expertise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.cardEmoji}>🗺️</Text>
          <Text style={styles.cardTitle}>Ashram Map</Text>
          <Text style={styles.cardDesc}>Key venue locations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('How to Reach')}>
          <Text style={styles.cardEmoji}>🚗</Text>
          <Text style={styles.cardTitle}>How to Reach</Text>
          <Text style={styles.cardDesc}>Directions & transport</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardFull} onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.cardEmojiSmall}>📞</Text>
          <View style={styles.cardFullContent}>
            <Text style={styles.cardTitle}>Volunteer Help & Emergency</Text>
            <Text style={styles.cardDesc}>Housing, food, event, transport & medical helpline</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.venue}>
        <Text style={styles.venueTitle}>📍 Conference Venue</Text>
        <Text style={styles.venueName}>Art of Living International Ashram</Text>
        <Text style={styles.venueText}>21st Km., Kanakapura Road, Udayapura, Bangalore 560082, Karnataka</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  hero: { backgroundColor: '#2d5016', padding: 28, alignItems: 'center' },
  heroEmoji: { fontSize: 52, marginBottom: 10 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', fontFamily: 'serif' },
  heroSubtitle: { fontSize: 14, color: '#8fbc5a', marginTop: 6, textAlign: 'center' },
  datePill: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginTop: 14 },
  dateText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  infoCard: { backgroundColor: '#fff', margin: 16, padding: 18, borderRadius: 16, elevation: 3 },
  welcomeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  welcomeInfo: { flex: 1 },
  label: { fontSize: 17, fontWeight: 'bold', color: '#2d5016' },
  contactSub: { fontSize: 12, color: '#777', marginTop: 2 },
  logoutBtn: { backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  logoutBtnText: { color: '#d32f2f', fontSize: 12, fontWeight: '600' },
  text: { fontSize: 13, color: '#555', lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  card: { width: '46%', backgroundColor: '#fff', margin: '2%', padding: 16, borderRadius: 14, elevation: 2, alignItems: 'center' },
  cardEmoji: { fontSize: 32, marginBottom: 6 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#2d5016', marginBottom: 2, textAlign: 'center' },
  cardDesc: { fontSize: 11, color: '#777', textAlign: 'center' },
  cardFull: { width: '96%', backgroundColor: '#fff', margin: '2%', padding: 16, borderRadius: 14, elevation: 2, flexDirection: 'row', alignItems: 'center' },
  cardEmojiSmall: { fontSize: 28, marginRight: 12 },
  cardFullContent: { flex: 1 },
  venue: { margin: 16, padding: 18, backgroundColor: '#f5f0e6', borderRadius: 14, borderLeftWidth: 4, borderLeftColor: '#4a7c23' },
  venueTitle: { fontSize: 15, fontWeight: 'bold', color: '#2d5016', marginBottom: 4 },
  venueName: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 2 },
  venueText: { fontSize: 13, color: '#666', lineHeight: 18 },
});
