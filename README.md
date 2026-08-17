# Permaculture Conference 2026 - Android App

Official Android app for the **National Permaculture Conference 2026** — *From Seeds to Sustainability*, organized by Art of Living Permaculture Institute.

**Date:** August 22 & 23, 2026 | **Venue:** Art of Living International Ashram, Bangalore

## Features

- 🔐 **Authentication** — Phone number or email with OTP
- 📋 **Full Program** — Day-wise schedule with sessions, speakers, timings
- 👤 **Speaker Profiles** — Detailed bios and expertise
- 🗺️ **Ashram Map** — Key locations with directions (venue, kitchen, accommodation)
- 🚗 **How to Reach** — Transport options (air, train, bus, car)
- 📞 **Volunteer Contacts** — Housing, food, event, transport, emergency

## Tech Stack

- React Native 0.72
- React Navigation (Bottom Tabs + Native Stack)
- AsyncStorage for auth persistence
- GitHub Actions for CI/CD

## Build & Run

```bash
npm install --legacy-peer-deps
npx react-native run-android
```

## GitHub Actions

Every push to `main` builds the debug APK automatically. Download from **Actions → Artifacts**.

## Conference Content

All program data sourced from [aolpermaculture.in](https://aolpermaculture.in) and [artofliving.org](https://www.artofliving.org).
