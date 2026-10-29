import React, { useRef, useState } from "react";
import { View, Text, Pressable, ScrollView, Share, TextInput, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useUserProgress, useWorlds, useCards, useQuests, useUserName, useHasJoinedMovement, useAmbassadorInfo, useGameStore } from "../state/gameStore";
import * as Haptics from "expo-haptics";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

type CertificateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Certificate">;

export default function CertificateScreen() {
  const navigation = useNavigation<CertificateScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const userProgress = useUserProgress();
  const userName = useUserName();
  const worlds = useWorlds();
  const cards = useCards();
  const quests = useQuests();
  const hasJoinedMovement = useHasJoinedMovement();
  const ambassadorInfo = useAmbassadorInfo();
  const setUserName = useGameStore((s) => s.setUserName);
  const certificateRef = useRef<View>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");

  // Use ambassador full name if available, fall back to nickname
  const displayName = ambassadorInfo?.name || userName || "Future Ally";
  const locationLine = ambassadorInfo?.city
    ? [ambassadorInfo.city, ambassadorInfo.state, ambassadorInfo.country].filter(Boolean).join(", ")
    : null;

  // Calculate stats
  const completedLessons = userProgress.completedLessons.length;
  const unlockedCards = userProgress.unlockedCards.length;
  const totalXP = userProgress.xp;

  // Get topics learned
  const worldsWithProgress = worlds.filter(w => {
    const completedInWorld = w.lessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
    return completedInWorld > 0;
  });

  const topicsLearned = worldsWithProgress.map(w => w.name).slice(0, 4);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSaveCertificate = async () => {
    try {
      setIsSaving(true);
      setSaveMessage("");
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        setSaveMessage("Permission needed to save to photos. Please enable in Settings.");
        setIsSaving(false);
        return;
      }

      if (certificateRef.current) {
        const uri = await captureRef(certificateRef, {
          format: "png",
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(uri);
        setSaveMessage("Certificate saved to your photos!");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch {
      setSaveMessage("Could not save the certificate. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (certificateRef.current) {
        const uri = await captureRef(certificateRef, {
          format: "png",
          quality: 1,
        });
        await Share.share({
          url: uri,
          message: "I completed Ally in Training and learned about neurodiversity!",
        });
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <View className="flex-1 bg-slate-100">
      {/* Header */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6", "#EC4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </Pressable>
          <Text className="text-white text-xl font-bold">Your Certificate</Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Certificate */}
        <View
          ref={certificateRef}
          collapsable={false}
          className="bg-white rounded-3xl overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          {/* Certificate Header */}
          <LinearGradient
            colors={["#6366F1", "#8B5CF6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 24, alignItems: "center" }}
          >
            <View className="flex-row items-center mb-2">
              {["#FF6B6B", "#FF9F43", "#FECA57", "#48DBFB", "#5F27CD", "#FF6B9D"].map((color, i) => (
                <View
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: color,
                    marginHorizontal: 2,
                  }}
                />
              ))}
            </View>
            <Text className="text-white/80 text-sm tracking-widest mb-1">CERTIFICATE OF</Text>
            <Text className="text-white text-2xl font-bold">Achievement</Text>
          </LinearGradient>

          {/* Certificate Body */}
          <View className="p-6">
            <Text className="text-slate-400 text-center text-sm mb-2">This certifies that</Text>
            <View className="flex-row items-center justify-center mb-1">
              <Text className="text-slate-800 text-center text-2xl font-bold">
                {displayName}
              </Text>
              <Pressable
                onPress={() => { setEditNameValue(displayName); setShowEditName(true); }}
                className="ml-2 active:opacity-70"
              >
                <Ionicons name="pencil" size={16} color="#6366F1" />
              </Pressable>
            </View>
            {locationLine && (
              <Text className="text-slate-400 text-center text-sm mb-1">{locationLine}</Text>
            )}
            <Text className="text-indigo-600 text-center text-base font-medium mb-4">
              {userProgress.title}
            </Text>

            <Text className="text-slate-600 text-center text-base leading-relaxed mb-6">
              has successfully completed learning about neurodiversity through the Ally in Training app,
              demonstrating commitment to understanding and supporting neurodivergent individuals.
            </Text>

            {/* Stats */}
            <View className="flex-row justify-around mb-6 py-4 bg-slate-50 rounded-2xl">
              <View className="items-center">
                <Text className="text-indigo-600 text-2xl font-bold">{completedLessons}</Text>
                <Text className="text-slate-500 text-xs">Lessons</Text>
              </View>
              <View className="items-center">
                <Text className="text-purple-600 text-2xl font-bold">{unlockedCards}</Text>
                <Text className="text-slate-500 text-xs">Cards</Text>
              </View>
              <View className="items-center">
                <Text className="text-pink-600 text-2xl font-bold">{totalXP}</Text>
                <Text className="text-slate-500 text-xs">XP</Text>
              </View>
            </View>

            {/* Topics Learned */}
            {topicsLearned.length > 0 && (
              <View className="mb-6">
                <Text className="text-slate-500 text-center text-sm mb-2">Topics Explored:</Text>
                <View className="flex-row flex-wrap justify-center">
                  {topicsLearned.map((topic, i) => (
                    <View
                      key={i}
                      className="bg-indigo-50 px-3 py-1.5 rounded-full m-1"
                    >
                      <Text className="text-indigo-700 text-xs font-medium">{topic}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Skills Gained */}
            <View className="mb-6">
              <Text className="text-slate-500 text-center text-sm mb-2">Skills Gained:</Text>
              <View className="flex-row flex-wrap justify-center">
                {["Empathy", "Understanding", "Allyship", "Awareness"].map((skill, i) => (
                  <View
                    key={i}
                    className="flex-row items-center bg-green-50 px-3 py-1.5 rounded-full m-1"
                  >
                    <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                    <Text className="text-green-700 text-xs font-medium ml-1">{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Date and Signature */}
            <View className="border-t border-slate-200 pt-4">
              <Text className="text-slate-400 text-center text-xs mb-2">{currentDate}</Text>
              <View className="items-center">
                <Text className="text-slate-600 text-sm font-medium">{"Ally in Training\u2122"}</Text>
                <Text className="text-slate-400 text-xs">Youth for Neurodiversity Inc.</Text>
              </View>
            </View>
          </View>

          {/* Certificate Footer */}
          <LinearGradient
            colors={["#EC4899", "#8B5CF6", "#6366F1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 6 }}
          />
        </View>

        {/* Info */}
        <View className="mt-6 bg-indigo-50 rounded-2xl p-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#6366F1" />
            <Text className="text-indigo-700 font-semibold ml-2">About This Certificate</Text>
          </View>
          <Text className="text-indigo-600 text-sm leading-relaxed">
            This certificate recognizes your dedication to learning about neurodiversity.
            Share it to show your commitment to being an informed ally!
          </Text>
        </View>
      </ScrollView>

      {/* Edit Name Modal */}
      <Modal visible={showEditName} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 24 }}
            onPress={() => setShowEditName(false)}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={{ backgroundColor: "white", borderRadius: 20, padding: 24 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>Change Name</Text>
                <Text style={{ fontSize: 14, color: "#64748B", marginBottom: 16 }}>Update the name shown on your certificate.</Text>
                <TextInput
                  value={editNameValue}
                  onChangeText={setEditNameValue}
                  placeholder="Your name"
                  placeholderTextColor="#94A3B8"
                  maxLength={40}
                  style={{
                    borderWidth: 1.5,
                    borderColor: "#6366F1",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: "#1E293B",
                    marginBottom: 16,
                  }}
                />
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Pressable
                    onPress={() => setShowEditName(false)}
                    style={{ flex: 1, paddingVertical: 12, backgroundColor: "#F1F5F9", borderRadius: 12, alignItems: "center" }}
                  >
                    <Text style={{ color: "#64748B", fontWeight: "600" }}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={async () => {
                      if (editNameValue.trim()) {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setUserName(editNameValue.trim());
                      }
                      setShowEditName(false);
                    }}
                    style={{ flex: 1, paddingVertical: 12, backgroundColor: "#6366F1", borderRadius: 12, alignItems: "center" }}
                  >
                    <Text style={{ color: "white", fontWeight: "600" }}>Save</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>

      {/* Action Buttons */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200"
        style={{ paddingBottom: insets.bottom + 16, paddingTop: 16, paddingHorizontal: 20 }}
      >
        {saveMessage ? (
          <View className="bg-green-50 rounded-xl px-4 py-2 mb-3 flex-row items-center">
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text className="text-green-700 text-sm ml-2 flex-1">{saveMessage}</Text>
          </View>
        ) : null}

        {!hasJoinedMovement ? (
          /* Gate: must join movement first */
          <View>
            <View className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-3">
              <View className="flex-row items-start">
                <Ionicons name="lock-closed" size={18} color="#D97706" style={{ marginTop: 1 }} />
                <View className="flex-1 ml-2">
                  <Text className="text-amber-800 font-bold text-sm mb-1">Join the Movement to Save</Text>
                  <Text className="text-amber-700 text-xs leading-relaxed">
                    Become part of Youth for Neurodiversity Inc. to unlock saving and sharing your certificate.
                  </Text>
                </View>
              </View>
            </View>
            <Pressable
              onPress={async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate("JoinUs");
              }}
              className="rounded-2xl overflow-hidden active:opacity-80"
            >
              <LinearGradient
                colors={["#6366F1", "#8B5CF6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
              >
                <Ionicons name="ribbon" size={20} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white font-bold text-base">Unlock Certificate</Text>
              </LinearGradient>
            </Pressable>
          </View>
        ) : (
          <View className="flex-row">
            <Pressable
              onPress={handleShare}
              className="flex-1 flex-row items-center justify-center py-4 bg-slate-100 rounded-xl mr-2 active:opacity-80"
            >
              <Ionicons name="share-outline" size={20} color="#475569" />
              <Text className="text-slate-700 font-semibold ml-2">Share</Text>
            </Pressable>
            <Pressable
              onPress={handleSaveCertificate}
              disabled={isSaving}
              className="flex-1 flex-row items-center justify-center py-4 bg-indigo-600 rounded-xl ml-2 active:opacity-80"
              style={{ opacity: isSaving ? 0.7 : 1 }}
            >
              <Ionicons name="download-outline" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">
                {isSaving ? "Saving..." : "Save"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
