  import React, { useEffect, useState } from "react";
  import { View, Text, Pressable, ScrollView, Share, Image, Platform } from "react-native";
  import { Asset } from "expo-asset";
  import * as Sharing from "expo-sharing";

  const joinMovementImage = require("../../assets/join-the-movement.png");
  import JoinMovementIcon from "../components/JoinMovementIcon";
  import WebViewModal from "../components/WebViewModal";
  import { useNavigation } from "@react-navigation/native";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../navigation/RootNavigator";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { Ionicons } from "@expo/vector-icons";
  import { useUserProgress, useGameStore, useLevelName, useHasSeenTour, useUserName, useIsFirstLaunch, useHasShared } from "../state/gameStore";
  import { LinearGradient } from "expo-linear-gradient";
  import CharacterGuides from "../components/CharacterGuides";
  import AvatarDisplay from "../components/AvatarDisplay";
  import AppLogo from "../components/AppLogo";
  import QuickTour from "../components/QuickTour";
  import LevelProgressModal from "../components/LevelProgressModal";
  import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence,
  } from "react-native-reanimated";
  import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

  type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

  const GREETING_MESSAGES = [
    "Hi there!",
    "Hey friend!",
    "Ready to learn?",
    "Welcome!",
    "Let's go!",
    "Hello!",
    "Great to see you!",
    "You're amazing!",
    "Keep it up!",
    "Let's explore!",
    "You rock!",
    "Nice to see you!",
    "Learning time!",
    "Adventure awaits!",
    "What's up?",
    "So glad you're here!",
    "Woohoo!",
    "Let's do this!",
    "You're back!",
    "Yay, you're here!",
    "High five!",
    "Go team!",
  ];

  export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const insets = useSafeAreaInsets();
    const userProgress = useUserProgress();
    const levelName = useLevelName();
    const hasSeenTour = useHasSeenTour();
    const userName = useUserName();
    const isFirstLaunch = useIsFirstLaunch();
    const hasShared = useHasShared();
    const updateStreak = useGameStore((s) => s.updateStreak);
    const markTourComplete = useGameStore((s) => s.markTourComplete);
    const markFirstLaunchComplete = useGameStore((s) => s.markFirstLaunchComplete);
    const markShared = useGameStore((s) => s.markShared);
    const [showBubble, setShowBubble] = useState(true);
    // Show QuickTour only if userName is missing
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [greeting] = useState(GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)]);

    const bubbleScale = useSharedValue(0);
    const bubbleOpacity = useSharedValue(0);
    const [showTour, setShowTour] = useState(false);
    const [showWebView, setShowWebView] = useState(false);



    useEffect(() => {
      // Update streak when app opens
      AsyncStorage.getItem("hasSeenTour").then((value) => {
        if (value === "1") {
              setShowTour(false);
        } else {
              setShowTour(true);
        }
      });
      updateStreak();
      
      // After first visit, mark so "Welcome back!" shows on next open
      if (isFirstLaunch) {
        markFirstLaunchComplete();
      }

      // Animate speech bubble on mount
      bubbleScale.value = withDelay(500, withSequence(
        withTiming(1.1, { duration: 200 }),
        withTiming(1, { duration: 100 })
      ));
      bubbleOpacity.value = withDelay(500, withTiming(1, { duration: 200 }));

      // Hide bubble after 4 seconds
      const timer = setTimeout(() => {
        bubbleOpacity.value = withTiming(0, { duration: 300 });
        setTimeout(() => setShowBubble(false), 300);
      }, 4000);

      return () => clearTimeout(timer);
    }, []);

    const bubbleAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: bubbleScale.value }],
      opacity: bubbleOpacity.value,
    }));

    const handleTourComplete = () => {
     
       AsyncStorage.setItem("hasSeenTour", "1");
       setShowTour(false);
       markTourComplete();
      // No need to setShowTour, showTour is now derived
    };

    return (
      <View className="flex-1 bg-slate-50">
        {/* Quick Tour for new users */}
        <QuickTour visible={showTour} onComplete={handleTourComplete} />

        {/* Level Progress Modal */}
        <LevelProgressModal
          visible={showLevelModal}
          onClose={() => setShowLevelModal(false)}
          currentLevel={userProgress.level}
          currentXP={userProgress.xp}
        />

        <LinearGradient
          colors={["#6366F1", "#8B5CF6", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top + 12,
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-white text-xl font-bold">{isFirstLaunch ? "Welcome!" : "Welcome back!"}</Text>
              <View className="flex-row items-center mt-1">
                <View className="flex-row items-center">
                  <Ionicons name="flash" size={18} color="#FCD34D" />
                  <Text className="text-white/90 text-sm font-medium ml-1">
                    {userName || (levelName.includes("•") ? levelName.split("•")[1].trim() : levelName)}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              {/* Speech Bubble */}
              {showBubble && (
                <Animated.View
                  style={[
                    {
                      position: "absolute",
                      right: 50,
                      top: -2,
                      zIndex: 10,
                    },
                    bubbleAnimatedStyle,
                  ]}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 12,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <Text className="text-slate-800 text-xs font-semibold">{greeting}</Text>
                    {/* Speech bubble tail */}
                    <View
                      style={{
                        position: "absolute",
                        right: -6,
                        top: 10,
                        width: 0,
                        height: 0,
                        borderTopWidth: 6,
                        borderBottomWidth: 6,
                        borderLeftWidth: 8,
                        borderTopColor: "transparent",
                        borderBottomColor: "transparent",
                        borderLeftColor: "white",
                      }}
                    />
                  </View>
                </Animated.View>
              )}
              <Pressable
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  navigation.navigate("About");
                }}
                style={{ backgroundColor: "transparent", borderRadius: 0, elevation: 0, shadowOpacity: 0 }}
              >
                <AppLogo size={56} showName={false} />
              </Pressable>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setShowLevelModal(true);
              }}
              className="flex-1 bg-white/20 rounded-2xl p-3 mr-2 active:opacity-80"
            >
              <View className="flex-row items-center mb-0.5">
                <Ionicons name="flash" size={14} color="#FCD34D" />
                <Text className="text-white/80 text-xs font-medium ml-1">Level</Text>
                <Ionicons name="chevron-forward" size={12} color="rgba(255,255,255,0.6)" style={{ marginLeft: 4 }} />
              </View>
              <Text className="text-white text-xl font-bold">{userProgress.level}</Text>
              <Text className="text-white/70 text-xs" numberOfLines={1}>{levelName.split(" • ")[1]}</Text>
            </Pressable>

            <View className="flex-1 bg-white/20 rounded-2xl p-3 ml-2">
              <View className="flex-row items-center mb-0.5">
                <Ionicons name="flame" size={14} color="#F97316" />
                <Text className="text-white/80 text-xs font-medium ml-1">Streak</Text>
              </View>
              <Text className="text-white text-2xl font-bold">{userProgress.currentStreak}</Text>
              <Text className="text-white/60 text-xs">days in a row</Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-6">
            <CharacterGuides />

            <Text className="text-slate-800 text-xl font-bold mb-4">Start Your Journey</Text>

            <Pressable
              onPress={() => navigation.navigate("Map")}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 mb-4 active:opacity-80"
              style={{ backgroundColor: "#6366F1" }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold mb-1">Explore the Map</Text>
                  <Text className="text-white/80 text-sm">
                    Visit 9 worlds and learn about neurodiversity
                  </Text>
                </View>
                <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center ml-4">
                  <Ionicons name="map" size={24} color="white" />
                </View>
              </View>
            </Pressable>


            <View className="flex-row mb-4">
              <Pressable
                onPress={() => navigation.navigate("CardCollection")}
                className="flex-1 bg-white rounded-2xl p-4 mr-2 active:opacity-80"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mb-3">
                  <Ionicons name="layers" size={20} color="#8B5CF6" />
                </View>
                <Text className="text-slate-800 text-base font-bold mb-1">Cards</Text>
                <Text className="text-slate-500 text-xs">
                  {userProgress.unlockedCards.length} unlocked
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Quests")}
                className="flex-1 bg-white rounded-2xl p-4 ml-2 active:opacity-80"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="w-10 h-10 rounded-full bg-amber-100 items-center justify-center mb-3">
                  <Ionicons name="compass" size={20} color="#F59E0B" />
                </View>
                <Text className="text-slate-800 text-base font-bold mb-1">Quests</Text>
                <Text className="text-slate-500 text-xs">
                  {userProgress.completedQuests.length} completed
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => navigation.navigate("Badges")}
              className="bg-white rounded-2xl p-4 active:opacity-80"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-rose-100 items-center justify-center mr-3">
                    <Ionicons name="trophy" size={20} color="#F43F5E" />
                  </View>
                  <View>
                    <Text className="text-slate-800 text-base font-bold">Badges</Text>
                    <Text className="text-slate-500 text-xs">
                      {userProgress.earnedBadges.length} earned
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </View>
            </Pressable>

            {/* Join Us card */}

            <Pressable
              onPress={async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setShowWebView(true);
              }}
              className="mt-4 mb-4 rounded-3xl p-5 active:opacity-80"
              style={{
                backgroundColor: "white",
                borderWidth: 1.5,
                borderColor: "#E0E7FF",
                shadowColor: "#6366F1",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <View style={{ marginRight: 8 }}>
                      <JoinMovementIcon size={32} />
                    </View>
                    <Text className="text-slate-800 text-base font-bold">Join the Movement</Text>
                  </View>
                  <Text className="text-slate-500 text-sm leading-5">
                    Become an ambassador or chapter leader for Youth for Neurodiversity Inc.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6366F1" style={{ marginLeft: 8 }} />
              </View>
            </Pressable>

            <WebViewModal
              visible={showWebView}
              onClose={() => setShowWebView(false)}
              url="https://www.youthfornd.org/join-from-app"
              title="Join the Movement"
            />

            {/* Share Card */}
            <Pressable
              onPress={async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                const shareText = "I have been learning about neurodiversity with a fun, gamified app called Ally in Training\u2122. I like how its teaching me to be a better ally to youth with differences such as autism, ADHD, dyslexia, and more. Check it out! https://youthfornd.org/ally-in-training #AllyInTraining #Neurodiversity";
                try {
                  const asset = await Asset.fromModule(require("../../assets/app-logo-share-only.png")).downloadAsync();
                  const uri = asset.localUri ?? asset.uri;
                  if (Platform.OS === "ios") {
                    const result = await Share.share({ url: uri, message: shareText, title: "Ally in Training" });
                    if (result.action === Share.sharedAction) markShared();
                  } else {
                    await Sharing.shareAsync(uri, { dialogTitle: "Ally in Training" });
                    markShared();
                  }
                } catch {
                  const result = await Share.share({ message: shareText, title: "Ally in Training" });
                  if (result.action === Share.sharedAction) markShared();
                }
              }}
              className="mb-4 active:opacity-80"
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 16,
                borderWidth: 1.5,
                borderColor: "#E2E8F0",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#F1F5F9",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}>
                    <Ionicons name="share-social" size={20} color="#64748B" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
                      <Text className="text-slate-800 text-sm font-bold" style={{ marginRight: 8 }}>
                        Share with Friends
                      </Text>
                      {hasShared ? (
                        <View style={{ backgroundColor: "#D1FAE5", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="checkmark" size={10} color="#059669" />
                          <Text style={{ fontSize: 10, fontWeight: "700", color: "#059669", marginLeft: 2 }}>Shared</Text>
                        </View>
                      ) : (
                        <View style={{ backgroundColor: "#FEF9C3", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 }}>
                          <Text style={{ fontSize: 10, fontWeight: "700", color: "#92400E" }}>+25 XP</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-slate-400 text-xs">Help others discover neurodiversity</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </Pressable>

            <View className="mt-4 mb-4">
              <Text className="text-slate-800 text-lg font-bold mb-2">Your Progress</Text>
              <View className="bg-white rounded-2xl p-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-slate-600 text-sm">Lessons Completed</Text>
                  <Text className="text-slate-800 text-sm font-bold">
                    {userProgress.completedLessons.length}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-slate-600 text-sm">Empathy Points</Text>
                  <Text className="text-slate-800 text-sm font-bold">{userProgress.empathyPoints}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-slate-600 text-sm">Longest Streak</Text>
                  <Text className="text-slate-800 text-sm font-bold">
                    {userProgress.longestStreak} days
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Profile Avatar - Bottom Right */}
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{
            position: "absolute",
            right: 20,
            bottom: insets.bottom + 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 8,
          }}
          className="active:scale-95"
        >
          <View
            style={{
              borderWidth: 3,
              borderColor: "#FFFFFF",
              borderRadius: 30,
            }}
          >
            <AvatarDisplay avatar={userProgress.avatarCustomization} size={56} />
          </View>
        </Pressable>
      </View>
    );
  }
