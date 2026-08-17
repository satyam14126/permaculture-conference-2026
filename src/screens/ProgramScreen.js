import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList
} from 'react-native';
import { schedule, speakers } from '../data/conferenceData';

const typeColors = {
  keynote: '#8b6914',
  talk: '#4a7c23',
  workshop: '#2d5016',
  break: '#888',
  general: '#666',
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

function SessionCard({ session, onPress }) {
  return (
    <TouchableOpacity style={styles.sessionCard} onPress={onPress}>
      <View style={styles.timeCol}>
        <Text style={styles.timeText}>{session.time}</Text>
      </View>
      <View style={styles.contentCol}>
        <View style={[styles.typeBadge, { backgroundColor: typeColors[session.type] + '20' }]}>
          <Text style={[styles.typeText, { color: typeColors[session.type] }]}>
            {typeLabels[session.type]}
          </Text>
        </View>
        <Text style={styles.sessionTitle}>{session.title}</Text>
        {session.speaker && <Text style={styles.speakerText}>👤 {session.speaker}</Text>}
        {session.location && <Text style={styles.locationText}>📍 {session.location}</Text>}
      </View>
    </TouchableOpacity>
  );
}

export default function ProgramScreen({ navigation }) {
  const [activeDay, setActiveDay] = useState('day1');
  const data = schedule[activeDay];

  return (
    <View style={styles.container}>
      <View style={styles.dayToggle}>
        <TouchableOpacity
          style={[styles.dayBtn, activeDay === 'day1' && styles.dayActive]}
          onPress={() => setActiveDay('day1')}
        >
          <Text style={[styles.dayText, activeDay === 'day1' && styles.dayTextActive]}>Day 1</Text>
          <Text style={[styles.daySub, activeDay === 'day1' && styles.dayTextActive]}>Aug 22</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dayBtn, activeDay === 'day2' && styles.dayActive]}
          onPress={() => setActiveDay('day2')}
        >
          <Text style={[styles.dayText, activeDay === 'day2' && styles.dayTextActive]}>Day 2</Text>
          <Text style={[styles.daySub, activeDay === 'day2' && styles.dayTextActive]}>Aug 23</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.dayDate}>{data.date}</Text>

      <ScrollView style={styles.sessionsList}>
        {data.sessions.map((session, index) => (
          <SessionCard
            key={index}
            session={session}
            onPress={() => {
              if (session.speaker) {
                const sp = speakers.find(s => session.speaker.includes(s.name.split(' ').slice(-1)[0]));
                if (sp) navigation.navigate('SpeakerDetail', { speaker: sp });
              }
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f2' },
  dayToggle: { flexDirection: 'row', padding: 16, gap: 12 },
  dayBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', elevation: 2 },
  dayActive: { backgroundColor: '#4a7c23' },
  dayText: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  dayTextActive: { color: '#fff' },
  daySub: { fontSize: 12, color: '#888', marginTop: 2 },
  dayDate: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 12, fontWeight: '500' },
  sessionsList: { flex: 1, paddingHorizontal: 16 },
  sessionCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 2 },
  timeCol: { width: 70, paddingTop: 4 },
  timeText: { fontSize: 11, color: '#888', fontWeight: '600' },
  contentCol: { flex: 1 },
  typeBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginBottom: 6 },
  typeText: { fontSize: 10, fontWeight: '600' },
  sessionTitle: { fontSize: 14, fontWeight: '600', color: '#2d5016', marginBottom: 4 },
  speakerText: { fontSize: 12, color: '#555', marginTop: 2 },
  locationText: { fontSize: 11, color: '#888', marginTop: 2 },
});
