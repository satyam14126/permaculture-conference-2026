import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const u = await AsyncStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
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
        <Text style={styles.label}>Welcome {user?.name || 'Participant'},</Text>
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
          <Text style={styles.cardDesc}>Sessions, speakers & timings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.cardEmoji}>🗺️</Text>
          <Text style={styles.cardTitle}>Ashram Map</Text>
          <Text style={styles.cardDesc}>Venue, kitchen, accommodation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('How to Reach')}>
          <Text style={styles.cardEmoji}>🚗</Text>
          <Text style={styles.cardTitle}>How to Reach</Text>
          <Text style={styles.cardDesc}>Directions & transport</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.cardEmoji}>📞</Text>
          <Text style={styles.cardTitle}>Volunteers</Text>
          <Text style={styles.cardDesc}>Housing, food, event help</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.venue}>
        <Text style={styles.venueTitle}>Venue</Text>
        <Text style={styles.venueText}>Art of Living International Ashram</Text>
        <Text style={styles.venueText}>21st Km., Kanakapura Road, Udayapura, Bangalore 560082</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  hero: { backgroundColor: '#2d5016', padding: 32, alignItems: 'center' },
  heroEmoji: { fontSize: 56, marginBottom: 12 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', fontFamily: 'serif' },
  heroSubtitle: { fontSize: 15, color: '#8fbc5a', marginTop: 6, textAlign: 'center' },
  datePill: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginTop: 16 },
  dateText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  infoCard: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 16, elevation: 4 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#2d5016', marginBottom: 8 },
  text: { fontSize: 14, color: '#555', lineHeight: 22 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12 },
  card: { width: '46%', backgroundColor: '#fff', margin: '2%', padding: 20, borderRadius: 14, elevation: 3, alignItems: 'center' },
  cardEmoji: { fontSize: 36, marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#2d5016', marginBottom: 4, textAlign: 'center' },
  cardDesc: { fontSize: 12, color: '#777', textAlign: 'center' },
  venue: { margin: 20, padding: 20, backgroundColor: '#f5f0e6', borderRadius: 14 },
  venueTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d5016', marginBottom: 8 },
  venueText: { fontSize: 14, color: '#555', lineHeight: 20 },
});
