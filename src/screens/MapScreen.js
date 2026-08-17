import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking
} from 'react-native';
import { ashramLocations } from '../data/conferenceData';

export default function MapScreen() {
  const [selected, setSelected] = useState(null);

  const openInMaps = (loc) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🗺️</Text>
        <Text style={styles.headerTitle}>Ashram Map</Text>
        <Text style={styles.headerSub}>Art of Living International Centre, Bangalore</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapEmoji}>🌍</Text>
        <Text style={styles.mapText}>Interactive Map</Text>
        <Text style={styles.mapSub}>21st Km., Kanakapura Road, Udayapura, Bangalore 560082</Text>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => openInMaps({ lat: 12.8235, lng: 77.5140 })}
        >
          <Text style={styles.mapBtnText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>Key Locations</Text>
      {ashramLocations.map((loc) => (
        <TouchableOpacity
          key={loc.id}
          style={[styles.locCard, selected === loc.id && styles.locCardActive]}
          onPress={() => setSelected(selected === loc.id ? null : loc.id)}
        >
          <View style={styles.locHeader}>
            <Text style={styles.locIcon}>{loc.icon}</Text>
            <View style={styles.locInfo}>
              <Text style={styles.locName}>{loc.name}</Text>
              <Text style={styles.locDesc}>{loc.description}</Text>
            </View>
          </View>
          {selected === loc.id && (
            <TouchableOpacity
              style={styles.directionsBtn}
              onPress={() => openInMaps(loc)}
            >
              <Text style={styles.directionsText}>Get Directions →</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  header: { backgroundColor: '#2d5016', padding: 28, alignItems: 'center' },
  headerEmoji: { fontSize: 48, marginBottom: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', fontFamily: 'serif' },
  headerSub: { fontSize: 13, color: '#8fbc5a', marginTop: 4 },
  mapPlaceholder: { margin: 20, backgroundColor: '#e8f0dc', borderRadius: 16, padding: 32, alignItems: 'center', borderWidth: 2, borderColor: '#c5d9a5', borderStyle: 'dashed' },
  mapEmoji: { fontSize: 56, marginBottom: 12 },
  mapText: { fontSize: 18, fontWeight: 'bold', color: '#2d5016' },
  mapSub: { fontSize: 13, color: '#666', textAlign: 'center', marginTop: 6, marginBottom: 16 },
  mapBtn: { backgroundColor: '#4a7c23', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  mapBtnText: { color: '#fff', fontWeight: '600' },
  listTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d5016', marginHorizontal: 20, marginBottom: 12 },
  locCard: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 10, borderRadius: 12, padding: 16, elevation: 2 },
  locCardActive: { borderColor: '#4a7c23', borderWidth: 1.5 },
  locHeader: { flexDirection: 'row', alignItems: 'center' },
  locIcon: { fontSize: 28, marginRight: 14 },
  locInfo: { flex: 1 },
  locName: { fontSize: 15, fontWeight: '600', color: '#2d5016' },
  locDesc: { fontSize: 13, color: '#777', marginTop: 2 },
  directionsBtn: { marginTop: 12, alignSelf: 'flex-start', backgroundColor: 'rgba(74,124,35,0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  directionsText: { color: '#4a7c23', fontWeight: '600', fontSize: 13 },
});
