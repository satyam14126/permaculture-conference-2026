import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView
} from 'react-native';
import { speakerImages, gurudevHeroImage } from '../assets/speakerImages';

export default function SpeakerDetailScreen({ route, navigation, speaker: propSpeaker, onBack }) {
  const speaker = route?.params?.speaker || propSpeaker || {};
  const handleBack = onBack || (() => navigation?.goBack());

  const photoSource = speakerImages[speaker.id] || (speaker.id === '2' ? gurudevHeroImage : null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            {photoSource ? (
              <Image source={photoSource} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarEmoji}>{speaker.image || '👤'}</Text>
              </View>
            )}
          </View>

          <Text style={styles.name}>{speaker.name || 'Distinguished Speaker'}</Text>
          <Text style={styles.role}>{speaker.role || 'National Permaculture Conference 2026'}</Text>
        </View>

        {/* Topic Card */}
        {speaker.topic ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Keynote / Session Topic</Text>
            <View style={styles.topicCard}>
              <Text style={styles.topicBadge}>🎤 PRESENTATION</Text>
              <Text style={styles.topicText}>{speaker.topic}</Text>
            </View>
          </View>
        ) : null}

        {/* Biography */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biography & Background</Text>
          <View style={styles.bioCard}>
            <Text style={styles.bio}>
              {speaker.bio || 'Keynote speaker and expert contributor at the National Permaculture Conference 2026.'}
            </Text>
          </View>
        </View>

        {/* Expertise Tags */}
        {speaker.expertise && speaker.expertise.length > 0 ? (
          <View style={[styles.section, { marginBottom: 30 }]}>
            <Text style={styles.sectionTitle}>Areas of Expertise</Text>
            <View style={styles.expertiseRow}>
              {speaker.expertise.map((exp, i) => (
                <View key={i} style={styles.expertiseTag}>
                  <Text style={styles.expertiseText}>🌱 {exp}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1d3910' },
  container: { flex: 1, backgroundColor: '#faf8f2' },
  header: {
    backgroundColor: '#1d3910',
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 14,
  },
  backText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#c4e29c',
    overflow: 'hidden',
    marginBottom: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: '#2d5016',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  role: {
    fontSize: 13,
    color: '#a8d774',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 18,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  topicCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#8b6914',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  topicBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8b6914',
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  topicText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    fontWeight: '600',
  },
  bioCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bio: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 22,
  },
  expertiseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expertiseTag: {
    backgroundColor: '#e6f2dc',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c6e0b4',
  },
  expertiseText: {
    fontSize: 12,
    color: '#2d5016',
    fontWeight: '600',
  },
});
