import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CONFERENCE_DATE = new Date('2026-08-22T08:00:00+05:30').getTime();

export default function CountdownTimer({ size = 'normal', style }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const total = CONFERENCE_DATE - Date.now();
    if (total <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
    }
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds, isLive: false };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isLarge = size === 'large';

  if (timeLeft.isLive) {
    return (
      <View style={[styles.container, isLarge && styles.containerLarge, style]}>
        <Text style={[styles.liveBadge, isLarge && styles.liveBadgeLarge]}>🌿 Event in Progress Live!</Text>
      </View>
    );
  }

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={[styles.headerLabel, isLarge && styles.headerLabelLarge]}>
        ⏳ CONFERENCE COUNTDOWN
      </Text>
      <View style={[styles.timerRow, isLarge && styles.timerRowLarge]}>
        <View style={[styles.timeBox, isLarge && styles.timeBoxLarge]}>
          <Text style={[styles.timeNumber, isLarge && styles.timeNumberLarge]}>
            {timeLeft.days}
          </Text>
          <Text style={[styles.timeUnit, isLarge && styles.timeUnitLarge]}>DAYS</Text>
        </View>

        <Text style={[styles.colon, isLarge && styles.colonLarge]}>:</Text>

        <View style={[styles.timeBox, isLarge && styles.timeBoxLarge]}>
          <Text style={[styles.timeNumber, isLarge && styles.timeNumberLarge]}>
            {pad(timeLeft.hours)}
          </Text>
          <Text style={[styles.timeUnit, isLarge && styles.timeUnitLarge]}>HOURS</Text>
        </View>

        <Text style={[styles.colon, isLarge && styles.colonLarge]}>:</Text>

        <View style={[styles.timeBox, isLarge && styles.timeBoxLarge]}>
          <Text style={[styles.timeNumber, isLarge && styles.timeNumberLarge]}>
            {pad(timeLeft.minutes)}
          </Text>
          <Text style={[styles.timeUnit, isLarge && styles.timeUnitLarge]}>MINS</Text>
        </View>

        <Text style={[styles.colon, isLarge && styles.colonLarge]}>:</Text>

        <View style={[styles.timeBox, isLarge && styles.timeBoxLarge]}>
          <Text style={[styles.timeNumber, isLarge && styles.timeNumberLarge]}>
            {pad(timeLeft.seconds)}
          </Text>
          <Text style={[styles.timeUnit, isLarge && styles.timeUnitLarge]}>SECS</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 8,
  },
  headerLabel: {
    color: '#8fbc5a',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  headerLabelLarge: {
    color: '#a8d774',
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  timerRowLarge: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  timeBox: {
    alignItems: 'center',
    minWidth: 44,
  },
  timeBoxLarge: {
    minWidth: 62,
  },
  timeNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  timeNumberLarge: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  timeUnit: {
    color: '#c4e29c',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  timeUnitLarge: {
    color: '#c4e29c',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.8,
  },
  colon: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 4,
    paddingBottom: 10,
  },
  colonLarge: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 22,
    marginHorizontal: 6,
    paddingBottom: 14,
  },
  liveBadge: {
    color: '#fff',
    backgroundColor: '#4a7c23',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 14,
  },
  liveBadgeLarge: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    fontSize: 17,
  },
});
