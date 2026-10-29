# How to Run and Publish Ally in Training

## Option 1: Run Locally

### Prerequisites
- Node.js (v18 or higher)
- Bun (preferred) or npm
- Expo CLI
- iOS Simulator (Mac) or Android Emulator / device

### Steps
1. Open a terminal in the project folder:
   ```bash
   cd path/to/ally-in-training
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Install iOS pods (Mac only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. Start the development server:
   ```bash
   bun start
   ```

5. Run on a device or simulator:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Or use Expo Go / a development build on a physical device

For native Android/iOS setup details, see `NATIVE_SETUP_ANDROID_IOS.md`.

## Option 2: Publish to App Stores

Use Expo Application Services (EAS):

1. Install and log in:
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```

2. Build:
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

3. Submit:
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

### Requirements for Publishing
- **Apple Developer Account** ($99/year) for iOS
- **Google Play Developer Account** ($25 one-time) for Android
- App icons, screenshots, descriptions
- Privacy policy (required for apps handling user data)

## Project Structure
```
ally-in-training/
├── App.tsx                   # Main app entry point
├── package.json              # Dependencies
├── README.md                 # Full documentation
├── src/
│   ├── api/                  # API clients and integrations
│   ├── components/           # Reusable UI components
│   ├── navigation/           # Navigation setup
│   ├── screens/              # All app screens
│   ├── state/                # Zustand state management
│   ├── types/                # TypeScript types
│   └── utils/                # Helper functions
├── android/                  # Android native project
├── ios/                      # iOS native project
└── assets/                   # Images and media
```

## Need Help?

- Check `README.md` for technical documentation
- Check `NATIVE_SETUP_ANDROID_IOS.md` for native tooling and version notes
