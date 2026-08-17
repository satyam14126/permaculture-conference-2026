import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking
} from 'react-native';
import { volunteerContacts } from '../data/conferenceData';

export default function ContactScreen() {
  const call = (phone) => Linking.openURL(`tel:${phone}`);
  const whatsapp = (phone) => Linking.openURL(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>📞</Text>
        <Text style={styles.headerTitle}>Volunteer Contacts</Text>
        <Text style={styles.headerSub}>Need help? Reach out to our team</Text>
      </View>

      {volunteerContacts.map((cat) => (
        <View key={cat.id} style={styles.categoryCard}>
          <View style={styles.catHeader}>
            <Text style={styles.catIcon}>{cat.icon}</Text>
            <Text style={styles.catTitle}>{cat.name}</Text>
          </View>
          {cat.contacts.map((c, i) => (
            <View key={i} style={styles.contactRow}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{c.name}</Text>
                <Text style={styles.contactDesc}>{c.desc}</Text>
                <Text style={styles.contactPhone}>{c.phone}</Text>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => call(c.phone)}>
                  <Text style={styles.actionText}>📞</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => whatsapp(c.phone)}>
                  <Text style={styles.actionText}>💬</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.emergency}>
        <Text style={styles.emergencyTitle}>🆘 Emergency</Text>
        <Text style={styles.emergencyText}>
          For any medical emergency or urgent security concern during the conference,
          contact the Registration Desk immediately or dial the Ashram helpline.
        </Text>
        <TouchableOpacity
          style={styles.emergencyBtn}
          onPress={() => call('+91-97391 19591')}
        >
          <Text style={styles.emergencyBtnText}>Call Helpline</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          📧 info@aolpermaculture.in{'\n'}
          📞 +91-97391 19591
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
  categoryCard: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: 16, borderRadius: 14, padding: 18, elevation: 3 },
  catHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 10 },
  catIcon: { fontSize: 24, marginRight: 10 },
  catTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d5016' },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 14, fontWeight: '600', color: '#333' },
  contactDesc: { fontSize: 12, color: '#888', marginTop: 2 },
  contactPhone: { fontSize: 13, color: '#4a7c23', fontWeight: '500', marginTop: 2 },
  contactActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(74,124,35,0.1)', alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: 18 },
  emergency: { margin: 20, backgroundColor: '#fff3f3', padding: 18, borderRadius: 14, borderLeftWidth: 4, borderLeftColor: '#d32f2f' },
  emergencyTitle: { fontSize: 16, fontWeight: 'bold', color: '#d32f2f', marginBottom: 8 },
  emergencyText: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 14 },
  emergencyBtn: { backgroundColor: '#d32f2f', padding: 12, borderRadius: 10, alignItems: 'center' },
  emergencyBtnText: { color: '#fff', fontWeight: 'bold' },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 22 },
});
