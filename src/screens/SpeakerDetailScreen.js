import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking
} from 'react-native';
import { speakers } from '../data/conferenceData';

export default function SpeakerDetailScreen({ route }) {
  const { speaker } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.image}>{speaker.image}</Text>
        <Text style={styles.name}>{speaker.name}</Text>
        <Text style={styles.role}>{speaker.role}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Session</Text>
        <View style={styles.topicCard}>
          <Text style={styles.topicText}>🎤 {speaker.topic}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{speaker.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expertise</Text>
        <View style={styles.expertiseRow}>
          {speaker.expertise.map((exp, i) => (
            <View key={i} style={styles.expertiseTag}>
              <Text style={styles.expertiseText}>{exp}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  header: { backgroundColor: '#2d5016', padding: 32, alignItems: 'center' },
  image: { fontSize: 64, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center', fontFamily: 'serif' },
  role: { fontSize: 13, color: '#8fbc5a', textAlign: 'center', marginTop: 6 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d5016', marginBottom: 12 },
  topicCard: { backgroundColor: '#f5f0e6', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#8b6914' },
  topicText: { fontSize: 14, color: '#555', lineHeight: 20 },
  bio: { fontSize: 14, color: '#555', lineHeight: 22 },
  expertiseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  expertiseTag: { backgroundColor: 'rgba(74,124,35,0.1)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  expertiseText: { fontSize: 12, color: '#4a7c23', fontWeight: '600' },
});
