import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { schedule, speakers } from '../data/conferenceData';

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

function SessionCard({ session, onPress }) {
  const matchedSpeaker = findSpeakerForSession(session);

  return (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => {
        if (matchedSpeaker) onPress(matchedSpeaker);
      }}
      activeOpacity={matchedSpeaker ? 0.7 : 1}
    >
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
          <Text style={styles.speakerText}>
            👤 {session.speaker} {matchedSpeaker ? ' ›' : ''}
          </Text>
        )}
        {session.location && <Text style={styles.locationText}>📍 {session.location}</Text>}
      </View>
    </TouchableOpacity>
  );
}

function SpeakerCard({ speaker, onPress }) {
  return (
    <TouchableOpacity style={styles.speakerCard} onPress={() => onPress(speaker)} activeOpacity={0.7}>
      <Text style={styles.speakerAvatar}>{speaker.image}</Text>
      <View style={styles.speakerInfo}>
        <Text style={styles.speakerCardName}>{speaker.name}</Text>
        <Text style={styles.speakerCardRole} numberOfLines={2}>{speaker.role}</Text>
        <Text style={styles.speakerCardTopic} numberOfLines={1}>🎤 {speaker.topic}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

export default function ProgramScreen({ navigation }) {
  const [viewMode, setViewMode] = useState('schedule'); // 'schedule' | 'speakers'
  const [activeDay, setActiveDay] = useState('day1');
  const data = schedule[activeDay];

  const handleSpeakerPress = (sp) => {
    if (sp) navigation.navigate('SpeakerDetail', { speaker: sp });
  };

  return (
    <View style={styles.container}>
      {/* Top View Mode Switcher */}
      <View style={styles.mainToggle}>
        <TouchableOpacity
          style={[styles.mainToggleBtn, viewMode === 'schedule' && styles.mainToggleActive]}
          onPress={() => setViewMode('schedule')}
        >
          <Text style={[styles.mainToggleText, viewMode === 'schedule' && styles.mainToggleTextActive]}>
            📋 Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainToggleBtn, viewMode === 'speakers' && styles.mainToggleActive]}
          onPress={() => setViewMode('speakers')}
        >
          <Text style={[styles.mainToggleText, viewMode === 'speakers' && styles.mainToggleTextActive]}>
            👤 Speakers ({speakers.length})
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'schedule' ? (
        <>
          <View style={styles.dayToggle}>
            <TouchableOpacity
              style={[styles.dayBtn, activeDay === 'day1' && styles.dayActive]}
              onPress={() => setActiveDay('day1')}
            >
              <Text style={[styles.dayText, activeDay === 'day1' && styles.dayTextActive]}>Day 1</Text>
              <Text style={[styles.daySub, activeDay === 'day1' && styles.dayTextActive]}>Aug 22 • Saturday</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dayBtn, activeDay === 'day2' && styles.dayActive]}
              onPress={() => setActiveDay('day2')}
            >
              <Text style={[styles.dayText, activeDay === 'day2' && styles.dayTextActive]}>Day 2</Text>
              <Text style={[styles.daySub, activeDay === 'day2' && styles.dayTextActive]}>Aug 23 • Sunday</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dayDate}>{data.date}</Text>

          <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 24 }}>
            {data.sessions.map((session, index) => (
              <SessionCard
                key={index}
                session={session}
                onPress={handleSpeakerPress}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}>
          <Text style={styles.speakersHeaderDesc}>
            Distinguished keynote speakers, pioneering agriculturists, scientists, and changemakers.
          </Text>
          {speakers.map((sp) => (
            <SpeakerCard key={sp.id} speaker={sp} onPress={handleSpeakerPress} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  mainToggle: { flexDirection: 'row', backgroundColor: '#e2ecd6', marginHorizontal: 16, marginTop: 14, marginBottom: 8, borderRadius: 10, padding: 3 },
  mainToggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  mainToggleActive: { backgroundColor: '#2d5016' },
  mainToggleText: { fontSize: 13, fontWeight: '600', color: '#2d5016' },
  mainToggleTextActive: { color: '#fff' },
  dayToggle: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  dayBtn: { flex: 1, padding: 12, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', elevation: 2 },
  dayActive: { backgroundColor: '#4a7c23' },
  dayText: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  dayTextActive: { color: '#fff' },
  daySub: { fontSize: 11, color: '#888', marginTop: 2 },
  dayDate: { fontSize: 13, color: '#666', textAlign: 'center', marginVertical: 6, fontWeight: '500' },
  list: { flex: 1, paddingHorizontal: 16 },
  sessionCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 2 },
  timeCol: { width: 75, paddingTop: 4 },
  timeText: { fontSize: 11, color: '#777', fontWeight: '600' },
  contentCol: { flex: 1 },
  typeBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginBottom: 6 },
  typeText: { fontSize: 10, fontWeight: '600' },
  sessionTitle: { fontSize: 14, fontWeight: '600', color: '#2d5016', marginBottom: 4 },
  speakerText: { fontSize: 12, color: '#4a7c23', marginTop: 2, fontWeight: '500' },
  locationText: { fontSize: 11, color: '#888', marginTop: 2 },
  speakersHeaderDesc: { fontSize: 13, color: '#666', marginBottom: 12, paddingHorizontal: 4, lineHeight: 18 },
  speakerCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 2, alignItems: 'center' },
  speakerAvatar: { fontSize: 36, marginRight: 12 },
  speakerInfo: { flex: 1 },
  speakerCardName: { fontSize: 15, fontWeight: 'bold', color: '#2d5016', marginBottom: 2 },
  speakerCardRole: { fontSize: 12, color: '#666', marginBottom: 4 },
  speakerCardTopic: { fontSize: 11, color: '#8b6914', fontWeight: '500' },
  chevron: { fontSize: 22, color: '#bbb', marginLeft: 8 },
});
