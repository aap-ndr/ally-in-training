import React, { useState } from "react";
import { Asset } from "expo-asset";
import * as Sharing from "expo-sharing";
import { View, Text, Pressable, ScrollView, TextInput, Modal, KeyboardAvoidingView, Platform, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUserProgress, useGameStore, useLevelName, useUserName } from "../state/gameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebViewModal from "../components/WebViewModal";
import { saveFeedbackData } from "../api/firebase";
import { LinearGradient } from "expo-linear-gradient";
import AvatarDisplay from "../components/AvatarDisplay";
import { SKIN_TONES, HAIR_STYLES, HAIR_COLORS, ACCESSORIES, BACKGROUND_COLORS, AVATAR_PRESETS, AVATAR_CATEGORIES } from "../data/avatars";
import * as Haptics from "expo-haptics";

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const userProgress = useUserProgress();
  const levelName = useLevelName();
  const userName = useUserName();
  const updateAvatarCustomization = useGameStore((s) => s.updateAvatarCustomization);
  const [activeTab, setActiveTab] = useState<"presets" | "customize">("presets");
  const [selectedCategory, setSelectedCategory] = useState<string>("diverse");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const filteredPresets = AVATAR_PRESETS.filter(p => p.category === selectedCategory);
 const [showWebView, setShowWebView] = useState(false);
  const handlePresetSelect = (preset: typeof AVATAR_PRESETS[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateAvatarCustomization({
      skinTone: preset.skinTone,
      hairStyle: preset.hairStyle,
      hairColor: preset.hairColor,
      accessory: preset.accessory,
    });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const resetProgress = useGameStore((s) => s.resetProgress);
  // Delete Account logic
  const handleDeleteAccount = async () => {
    // Clear AsyncStorage (all keys)
    await AsyncStorage.clear();
    // Reset Zustand state
    resetProgress();
    // Optionally, reload the app or reset navigation

    
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    // The HomeScreen will detect first launch and show onboarding
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackMessage.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFeedbackLoading(true);
    setFeedbackError("");
    try {
      await saveFeedbackData({
        name: feedbackName.trim() || undefined,
        email: feedbackEmail.trim() || undefined,
        message: feedbackMessage.trim(),
      });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setFeedbackSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFeedbackError(msg);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setFeedbackLoading(false);
    }
  };



  // Share logic as requested
  async function handleShare() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const shareText = "I have been learning about neurodiversity with a fun, gamified app called Ally in Training\u2122. I like how its teaching me to be a better ally to youth with differences such as autism, ADHD, dyslexia, and more. Check it out! https://youthfornd.org/ally-in-training #AllyInTraining #Neurodiversity";
    try {
      const asset = await Asset.fromModule(require("../../assets/app-logo-share.png")).downloadAsync();
      const uri = asset.localUri ?? asset.uri;
      if (Platform.OS === "ios") {
        await Share.share({ url: uri, message: shareText, title: "Ally in Training" });
      } else {
        await Sharing.shareAsync(uri, { dialogTitle: "Ally in Training" });
      }
    } catch {
      await Share.share({ message: shareText, title: "Ally in Training" });
    }
  }

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
    setFeedbackName("");
    setFeedbackEmail("");
    setFeedbackMessage("");
    setFeedbackSent(false);
    setFeedbackError("");
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Feedback Modal */}
      <Modal visible={showFeedbackModal} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingBottom: insets.bottom + 16, maxHeight: "90%" }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                    <Ionicons name="bug" size={18} color="#6366F1" />
                  </View>
                  <Text style={{ fontSize: 17, fontWeight: "700", color: "#1E293B" }}>Help Improve Ally!</Text>
                </View>
                <Pressable onPress={closeFeedbackModal} style={{ padding: 4 }}>
                  <Ionicons name="close" size={24} color="#64748B" />
                </Pressable>
              </View>

              {feedbackSent ? (
                <View style={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24, alignItems: "center" }}>
                  <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: "#D1FAE5", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Ionicons name="checkmark-circle" size={40} color="#10B981" />
                  </View>
                  <Text style={{ fontSize: 20, fontWeight: "800", color: "#1E293B", marginBottom: 8 }}>Thank you!</Text>
                  <Text style={{ fontSize: 14, color: "#64748B", textAlign: "center", lineHeight: 22, marginBottom: 24 }}>
                    {"Your feedback has been sent to our team. We read every message and will use it to improve the app!"}
                  </Text>
                  <Pressable onPress={closeFeedbackModal} style={{ backgroundColor: "#6366F1", borderRadius: 16, paddingVertical: 14, paddingHorizontal: 40 }}>
                    <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Done</Text>
                  </Pressable>
                </View>
              ) : (
                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8 }} keyboardShouldPersistTaps="handled">
                  <Text style={{ fontSize: 13, color: "#64748B", lineHeight: 20, marginBottom: 20 }}>
                    Report a bug or suggest a feature. We read every message!
                  </Text>

                  <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>Your Name <Text style={{ color: "#94A3B8", fontWeight: "400" }}>(optional)</Text></Text>
                  <TextInput
                    value={feedbackName}
                    onChangeText={setFeedbackName}
                    placeholder="Your name"
                    placeholderTextColor="#CBD5E1"
                    style={{ backgroundColor: "#F8FAFC", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: "#1E293B", borderWidth: 1.5, borderColor: "#E2E8F0", marginBottom: 14 }}
                  />

                  <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>Email <Text style={{ color: "#94A3B8", fontWeight: "400" }}>(optional)</Text></Text>
                  <TextInput
                    value={feedbackEmail}
                    onChangeText={setFeedbackEmail}
                    placeholder="you@example.com"
                    placeholderTextColor="#CBD5E1"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ backgroundColor: "#F8FAFC", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: "#1E293B", borderWidth: 1.5, borderColor: "#E2E8F0", marginBottom: 14 }}
                  />

                  <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>Message *</Text>
                  <TextInput
                    value={feedbackMessage}
                    onChangeText={setFeedbackMessage}
                    placeholder="Describe the bug or feature request..."
                    placeholderTextColor="#CBD5E1"
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    style={{ backgroundColor: "#F8FAFC", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: "#1E293B", borderWidth: 1.5, borderColor: "#E2E8F0", marginBottom: 20, minHeight: 120 }}
                  />

                  {feedbackError ? (
                    <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 12, marginBottom: 14, flexDirection: "row", alignItems: "flex-start" }}>
                      <Ionicons name="alert-circle" size={16} color="#EF4444" style={{ marginTop: 1, marginRight: 8 }} />
                      <Text style={{ color: "#DC2626", fontSize: 13, flex: 1, lineHeight: 18 }}>{feedbackError}</Text>
                    </View>
                  ) : null}
                  <Pressable
                    onPress={handleFeedbackSubmit}
                    disabled={!feedbackMessage.trim() || feedbackLoading}
                    style={{ borderRadius: 16, overflow: "hidden", marginBottom: 8, opacity: feedbackMessage.trim() && !feedbackLoading ? 1 : 0.5 }}
                  >
                    <LinearGradient
                      colors={["#6366F1", "#8B5CF6"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                    >
                      {feedbackLoading ? (
                        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Sending...</Text>
                      ) : (
                        <>
                          <Ionicons name="send" size={18} color="white" style={{ marginRight: 8 }} />
                          <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Send Feedback</Text>
                        </>
                      )}
                    </LinearGradient>
                  </Pressable>
                </ScrollView>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between mb-8">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </Pressable>
          <Text className="text-white text-xl font-bold">Profile</Text>
          <Pressable
            onPress={() => navigation.navigate("About")}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="information-circle-outline" size={22} color="white" />
          </Pressable>
        </View>

        <View className="items-center">
          <View className="mb-4">
            <AvatarDisplay avatar={userProgress.avatarCustomization} size={100} showBorder />
          </View>
          {userName && (
            <Text className="text-white text-2xl font-bold mb-1">{userName}</Text>
          )}
          <Text className={`text-white ${userName ? "text-base" : "text-2xl font-bold mb-1"}`}>{userProgress.title}</Text>
          <Text className="text-white/80 text-sm">{levelName}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="bg-white rounded-2xl p-5 mb-6"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text className="text-slate-800 text-lg font-bold mb-4">Stats</Text>

          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-slate-100">
            <View className="flex-row items-center">
              <Ionicons name="flash" size={20} color="#F59E0B" />
              <Text className="text-slate-600 text-sm ml-2">Total XP</Text>
            </View>
            <Text className="text-slate-800 text-base font-bold">{userProgress.xp}</Text>
          </View>

          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-slate-100">
            <View className="flex-row items-center">
              <Ionicons name="flame" size={20} color="#F97316" />
              <Text className="text-slate-600 text-sm ml-2">Current Streak</Text>
            </View>
            <Text className="text-slate-800 text-base font-bold">
              {userProgress.currentStreak} days
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-slate-100">
            <View className="flex-row items-center">
              <Ionicons name="trophy" size={20} color="#F59E0B" />
              <Text className="text-slate-600 text-sm ml-2">Longest Streak</Text>
            </View>
            <Text className="text-slate-800 text-base font-bold">
              {userProgress.longestStreak} days
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-slate-100">
            <View className="flex-row items-center">
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text className="text-slate-600 text-sm ml-2">Empathy Points</Text>
            </View>
            <Text className="text-slate-800 text-base font-bold">{userProgress.empathyPoints}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text className="text-slate-600 text-sm ml-2">Lessons Completed</Text>
            </View>
            <Text className="text-slate-800 text-base font-bold">
              {userProgress.completedLessons.length}
            </Text>
          </View>
        </View>

        {/* Certificate Button */}
        <Pressable
          onPress={async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("Certificate");
          }}
          className="mb-6"
        >
          <LinearGradient
            colors={["#EC4899", "#8B5CF6", "#6366F1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
              padding: 16,
              shadowColor: "#6366F1",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
                  <Ionicons name="ribbon" size={24} color="white" />
                </View>
                <View>
                  <Text className="text-white text-base font-bold">Get Your Certificate</Text>
                  <Text className="text-white/80 text-sm">Download and share your achievement</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </LinearGradient>
        </Pressable>

        {/* Share with Friends */}
        <Pressable
          onPress={handleShare}
          className="mb-3 active:opacity-80"
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            borderWidth: 1.5,
            borderColor: "#D1FAE5",
            shadowColor: "#10B981",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center mr-3">
                <Ionicons name="share-social" size={20} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-800 text-sm font-bold">Share with Friends</Text>
                <Text className="text-slate-500 text-xs mt-0.5">Spread the word about neurodiversity</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#10B981" />
          </View>
        </Pressable>

        {/* Help Improve Ally */}
        <Pressable
          onPress={async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
           setShowWebView(true);
          }}
          className="mb-6 active:opacity-80"
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            borderWidth: 1.5,
            borderColor: "#E0E7FF",
            shadowColor: "#6366F1",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 2,
          }}
        >

            <WebViewModal
              visible={showWebView}
              onClose={() => setShowWebView(false)}
              url="https://www.youthfornd.org/feedback-form-ally-in-training"
              title="Help Improve Ally"
            />

        
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-indigo-50 items-center justify-center mr-3">
                <Ionicons name="bug" size={20} color="#6366F1" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-800 text-sm font-bold">Help improve Ally!</Text>
                <Text className="text-slate-500 text-xs mt-0.5">Report a bug or suggest a feature</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6366F1" />
          </View>
        </Pressable>

        {/* Delete Account Card */}
        <Pressable
          onPress={async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShowDeleteModal(true);
          }}
          className="mb-6 active:opacity-80"
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            borderWidth: 1.5,
            borderColor: "#FCA5A5",
            shadowColor: "#EF4444",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 2,
          }}
        >

 

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-rose-50 items-center justify-center mr-3">
                <Ionicons name="trash" size={20} color="#EF4444" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-800 text-sm font-bold">Delete Account</Text>
                <Text className="text-slate-500 text-xs mt-0.5">Permanently remove your account data</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#EF4444" />
          </View>
        </Pressable>
      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} animationType="fade" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "white", borderRadius: 24, padding: 28, width: "85%", alignItems: "center" }}>
            <Ionicons name="trash" size={40} color="#EF4444" style={{ marginBottom: 12 }} />
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#1E293B", marginBottom: 8 }}>Delete Account?</Text>
            <Text style={{ fontSize: 15, color: "#64748B", textAlign: "center", marginBottom: 24 }}>
              By selecting Delete Account, your data will be permanently removed from the system, and you will be redirected to the application dashboard screen.
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Pressable
                onPress={() => setShowDeleteModal(false)}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 14, backgroundColor: "#F1F5F9", alignItems: "center", marginRight: 8 }}
              >
                <Text style={{ color: "#64748B", fontWeight: "700", fontSize: 16 }}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={async () => {
                  setShowDeleteModal(false);
                  await handleDeleteAccount();
                }}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 14, backgroundColor: "#EF4444", alignItems: "center" }}
              >
                <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

        <Text className="text-slate-800 text-lg font-bold mb-3">Choose Your Avatar</Text>

        {/* Tab Switcher */}
        <View className="flex-row mb-4">
          <Pressable
            onPress={() => setActiveTab("presets")}
            className={`flex-1 py-3 rounded-xl mr-2 ${
              activeTab === "presets" ? "bg-indigo-500" : "bg-slate-200"
            }`}
          >
            <Text className={`text-center font-semibold ${
              activeTab === "presets" ? "text-white" : "text-slate-600"
            }`}>
              Presets
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("customize")}
            className={`flex-1 py-3 rounded-xl ml-2 ${
              activeTab === "customize" ? "bg-indigo-500" : "bg-slate-200"
            }`}
          >
            <Text className={`text-center font-semibold ${
              activeTab === "customize" ? "text-white" : "text-slate-600"
            }`}>
              Customize
            </Text>
          </Pressable>
        </View>

        {activeTab === "presets" ? (
          <>
            {/* Category Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {AVATAR_CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className="mr-2"
                >
                  <View
                    className={`px-4 py-2 rounded-full ${
                      selectedCategory === cat.id ? "bg-opacity-100" : "bg-opacity-20"
                    }`}
                    style={{
                      backgroundColor: selectedCategory === cat.id ? cat.color : `${cat.color}30`
                    }}
                  >
                    <Text
                      className="font-semibold"
                      style={{ color: selectedCategory === cat.id ? "#FFFFFF" : cat.color }}
                    >
                      {cat.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            {/* Avatar Presets Grid */}
            <View className="flex-row flex-wrap justify-between">
              {filteredPresets.map((preset) => {
                const isSelected =
                  userProgress.avatarCustomization.skinTone === preset.skinTone &&
                  userProgress.avatarCustomization.hairStyle === preset.hairStyle &&
                  userProgress.avatarCustomization.hairColor === preset.hairColor &&
                  userProgress.avatarCustomization.accessory === preset.accessory;

                return (
                  <Pressable
                    key={preset.id}
                    onPress={() => handlePresetSelect(preset)}
                    className="mb-4"
                    style={{ width: "30%" }}
                  >
                    <View
                      className={`rounded-2xl p-3 items-center ${
                        isSelected ? "bg-indigo-100 border-2 border-indigo-500" : "bg-white border-2 border-slate-100"
                      }`}
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 6,
                        elevation: 2,
                      }}
                    >
                      <AvatarDisplay
                        avatar={{
                          skinTone: preset.skinTone,
                          hairStyle: preset.hairStyle,
                          hairColor: preset.hairColor,
                          accessory: preset.accessory,
                        }}
                        size={60}
                      />
                      {isSelected && (
                        <View className="absolute top-1 right-1 w-5 h-5 rounded-full bg-indigo-500 items-center justify-center">
                          <Ionicons name="checkmark" size={12} color="white" />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : (
          <>
            {/* Skin Tone */}
            <View
              className="bg-white rounded-2xl p-5 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="text-slate-700 text-sm font-semibold mb-3">Skin Tone</Text>
              <View className="flex-row flex-wrap">
                {SKIN_TONES.map((tone) => {
                  const isSelected = userProgress.avatarCustomization.skinTone === tone.value;
                  return (
                    <Pressable
                      key={tone.value}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        updateAvatarCustomization({ skinTone: tone.value });
                      }}
                      className="mr-2 mb-2"
                    >
                      <View
                        className={`w-12 h-12 rounded-full items-center justify-center ${
                          isSelected ? "border-4 border-indigo-500" : "border-2 border-slate-200"
                        }`}
                        style={{ backgroundColor: tone.value }}
                      >
                        {isSelected && (
                          <View className="w-5 h-5 rounded-full bg-white items-center justify-center">
                            <Ionicons name="checkmark" size={14} color="#6366F1" />
                          </View>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Hair Style */}
            <View
              className="bg-white rounded-2xl p-5 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="text-slate-700 text-sm font-semibold mb-3">Hair Style</Text>
              <View className="flex-row flex-wrap">
                {HAIR_STYLES.map((style) => {
                  const isSelected = userProgress.avatarCustomization.hairStyle === style.value;
                  return (
                    <Pressable
                      key={style.value}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        updateAvatarCustomization({ hairStyle: style.value });
                      }}
                      className="mr-2 mb-2"
                    >
                      <View
                        className={`px-3 py-2 rounded-xl ${
                          isSelected
                            ? "bg-indigo-100 border-2 border-indigo-500"
                            : "bg-slate-100 border-2 border-slate-200"
                        }`}
                      >
                        <Text
                          className={`text-xs font-semibold ${
                            isSelected ? "text-indigo-700" : "text-slate-600"
                          }`}
                        >
                          {style.name}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Hair Color */}
            <View
              className="bg-white rounded-2xl p-5 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="text-slate-700 text-sm font-semibold mb-3">Hair Color</Text>
              <View className="flex-row flex-wrap">
                {HAIR_COLORS.map((color) => {
                  const isSelected = userProgress.avatarCustomization.hairColor === color.value;
                  return (
                    <Pressable
                      key={color.value}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        updateAvatarCustomization({ hairColor: color.value });
                      }}
                      className="mr-2 mb-2"
                    >
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center ${
                          isSelected ? "border-4 border-indigo-500" : "border-2 border-slate-200"
                        }`}
                        style={{ backgroundColor: color.value }}
                      >
                        {isSelected && (
                          <View className="w-4 h-4 rounded-full bg-white items-center justify-center">
                            <Ionicons name="checkmark" size={12} color="#6366F1" />
                          </View>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Accessories */}
            <View
              className="bg-white rounded-2xl p-5 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="text-slate-700 text-sm font-semibold mb-3">Accessory</Text>
              <View className="flex-row flex-wrap">
                {ACCESSORIES.map((acc) => {
                  const isSelected = userProgress.avatarCustomization.accessory === acc.value;
                  return (
                    <Pressable
                      key={acc.name}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        updateAvatarCustomization({ accessory: acc.value });
                      }}
                      className="mr-2 mb-2"
                    >
                      <View
                        className={`px-3 py-2 rounded-xl ${
                          isSelected
                            ? "bg-indigo-100 border-2 border-indigo-500"
                            : "bg-slate-100 border-2 border-slate-200"
                        }`}
                      >
                        <Text
                          className={`text-xs font-semibold ${
                            isSelected ? "text-indigo-700" : "text-slate-600"
                          }`}
                        >
                          {acc.name}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Background Color */}
            <View
              className="bg-white rounded-2xl p-5 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="text-slate-700 text-sm font-semibold mb-3">Background Color</Text>
              <View className="flex-row flex-wrap">
                {BACKGROUND_COLORS.map((bg) => {
                  const isSelected = userProgress.avatarCustomization.backgroundColor === bg.value;
                  return (
                    <Pressable
                      key={bg.name}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        updateAvatarCustomization({ backgroundColor: bg.value });
                      }}
                      className="mr-2 mb-2"
                    >
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center ${
                          isSelected ? "border-4 border-indigo-500" : "border-2 border-slate-200"
                        }`}
                        style={{
                          backgroundColor: bg.value || "#E5E7EB",
                        }}
                      >
                        {bg.value === undefined && (
                          <Ionicons name="ban" size={16} color="#9CA3AF" />
                        )}
                        {isSelected && bg.value && (
                          <View className="w-4 h-4 rounded-full bg-white items-center justify-center">
                            <Ionicons name="checkmark" size={12} color="#6366F1" />
                          </View>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
