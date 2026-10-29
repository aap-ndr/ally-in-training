import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCards } from "../state/gameStore";
import type { CardCategory } from "../types/game";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

type CardCollectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CardCollection"
>;

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; label: string; gradient: [string, string] }> = {
  adhd: { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B", label: "ADHD", gradient: ["#FEF3C7", "#FDE68A"] },
  autism: { bg: "#DBEAFE", text: "#1E3A8A", border: "#3B82F6", label: "Autism", gradient: ["#DBEAFE", "#BFDBFE"] },
  sensory: { bg: "#E9D5FF", text: "#581C87", border: "#8B5CF6", label: "Sensory", gradient: ["#F3E8FF", "#E9D5FF"] },
  communication: { bg: "#D1FAE5", text: "#065F46", border: "#10B981", label: "Communication", gradient: ["#D1FAE5", "#A7F3D0"] },
  executive: { bg: "#FEE2E2", text: "#991B1B", border: "#EF4444", label: "Executive", gradient: ["#FEE2E2", "#FECACA"] },
  shared: { bg: "#F0FDF4", text: "#166534", border: "#22C55E", label: "Shared", gradient: ["#ECFDF5", "#D1FAE5"] },
};

export default function CardCollectionScreen() {
  const navigation = useNavigation<CardCollectionScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const cards = useCards();

  const unlockedCards = cards.filter((c) => c.unlocked);
  const lockedCards = cards.filter((c) => !c.unlocked);

  // Helper to get display categories
  const getDisplayCategories = (category: CardCategory, categories?: CardCategory[]) => {
    if (categories && categories.length > 0) {
      return categories.filter(c => c !== "shared" && c !== "executive");
    }
    return [category];
  };

  return (
    <View className="flex-1">
      {/* Gradient Background */}
      <LinearGradient
        colors={["#EEF2FF", "#E0E7FF", "#C7D2FE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Header */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">Concept Cards</Text>
            <Text className="text-white/80 text-sm">
              {unlockedCards.length} / {cards.length} unlocked
            </Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="albums" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {unlockedCards.length > 0 && (
          <>
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 rounded-full bg-emerald-100 items-center justify-center mr-2">
                <Ionicons name="sparkles" size={16} color="#10B981" />
              </View>
              <Text className="text-slate-800 text-lg font-bold">Unlocked Cards</Text>
            </View>
            {unlockedCards.map((card) => {
              const displayCategories = getDisplayCategories(card.category, card.categories);
              const primaryCategory = displayCategories[0] || card.category;
              const categoryColors = CATEGORY_COLORS[primaryCategory] || CATEGORY_COLORS.shared;
              return (
                <View
                  key={card.id}
                  className="rounded-3xl mb-4 overflow-hidden"
                  style={{
                    shadowColor: categoryColors.border,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 12,
                    elevation: 5,
                  }}
                >
                  <LinearGradient
                    colors={categoryColors.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 20 }}
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Text className="text-slate-800 text-lg font-bold mb-2">{card.title}</Text>
                        <View className="flex-row flex-wrap">
                          {displayCategories.map((cat) => {
                            const colors = CATEGORY_COLORS[cat] || CATEGORY_COLORS.shared;
                            return (
                              <View
                                key={cat}
                                className="mr-2 mb-1 px-3 py-1 rounded-full"
                                style={{ backgroundColor: "white", borderWidth: 1, borderColor: colors.border }}
                              >
                                <Text className="text-xs font-semibold" style={{ color: colors.text }}>
                                  {colors.label}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: "white" }}
                      >
                        <Ionicons name="star" size={20} color={categoryColors.border} />
                      </View>
                    </View>
                    <Text className="text-slate-700 text-sm mb-3">{card.shortDescription}</Text>
                    <View className="bg-white/80 rounded-2xl p-4">
                      <Text className="text-slate-700 text-sm leading-relaxed">
                        {card.fullDescription}
                      </Text>
                    </View>
                    {/* Test Knowledge Button */}
                    {card.quizQuestion && (
                      <Pressable
                        onPress={async () => {
                          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          navigation.navigate("CardQuiz", { cardId: card.id });
                        }}
                        className="mt-4 rounded-2xl py-3 flex-row items-center justify-center active:opacity-80"
                        style={{
                          backgroundColor: categoryColors.border,
                          shadowColor: categoryColors.border,
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.3,
                          shadowRadius: 8,
                          elevation: 4,
                        }}
                      >
                        <Ionicons name="school" size={18} color="white" />
                        <Text className="text-white font-semibold ml-2">Test Your Knowledge</Text>
                        <View className="ml-2 bg-white/20 px-2 py-0.5 rounded-full">
                          <Text className="text-white text-xs font-medium">+10 XP</Text>
                        </View>
                      </Pressable>
                    )}
                  </LinearGradient>
                </View>
              );
            })}
          </>
        )}

        {lockedCards.length > 0 && (
          <>
            {/* Info message at top of locked section */}
            <View
              className="rounded-3xl p-5 mb-4 mt-4"
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                borderWidth: 1,
                borderColor: "rgba(99, 102, 241, 0.3)",
              }}
            >
              <View className="flex-row items-start mb-3">
                <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center mr-3">
                  <Ionicons name="information-circle" size={18} color="#6366F1" />
                </View>
                <Text className="flex-1 text-indigo-700 text-sm leading-relaxed">
                  Complete lessons to unlock more concept cards and expand your understanding!
                </Text>
              </View>
              <Pressable
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  navigation.navigate("Map");
                }}
                className="rounded-2xl py-3 flex-row items-center justify-center active:opacity-80"
                style={{
                  backgroundColor: "#6366F1",
                  shadowColor: "#6366F1",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Ionicons name="map" size={18} color="white" />
                <Text className="text-white font-semibold ml-2">Go to Learning Map</Text>
              </Pressable>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 rounded-full bg-slate-200 items-center justify-center mr-2">
                <Ionicons name="lock-closed" size={16} color="#64748B" />
              </View>
              <Text className="text-slate-800 text-lg font-bold">
                Locked Cards ({lockedCards.length})
              </Text>
            </View>
            <View className="flex-row flex-wrap">
              {lockedCards.map((card) => (
                <View
                  key={card.id}
                  className="rounded-2xl p-4 mr-3 mb-3 items-center justify-center"
                  style={{
                    width: 100,
                    height: 120,
                    backgroundColor: "rgba(148, 163, 184, 0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(148, 163, 184, 0.3)",
                    borderStyle: "dashed",
                  }}
                >
                  <View className="w-10 h-10 rounded-full bg-slate-300/50 items-center justify-center mb-2">
                    <Ionicons name="lock-closed" size={20} color="#94A3B8" />
                  </View>
                  <Text className="text-slate-400 text-xs text-center">Locked</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
