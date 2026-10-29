# Ally in Training™ Mobile App

A fun, gamified neurodiversity app designed by youth, for youth to build real empathy and allyship between neurotypical and neurodivergent friends. 

Designed and developed by Aashna Parsa, founder of [Youth for Neurodiversity](https://YouthforND.org) as a cross-platform (iOS & Android) React Native app built with Expo SDK 53. The app was first unveiled in April 2026 at the statewide California School Health and Behavioral Health conference, followed by the 2026 NeuroTech Frontiers Summit, Stanford Neurodiversity Summit, and the International Youth Conference held at UCLA.

Rooted in the neuroscience of empathy and motto “Nothing About Us Without Us,” this map-based adventure takes you through themed worlds with interactive scenarios, quizzes, and games that make learning allyship feel like play 💛

**Explore 9 interactive Worlds**

- Strengths Arena
- Island of Autism Awareness
- ADHD Adventure Park
- Dyslexia Discovery
- Sensory World
- Communication Forest
- Executive Function Mountain
- Tourette Syndrome World
- Down Syndrome World

**Why this matters**:

Neurodivergent youth face higher rates of bullying, isolation, and mental health challenges. Nearly 20% of autistic teens experience depression (vs. 8% neurotypical). Many hide their differences in school and college, often without support.

**Developer Aashna Parsa's note:**

“Having navigated neurodivergence and hand disability, I’ve seen how powerful peer support can be. I created Ally in Training™ so youth can step up for each other and build real empathy. I hope you enjoy the app. Reach out via [YND](https://YouthforND.org) if you want to collaborate or extend the app.”

## Features
- Onboarding QuickTour with persistent user name storage
- Home screen with personalized greeting and progress
- Interactive guides and worlds
- Collectible concept cards and badges
- Daily streak and XP system
- Profile avatar customization
- Modern UI with gradients and smooth navigation
- Robust state management with Zustand + AsyncStorage
- (Optional) RAG-Based Brain Buddy AI Chatbot

## Tech Stack
- **React Native 0.79.6** (Expo SDK 53)
- **TypeScript**
- **Zustand** for state management
- **AsyncStorage** for persistence
- **Nativewind (Tailwind CSS)** for styling
- **@react-navigation/native-stack** for navigation
- **react-native-reanimated v3** for animations
- **@expo/vector-icons** for icons

## Project Structure
```
mobile/
├── assets/                # Images and icons
├── src/
│   ├── api/              # API clients and integrations
│   ├── components/       # Reusable UI components
│   ├── navigation/       # Navigation setup
│   ├── screens/          # App screens
│   ├── state/            # Zustand stores
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── android/              # Android native project
├── ios/                  # iOS native project
├── App.tsx               # App entry point
├── README.md             # Project documentation
└── ...
```

## Setup & Development
1. **Install dependencies:**
   ```sh
   bun install
   ```
2. **Install iOS pods:**
   ```sh
   cd ios
   pod install
   cd ..
   ```
3. **Run on Android:**
   ```sh
   bunx expo run:android
   ```
4. **Run on iOS:**
   ```sh
   bunx expo run:ios
   ```

## Native Setup and Version Management
- For Android Studio and Xcode setup requirements, native version matrix, CocoaPods notes, Info.plist keys, and step-by-step instructions on how to change Gradle/Kotlin/deployment target/version values, see `NATIVE_SETUP_ANDROID_IOS.md`.

