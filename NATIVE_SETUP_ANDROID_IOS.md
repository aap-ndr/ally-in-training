# Android + iOS Local Setup Guide

This guide is for setting up the client source code on your own machine in the simplest possible way.

If you are not very technical, follow the steps in order and do not skip ahead. The goal is:
- install the required tools
- open the project
- install project packages
- run the app on iPhone simulator or Android emulator

## Quick Start for Beginners

### What you need first
- A Mac computer if you want to run iPhone locally
- Internet connection
- Access to Terminal on macOS
- Around 20 to 30 GB free disk space because Xcode and Android Studio are large

### Install these tools

#### 1. Install Homebrew
Homebrew helps install the other tools.

Open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Check it worked:

```bash
brew --version
```

#### 2. Install Node.js
This project needs Node.js even though it uses Bun for package management.

```bash
brew install node
node -v
```

#### 3. Install Bun
This project uses Bun instead of npm.

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.zshrc
bun -v
```

If `bun -v` does not work, close Terminal and open it again, then retry.

#### 4. Install Watchman
Watchman helps React Native detect file changes.

```bash
brew install watchman
watchman --version
```

#### 5. Install Xcode
Needed for iPhone simulator and iOS builds.

Steps:
1. Open the App Store.
2. Search for Xcode.
3. Install it.
4. Open Xcode once and accept the license.

Then run:

```bash
xcode-select --install
```

#### 6. Install CocoaPods
Needed for iOS native dependencies.

```bash
sudo gem install cocoapods
pod --version
```

#### 7. Install Android Studio
Needed for Android emulator and Android builds.

After installation, open Android Studio and install:
- Android SDK
- Android SDK Platform
- Android SDK Build-Tools
- Android Emulator

Create one Android emulator device from Android Studio so you can test the app.

## Local Project Setup

### 1. Open the project folder
In Terminal, go to the project folder:

```bash
cd /Users/viralmer/Documents/GitHub/ally-in-training
```

### 2. Install JavaScript packages

```bash
bun install
```

Wait until it completes. This may take a few minutes the first time.

### 3. Install iOS pods

```bash
cd ios
pod install
cd ..
```

### 4. Start the app
This project uses Expo native run commands.

For iPhone simulator:

```bash
bunx expo run:ios
```

For Android emulator:

```bash
bunx expo run:android
```

## First Run Checklist

Use this checklist if you want the shortest path:
1. Install Homebrew.
2. Install Node.js.
3. Install Bun.
4. Install Watchman.
5. Install Xcode.
6. Install CocoaPods.
7. Install Android Studio.
8. Open this project in Terminal.
9. Run `bun install`.
10. Run `cd ios && pod install && cd ..`.
11. Run `bunx expo run:ios` or `bunx expo run:android`.

## If Something Fails

### Problem: `bun` command not found
Fix:
1. Close Terminal.
2. Open Terminal again.
3. Run `bun -v`.

### Problem: `pod install` fails
Fix:
1. Make sure Xcode is installed and opened once.
2. Run `xcode-select --install`.
3. Retry `cd ios && pod install`.

### Problem: iOS simulator does not open
Fix:
1. Open Xcode.
2. Open the simulator from Xcode.
3. Retry `bunx expo run:ios`.

### Problem: Android emulator is not found
Fix:
1. Open Android Studio.
2. Start your emulator manually.
3. Retry `bunx expo run:android`.

### Problem: package install fails
Fix:
1. Confirm internet is working.
2. Confirm you are inside the project folder.
3. Retry `bun install`.

## What Each Main Command Means

```bash
bun install
```
Downloads all app packages.

```bash
cd ios && pod install && cd ..
```
Downloads iPhone native packages.

```bash
bunx expo run:ios
```
Builds and opens the app on the iPhone simulator.

```bash
bunx expo run:android
```
Builds and opens the app on the Android emulator.

## Recommended Order for a Non-Technical User
1. Complete all tool installations first.
2. Restart your Mac once.
3. Open Terminal.
4. Go to the project folder.
5. Run `bun install`.
6. Run `pod install` inside the `ios` folder.
7. Test iPhone first because macOS handles iOS more smoothly.
8. Test Android after that.

## 1) Current Project Version Snapshot

This section is useful if you or a developer need to verify versions later.

### JavaScript and React Native
- Expo SDK: `53.0.27` (from `package.json`)
- React Native: `0.79.6` (from `package.json`)
- React: `19.0.0` (from `package.json`)

### Android
- Gradle Wrapper: `8.13` (from `android/gradle/wrapper/gradle-wrapper.properties`)
- Android Gradle Plugin (AGP): currently **not pinned** in `android/build.gradle`
- Kotlin Gradle Plugin: currently **not pinned** in `android/build.gradle`
- Kotlin Android plugin applied in app module: `org.jetbrains.kotlin.android`
- App ID / namespace: `com.youthfornd.ally`
- versionCode: `9`
- versionName: `1.0.0`
- `compileSdk`, `targetSdkVersion`, `minSdkVersion`: coming from `rootProject.ext` (managed by Expo/React Native tooling)

### iOS
- Pod platform target: `15.1` (from `ios/Podfile` fallback and `ios/AllyinTraining.xcodeproj/project.pbxproj`)
- Swift version: `5.0` (from `ios/AllyinTraining.xcodeproj/project.pbxproj`)
- CocoaPods lockfile version: `1.16.2` (from `ios/Podfile.lock`)
- Bundle ID: `com.youthfornd.ally`
- CFBundleShortVersionString: `1.0.1`
- CFBundleVersion: `5`

## 2) Local Machine Requirements

### Common
- macOS (for iOS builds)
- Bun installed (project uses Bun)
- Node.js LTS installed
- Watchman installed (recommended for React Native)

### Android (Android Studio)
- Android Studio (latest stable)
- JDK 17 (required for modern Android Gradle Plugin)
- Android SDK Platform and Build Tools installed via SDK Manager
- Android emulator image installed (for local testing)

### iOS (Xcode)
- Xcode (latest stable)
- Xcode Command Line Tools
- CocoaPods (recommended to match lockfile major/minor behavior)

## 3) Initial Setup Commands

From project root:

```bash
bun install
```

For iOS pods:

```bash
cd ios
pod install
cd ..
```

Run Android:

```bash
bunx expo run:android
```

Run iOS:

```bash
bunx expo run:ios
```

## 4) How to Change Android Versions

### A) Change Gradle Wrapper version
Edit:
- `android/gradle/wrapper/gradle-wrapper.properties`

Update `distributionUrl`, for example:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.14-bin.zip
```

### B) Pin AGP and Kotlin versions explicitly (optional but controlled)
Edit:
- `android/build.gradle`

Current classpaths are unpinned. To pin versions, change to:

```gradle
buildscript {
  dependencies {
    classpath("com.android.tools.build:gradle:8.7.3")
    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:2.0.21")
    classpath("com.facebook.react:react-native-gradle-plugin")
  }
}
```

Important:
- Keep Gradle wrapper and AGP compatible.
- Keep Kotlin compatible with AGP and Expo/RN ecosystem.

### C) Change app versionCode / versionName
Edit:
- `android/app/build.gradle`

```gradle
defaultConfig {
  versionCode 10
  versionName "1.0.2"
}
```

### D) Change SDK levels (if needed)
This project reads SDK values from `rootProject.ext` (Expo-managed flow). Recommended path:
- Configure via `expo-build-properties` plugin in `app.json`.

Example plugin config:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 35,
            "targetSdkVersion": 35,
            "minSdkVersion": 24,
            "kotlinVersion": "2.0.21"
          }
        }
      ]
    ]
  }
}
```

After changing native build config, regenerate/sync native project as needed.

## 5) How to Change iOS Versions and Pod Settings

### A) Change iOS deployment target
Edit both:
- `ios/Podfile`
- `ios/AllyinTraining.xcodeproj/project.pbxproj`

In `Podfile`:

```ruby
platform :ios, '15.1'
```

In `project.pbxproj`, update all `IPHONEOS_DEPLOYMENT_TARGET = ...` entries to the same value.

Then run:

```bash
cd ios
pod install
cd ..
```

### B) Change app version and build number
Edit:
- `ios/AllyinTraining/Info.plist`

```xml
<key>CFBundleShortVersionString</key>
<string>1.0.2</string>
<key>CFBundleVersion</key>
<string>6</string>
```

Also keep Xcode project values aligned if needed:
- `MARKETING_VERSION` in `ios/AllyinTraining.xcodeproj/project.pbxproj`
- `CURRENT_PROJECT_VERSION` in `ios/AllyinTraining.xcodeproj/project.pbxproj`

### C) Change bundle identifier
Update all places:
- `app.json` → `expo.ios.bundleIdentifier`
- `app.json` → `expo.android.package`
- `ios/AllyinTraining.xcodeproj/project.pbxproj` → `PRODUCT_BUNDLE_IDENTIFIER`
- `android/app/build.gradle` → `applicationId` and `namespace`

### D) Info.plist permissions and keys
Edit:
- `ios/AllyinTraining/Info.plist`

#### Permission audit (checked on 4 May 2026)

Required now (based on current code):
- `NSPhotoLibraryAddUsageDescription` (required for `MediaLibrary.saveToLibraryAsync` in `src/screens/CertificateScreen.tsx`)

Present in project today (keep only if feature is still used):
- `NSCameraUsageDescription`
- `NSContactsUsageDescription`
- `NSLocationWhenInUseUsageDescription`
- `NSCalendarsUsageDescription`
- `NSCalendarsFullAccessUsageDescription`
- `NSRemindersUsageDescription`
- `NSRemindersFullAccessUsageDescription`
- `NSLocalNetworkUsageDescription`

Optional but commonly needed depending on feature:
- `NSPhotoLibraryUsageDescription` (needed if app reads/picks photos, not just saves)
- `NSMicrophoneUsageDescription` (needed for voice recording)

Example keys:

```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Ally in Training saves your certificate image to your Photos library when you choose Save.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Ally in Training accesses your photos only when you choose to select an image.</string>

<key>NSMicrophoneUsageDescription</key>
<string>Ally in Training uses your microphone only when you choose voice input features.</string>
```

How to check if a permission is still required:
1. Search code for runtime permission requests and native API usage.
2. Keep only keys for features that are actually reachable in production.
3. If you remove a feature, remove its unused key from `Info.plist`.
4. Rebuild on iOS and test the feature flow that should trigger each prompt.

Keep descriptions clear and user-facing for App Store review.

## 6) Safe Upgrade Order (Recommended)

1. Update Expo and React Native first (if needed).
2. Update Gradle wrapper.
3. Update AGP and Kotlin (if you pin them).
4. Update iOS deployment target.
5. Run pod install.
6. Build Android and iOS.
7. Commit only after both platforms compile successfully.

## 7) Troubleshooting Quick Notes

### Android sync/build failures
- Verify JDK is 17.
- Verify Gradle wrapper and AGP compatibility.
- If classpath is unpinned, keep Expo-managed defaults unless you have a specific reason.

### iOS pod issues
- Run `pod repo update` then `pod install`.
- Ensure deployment target is consistent across Podfile and Xcode project.
- Ensure CocoaPods is up to date enough for lockfile and Xcode toolchain.

### Version mismatch between JS and native
- Keep `package.json` Expo/RN versions aligned with native project configuration.
- After version changes, reinstall pods and clean build folders when required.

## 8) File Map (Where to Change What)

- Gradle Wrapper: `android/gradle/wrapper/gradle-wrapper.properties`
- AGP and Kotlin classpath: `android/build.gradle`
- Android app ID/version: `android/app/build.gradle`
- iOS deployment target (pods): `ios/Podfile`
- iOS deployment target/build settings: `ios/AllyinTraining.xcodeproj/project.pbxproj`
- iOS app version/build and permissions: `ios/AllyinTraining/Info.plist`
- Cross-platform identifiers and Expo metadata: `app.json`

---
If you want, this guide can be converted into a strict pinned compatibility matrix (Gradle/AGP/Kotlin/JDK/Xcode/CocoaPods) for your CI and team onboarding.