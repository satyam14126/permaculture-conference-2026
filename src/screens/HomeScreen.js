import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../utils/AuthContext';
import CountdownTimer from '../components/CountdownTimer';
import { gurudevHeroImage } from '../assets/speakerImages';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const u = await AsyncStorage.getItem('user');
      if (u) setUser(JSON.parse(u));
    } catch (e) {
      // fallback
    }
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section with Gurudev Image in background */}
      <ImageBackground
        source={gurudevHeroImage}
        style={styles.heroBackground}
        imageStyle={styles.heroImageStyle}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.gurudevBadgeRow}>
            <Image source={gurudevHeroImage} style={styles.gurudevThumb} />
            <Text style={styles.gurudevBadgeText}>In the Divine Presence of Gurudev Sri Sri Ravi Shankar</Text>
          </View>

          <Text style={styles.heroTitle}>National Permaculture Conference 2026</Text>
          <Text style={styles.heroSubtitle}>From Seeds to Sustainability</Text>

          <View style={styles.datePill}>
            <Text style={styles.dateText}>📅 August 22 & 23, 2026 • Sat-Sun</Text>
          </View>

          {/* Countdown Timer on Main Page */}
          <CountdownTimer size="normal" style={styles.countdownContainer} />
        </View>
      </ImageBackground>

      {/* Attendee Welcome Card */}
      <View style={styles.infoCard}>
        <View style={styles.welcomeRow}>
          <View style={styles.welcomeInfo}>
            <Text style={styles.label}>Namaste {user?.name || 'Participant'},</Text>
            {user?.phone ? <Text style={styles.contactSub}>📱 {user.phone}</Text> : null}
            {user?.email ? <Text style={styles.contactSub}>📧 {user.email}</Text> : null}
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress} activeOpacity={0.7}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          Welcome to the 2-day national gathering of regenerative farmers, scientists, entrepreneurs,
          and ecological pioneers at the Art of Living International Center, Bangalore.
        </Text>
      </View>

      {/* Quick Access Grid */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Program')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardEmoji}>📋</Text>
          <Text style={styles.cardTitle}>Full Program</Text>
          <Text style={styles.cardDesc}>Day 1 & Day 2 Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Program')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardEmoji}>👥</Text>
          <Text style={styles.cardTitle}>Speakers</Text>
          <Text style={styles.cardDesc}>12 Keynote & Expert Bios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Map')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardEmoji}>🗺️</Text>
          <Text style={styles.cardTitle}>Ashram Map</Text>
          <Text style={styles.cardDesc}>Venues, Dining & Dhyan Mandir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('How to Reach')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardEmoji}>🚗</Text>
          <Text style={styles.cardTitle}>How to Reach</Text>
          <Text style={styles.cardDesc}>Metro, Bus, Taxi & Driving</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardFull}
          onPress={() => navigation.navigate('Contact')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardEmojiSmall}>📞</Text>
          <View style={styles.cardFullContent}>
            <Text style={styles.cardTitle}>Volunteer Help & Emergency</Text>
            <Text style={styles.cardDesc}>Housing, food, event, transport & 24/7 medical helpline</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Venue Card */}
      <View style={styles.venue}>
        <Text style={styles.venueTitle}>📍 Conference Venue</Text>
        <Text style={styles.venueName}>Art of Living International Ashram</Text>
        <Text style={styles.venueText}>21st Km., Kanakapura Road, Udayapura, Bangalore 560082, Karnataka, India</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  heroBackground: {
    width: '100%',
    minHeight: 280,
    backgroundColor: '#1b340e',
  },
  heroImageStyle: {
    opacity: 0.35,
    resizeMode: 'cover',
  },
  heroOverlay: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(23, 44, 12, 0.72)',
  },
  gurudevBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
    maxWidth: '96%',
  },
  gurudevThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2ecd6',
  },
  gurudevBadgeText: {
    color: '#eef8dc',
    fontSize: 11,
    fontWeight: '600',
    flexShrink: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'serif',
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#a8d774',
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '600',
  },
  datePill: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  countdownContainer: {
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 18,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  welcomeInfo: { flex: 1 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#2d5016' },
  contactSub: { fontSize: 12, color: '#777', marginTop: 2 },
  logoutBtn: {
    backgroundColor: '#f5ebe6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8c9c0',
  },
  logoutBtnText: { color: '#c0392b', fontSize: 12, fontWeight: '700' },
  text: { fontSize: 13, color: '#555', lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  card: {
    width: '46%',
    backgroundColor: '#ffffff',
    margin: '2%',
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardEmoji: { fontSize: 32, marginBottom: 6 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#2d5016', marginBottom: 2, textAlign: 'center' },
  cardDesc: { fontSize: 11, color: '#777', textAlign: 'center' },
  cardFull: {
    width: '96%',
    backgroundColor: '#ffffff',
    margin: '2%',
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardEmojiSmall: { fontSize: 28, marginRight: 12 },
  cardFullContent: { flex: 1 },
  venue: {
    margin: 16,
    padding: 18,
    backgroundColor: '#f5f0e6',
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#4a7c23',
    marginBottom: 30,
  },
  venueTitle: { fontSize: 15, fontWeight: 'bold', color: '#2d5016', marginBottom: 4 },
  venueName: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 2 },
  venueText: { fontSize: 13, color: '#666', lineHeight: 18 },
});
