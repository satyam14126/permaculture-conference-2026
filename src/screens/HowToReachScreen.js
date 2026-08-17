import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking
} from 'react-native';

const transportOptions = [
  {
    icon: '✈️',
    title: 'By Air',
    details: [
      'Kempegowda International Airport (BLR) — ~55 km from Ashram',
      'Pre-paid taxi or Uber/Ola available 24/7',
      'Approx travel time: 1.5–2 hours depending on traffic',
      'Cost: ₹1,500–2,500 by taxi',
    ],
  },
  {
    icon: '🚂',
    title: 'By Train',
    details: [
      'KSR Bengaluru City Junction (SBC) — ~28 km',
      'Yesvantpur Junction (YPR) — ~25 km',
      'From station, take a taxi or metro + auto to Ashram',
      'Approx travel time: 1–1.5 hours',
    ],
  },
  {
    icon: '🚌',
    title: 'By Bus',
    details: [
      'Kempegowda Bus Station (KSRTC/MRTC) — ~28 km',
      'BMTC buses available towards Kanakapura Road direction',
      'Get down at Art of Living bus stop, 21st km',
      'Auto-rickshaw available from main road',
    ],
  },
  {
    icon: '🚗',
    title: 'By Car / Cab',
    details: [
      'From Bengaluru city: Drive south on Kanakapura Road',
      'Cross Sri Sri School, continue for 3 km',
      'Look for Art of Living signboard on left',
      'Free parking available inside the Ashram campus',
    ],
  },
];

export default function HowToReachScreen() {
  const openMaps = () => {
    Linking.openURL('https://maps.google.com/?q=Art+of+Living+International+Ashram+Bangalore');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🚗</Text>
        <Text style={styles.headerTitle}>How to Reach</Text>
        <Text style={styles.headerSub}>Art of Living International Ashram, Bangalore</Text>
      </View>

      <View style={styles.addressCard}>
        <Text style={styles.addressTitle}>📍 Address</Text>
        <Text style={styles.addressText}>
          Art of Living International Center{'\n'}
          21st Km., Kanakapura Road{'\n'}
          Udayapura, Bangalore — 560082{'\n'}
          Karnataka, India
        </Text>
        <TouchableOpacity style={styles.mapBtn} onPress={openMaps}>
          <Text style={styles.mapBtnText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Transport Options</Text>
      {transportOptions.map((opt, i) => (
        <View key={i} style={styles.optionCard}>
          <Text style={styles.optionIcon}>{opt.icon}</Text>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{opt.title}</Text>
            {opt.details.map((d, j) => (
              <Text key={j} style={styles.optionDetail}>• {d}</Text>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.note}>
        <Text style={styles.noteTitle}>💡 Tip</Text>
        <Text style={styles.noteText}>
          Use "Art of Living International Ashram" in Google Maps / Ola / Uber for the most accurate directions.
          The campus entrance is on Kanakapura Road at the 21st kilometre.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  header: { backgroundColor: '#2d5016', padding: 28, alignItems: 'center' },
  headerEmoji: { fontSize: 48, marginBottom: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', fontFamily: 'serif' },
  headerSub: { fontSize: 13, color: '#8fbc5a', marginTop: 4 },
  addressCard: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 16, elevation: 3 },
  addressTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d5016', marginBottom: 8 },
  addressText: { fontSize: 14, color: '#555', lineHeight: 22, marginBottom: 16 },
  mapBtn: { backgroundColor: '#4a7c23', padding: 12, borderRadius: 10, alignItems: 'center' },
  mapBtnText: { color: '#fff', fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d5016', marginHorizontal: 20, marginBottom: 12 },
  optionCard: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 16, elevation: 2 },
  optionIcon: { fontSize: 28, marginRight: 14 },
  optionContent: { flex: 1 },
  optionTitle: { fontSize: 15, fontWeight: 'bold', color: '#2d5016', marginBottom: 6 },
  optionDetail: { fontSize: 13, color: '#555', lineHeight: 20 },
  note: { backgroundColor: '#f5f0e6', margin: 20, padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#8b6914' },
  noteTitle: { fontWeight: 'bold', color: '#2d5016', marginBottom: 6 },
  noteText: { fontSize: 13, color: '#555', lineHeight: 20 },
});
