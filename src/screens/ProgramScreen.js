import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';
import { schedule, speakers } from '../data/conferenceData';
import { speakerImages } from '../assets/speakerImages';

const typeColors = {
  keynote: '#8b6914',
  talk: '#4a7c23',
  workshop: '#2d5016',
  break: '#888888',
  general: '#555555',
  activity: '#6b4e1a',
};

const typeLabels = {
  keynote: '🎤 Keynote',
  talk: '💬 Talk',
  workshop: '🛠️ Workshop',
  break: '☕ Break',
  general: '📌 General',
  activity: '🚶 Activity',
};

const findSpeakerForSession = (session) => {
  if (!session.speaker) return null;
  const speakerText = session.speaker.toLowerCase();
  return speakers.find((s) => {
    const nameLower = s.name.toLowerCase();
    const parts = nameLower.split(/[\s.,()]+/);
    return parts.some((part) => part.length >= 4 && speakerText.includes(part));
  });
};

function SessionCard({ session, onSpeakerPress }) {
  const matchedSpeaker = findSpeakerForSession(session);
  const photo = matchedSpeaker ? speakerImages[matchedSpeaker.id] : null;

  return (
    <View style={styles.sessionCard}>
      <View style={styles.timeCol}>
        <Text style={styles.timeText}>{session.time}</Text>
      </View>
      <View style={styles.contentCol}>
        <View style={[styles.typeBadge, { backgroundColor: (typeColors[session.type] || '#4a7c23') + '20' }]}>
          <Text style={[styles.typeText, { color: typeColors[session.type] || '#4a7c23' }]}>
            {typeLabels[session.type] || session.type}
          </Text>
        </View>
        <Text style={styles.sessionTitle}>{session.title}</Text>
        {session.speaker && (
          <TouchableOpacity
            style={styles.speakerRow}
            onPress={() => {
              if (matchedSpeaker) onSpeakerPress(matchedSpeaker);
            }}
            disabled={!matchedSpeaker}
            activeOpacity={0.7}
          >
            {photo ? (
              <Image source={photo} style={styles.sessionSpeakerThumb} />
            ) : (
              <Text style={styles.speakerEmojiIcon}>👤</Text>
            )}
            <Text style={[styles.speakerText, matchedSpeaker && styles.speakerTextLink]}>
              {session.speaker} {matchedSpeaker ? ' ›' : ''}
            </Text>
          </TouchableOpacity>
        )}
        {session.location && <Text style={styles.locationText}>📍 {session.location}</Text>}
      </View>
    </View>
  );
}

// 6 per screen 2-column Grid Tile for Speakers
function SpeakerTile({ speaker, onPress }) {
  const photo = speakerImages[speaker.id];

  return (
    <TouchableOpacity
      style={styles.speakerTile}
      onPress={() => onPress(speaker)}
      activeOpacity={0.7}
    >
      <View style={styles.tileImageWrapper}>
        {photo ? (
          <Image source={photo} style={styles.tileImage} />
        ) : (
          <View style={styles.tileImageFallback}>
            <Text style={styles.tileEmoji}>{speaker.image || '👤'}</Text>
          </View>
        )}
      </View>

      <Text style={styles.tileName} numberOfLines={1}>{speaker.name}</Text>
      <Text style={styles.tileRole} numberOfLines={2}>{speaker.role}</Text>

      <View style={styles.tileTopicPill}>
        <Text style={styles.tileTopicText} numberOfLines={1}>
          🎤 {speaker.topic}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ProgramScreen({ navigation, route }) {
  const initialTab = route?.params?.initialTab || 'schedule';
  const [viewMode, setViewMode] = useState(initialTab); // 'schedule' | 'speakers'
  const [activeDay, setActiveDay] = useState('day1');
  const data = schedule[activeDay];

  const handleSpeakerPress = (sp) => {
    if (sp) {
      navigation.navigate('SpeakerDetail', { speaker: sp });
    }
  };

  return (
    <View style={styles.container}>
      {/* Top View Mode Switcher */}
      <View style={styles.mainToggle}>
        <TouchableOpacity
          style={[styles.mainToggleBtn, viewMode === 'schedule' && styles.mainToggleActive]}
          onPress={() => setViewMode('schedule')}
          activeOpacity={0.7}
        >
          <Text style={[styles.mainToggleText, viewMode === 'schedule' && styles.mainToggleTextActive]}>
            📋 Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainToggleBtn, viewMode === 'speakers' && styles.mainToggleActive]}
          onPress={() => setViewMode('speakers')}
          activeOpacity={0.7}
        >
          <Text style={[styles.mainToggleText, viewMode === 'speakers' && styles.mainToggleTextActive]}>
            👥 Speakers ({speakers.length})
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'schedule' ? (
        <>
          <View style={styles.dayToggle}>
            <TouchableOpacity
              style={[styles.dayBtn, activeDay === 'day1' && styles.dayActive]}
              onPress={() => setActiveDay('day1')}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayText, activeDay === 'day1' && styles.dayTextActive]}>Day 1</Text>
              <Text style={[styles.daySub, activeDay === 'day1' && styles.dayTextActive]}>Aug 22 • Saturday</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dayBtn, activeDay === 'day2' && styles.dayActive]}
              onPress={() => setActiveDay('day2')}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayText, activeDay === 'day2' && styles.dayTextActive]}>Day 2</Text>
              <Text style={[styles.daySub, activeDay === 'day2' && styles.dayTextActive]}>Aug 23 • Sunday</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dayDate}>{data.date}</Text>

          <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
            {data.sessions.map((session, index) => (
              <SessionCard
                key={index}
                session={session}
                onSpeakerPress={handleSpeakerPress}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 30, paddingTop: 6 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.speakersHeaderDesc}>
            Distinguished spiritual leaders, pioneering agriculturists, scientists, and ecological architects. Tap any speaker to view full biography and sessions.
          </Text>

          {/* 2-Column Grid (6 visible on screen) */}
          <View style={styles.speakerGrid}>
            {speakers.map((sp) => (
              <SpeakerTile key={sp.id} speaker={sp} onPress={handleSpeakerPress} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  mainToggle: {
    flexDirection: 'row',
    backgroundColor: '#e2ecd6',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    borderRadius: 12,
    padding: 4,
  },
  mainToggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  mainToggleActive: { backgroundColor: '#2d5016', elevation: 2 },
  mainToggleText: { fontSize: 13, fontWeight: '700', color: '#2d5016' },
  mainToggleTextActive: { color: '#ffffff' },
  dayToggle: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  dayBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  dayActive: { backgroundColor: '#4a7c23' },
  dayText: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  dayTextActive: { color: '#ffffff' },
  daySub: { fontSize: 11, color: '#888', marginTop: 2 },
  dayDate: { fontSize: 13, color: '#555', textAlign: 'center', marginVertical: 6, fontWeight: '600' },
  list: { flex: 1, paddingHorizontal: 14 },
  sessionCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  timeCol: { width: 75, paddingTop: 4 },
  timeText: { fontSize: 11, color: '#666', fontWeight: '700' },
  contentCol: { flex: 1 },
  typeBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginBottom: 6 },
  typeText: { fontSize: 10, fontWeight: '700' },
  sessionTitle: { fontSize: 14, fontWeight: '700', color: '#2d5016', marginBottom: 4 },
  speakerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingVertical: 2,
  },
  sessionSpeakerThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#c4e29c',
  },
  speakerEmojiIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  speakerText: { fontSize: 12, color: '#555', fontWeight: '500' },
  speakerTextLink: { color: '#2d5016', fontWeight: '700' },
  locationText: { fontSize: 11, color: '#888', marginTop: 3 },
  speakersHeaderDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    paddingHorizontal: 4,
    lineHeight: 18,
    textAlign: 'center',
  },
  speakerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  speakerTile: {
    width: '48.5%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#eef2e6',
  },
  tileImageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: '#4a7c23',
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#2d5016',
  },
  tileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tileImageFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileEmoji: {
    fontSize: 32,
  },
  tileName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: 3,
  },
  tileRole: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 6,
    height: 28,
  },
  tileTopicPill: {
    backgroundColor: '#f5efe0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    width: '100%',
  },
  tileTopicText: {
    fontSize: 9,
    color: '#8b6914',
    fontWeight: '700',
    textAlign: 'center',
  },
});
