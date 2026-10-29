import React from "react";
import { View, Text, Pressable, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

interface LevelProgressModalProps {
  visible: boolean;
  onClose: () => void;
  currentLevel: number;
  currentXP: number;
}

const LEVEL_DATA = [
  { level: 1, name: "Rising Star", xpRequired: 0, color: "#6366F1", icon: "star", emoji: "⭐" },
  { level: 2, name: "Curious Mind", xpRequired: 100, color: "#7C3AED", icon: "bulb", emoji: "💡" },
  { level: 3, name: "Quick Learner", xpRequired: 200, color: "#8B5CF6", icon: "book", emoji: "📚" },
  { level: 4, name: "Knowledge Seeker", xpRequired: 300, color: "#A855F7", icon: "search", emoji: "🔍" },
  { level: 5, name: "Insight Builder", xpRequired: 400, color: "#C026D3", icon: "construct", emoji: "🧩" },
  { level: 6, name: "Empathy Explorer", xpRequired: 500, color: "#DB2777", icon: "heart", emoji: "💜" },
  { level: 7, name: "Understanding Ally", xpRequired: 600, color: "#E11D48", icon: "people", emoji: "🤝" },
  { level: 8, name: "Compassion Guide", xpRequired: 700, color: "#F43F5E", icon: "compass", emoji: "🧭" },
  { level: 9, name: "Wisdom Keeper", xpRequired: 800, color: "#F97316", icon: "key", emoji: "🗝️" },
  { level: 10, name: "Navigator Pro", xpRequired: 900, color: "#F59E0B", icon: "navigate", emoji: "🚀" },
  { level: 11, name: "Champion Rising", xpRequired: 1000, color: "#EAB308", icon: "medal", emoji: "🏅" },
  { level: 12, name: "Master Learner", xpRequired: 1100, color: "#84CC16", icon: "school", emoji: "🎓" },
  { level: 13, name: "Inclusion Expert", xpRequired: 1200, color: "#22C55E", icon: "globe", emoji: "🌍" },
  { level: 14, name: "Diversity Advocate", xpRequired: 1300, color: "#10B981", icon: "megaphone", emoji: "📣" },
  { level: 15, name: "Legendary Ally", xpRequired: 1400, color: "#14B8A6", icon: "trophy", emoji: "🏆" },
];

export default function LevelProgressModal({
  visible,
  onClose,
  currentLevel,
  currentXP,
}: LevelProgressModalProps) {
  const insets = useSafeAreaInsets();

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const getProgressToNextLevel = (level: number) => {
    const currentLevelData = LEVEL_DATA.find((l) => l.level === level);
    const nextLevelData = LEVEL_DATA.find((l) => l.level === level + 1);

    if (!currentLevelData || !nextLevelData) return 100;

    const xpIntoLevel = currentXP - currentLevelData.xpRequired;
    const xpNeededForLevel = nextLevelData.xpRequired - currentLevelData.xpRequired;

    return Math.min(100, (xpIntoLevel / xpNeededForLevel) * 100);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View
          className="flex-1 mt-20 bg-white rounded-t-3xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          {/* Header */}
          <LinearGradient
            colors={["#6366F1", "#8B5CF6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingTop: 20,
              paddingBottom: 24,
              paddingHorizontal: 20,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-2xl font-bold">Your Journey</Text>
              <Pressable
                onPress={handleClose}
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              >
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            </View>
            <Text className="text-white/90">
              You are Level {currentLevel} with {currentXP} XP
            </Text>
          </LinearGradient>

          {/* Level list */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
            showsVerticalScrollIndicator={false}
          >
            {LEVEL_DATA.map((level, index) => {
              const isCurrentLevel = level.level === currentLevel;
              const isCompleted = level.level < currentLevel;
              const isLocked = level.level > currentLevel;
              const progress = isCurrentLevel ? getProgressToNextLevel(currentLevel) : isCompleted ? 100 : 0;

              return (
                <View
                  key={level.level}
                  className="mb-4"
                  style={{
                    opacity: isLocked ? 0.5 : 1,
                  }}
                >
                  <View
                    className="flex-row items-center p-4 rounded-2xl"
                    style={{
                      backgroundColor: isCurrentLevel ? `${level.color}15` : "#F8FAFC",
                      borderWidth: isCurrentLevel ? 2 : 1,
                      borderColor: isCurrentLevel ? level.color : "#E2E8F0",
                    }}
                  >
                    {/* Level number with emoji */}
                    <View
                      className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                      style={{
                        backgroundColor: isCompleted || isCurrentLevel ? level.color : "#CBD5E1",
                      }}
                    >
                      {isCompleted ? (
                        <Ionicons name="checkmark" size={24} color="white" />
                      ) : (
                        <Text className="text-2xl">{level.emoji}</Text>
                      )}
                    </View>

                    {/* Level info */}
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text
                          className="text-xs font-semibold mr-2 px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: isCurrentLevel ? level.color : "#E2E8F0",
                            color: isCurrentLevel ? "white" : "#64748B"
                          }}
                        >
                          LVL {level.level}
                        </Text>
                        <Text
                          className="text-base font-bold flex-1"
                          style={{ color: isCurrentLevel ? level.color : "#334155" }}
                        >
                          {level.name}
                        </Text>
                        {isCurrentLevel && (
                          <View
                            className="ml-2 px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: level.color }}
                          >
                            <Text className="text-white text-xs font-semibold">YOU</Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-slate-500 text-sm">
                        {level.xpRequired} XP required
                      </Text>

                      {/* Progress bar for current level */}
                      {isCurrentLevel && (
                        <View className="mt-2">
                          <View className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <View
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: level.color,
                                width: `${progress}%`,
                              }}
                            />
                          </View>
                          <Text className="text-xs text-slate-500 mt-1">
                            {Math.round(progress)}% to next level
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Status icon */}
                    {isLocked && (
                      <Ionicons name="lock-closed" size={20} color="#94A3B8" />
                    )}
                  </View>

                  {/* Connector line */}
                  {index < LEVEL_DATA.length - 1 && (
                    <View
                      className="w-0.5 h-4 ml-6"
                      style={{
                        backgroundColor: isCompleted ? level.color : "#E2E8F0",
                      }}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
