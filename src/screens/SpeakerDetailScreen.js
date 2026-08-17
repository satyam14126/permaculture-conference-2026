import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';

export default function SpeakerDetailScreen({ route, navigation }) {
  const { speaker } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {navigation?.canGoBack && navigation.canGoBack() && (
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backBtnText}>← Back to Program</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.image}>{speaker.image}</Text>
          <Text style={styles.name}>{speaker.name}</Text>
          <Text style={styles.role}>{speaker.role}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Keynote / Session Topic</Text>
          <View style={styles.topicCard}>
            <Text style={styles.topicText}>🎤 {speaker.topic}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Speaker</Text>
          <Text style={styles.bio}>{speaker.bio}</Text>
        </View>

        {speaker.expertise && speaker.expertise.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Expertise</Text>
            <View style={styles.expertiseRow}>
              {speaker.expertise.map((exp, i) => (
                <View key={i} style={styles.expertiseTag}>
                  <Text style={styles.expertiseText}>{exp}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#2d5016' },
  container: { flex: 1, backgroundColor: '#faf8f2' },
  header: { backgroundColor: '#2d5016', padding: 24, paddingTop: 16, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: 16 },
  backBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  image: { fontSize: 60, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', fontFamily: 'serif' },
  role: { fontSize: 13, color: '#8fbc5a', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  section: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d5016', marginBottom: 10 },
  topicCard: { backgroundColor: '#f5f0e6', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#8b6914' },
  topicText: { fontSize: 14, color: '#444', lineHeight: 22, fontWeight: '500' },
  bio: { fontSize: 14, color: '#555', lineHeight: 22 },
  expertiseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4, marginBottom: 24 },
  expertiseTag: { backgroundColor: 'rgba(74,124,35,0.1)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  expertiseText: { fontSize: 12, color: '#4a7c23', fontWeight: '600' },
});
