import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useBadges, useUserProgress, useWorlds, useCards, useQuests } from "../state/gameStore";
import type { Badge } from "../types/game";

type BadgesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Badges">;

// Calculate progress for each badge type
const getBadgeProgress = (
  badge: Badge,
  userProgress: ReturnType<typeof useUserProgress>,
  worlds: ReturnType<typeof useWorlds>,
  cards: ReturnType<typeof useCards>,
  quests: ReturnType<typeof useQuests>
): { current: number; target: number; percentage: number } => {
  switch (badge.id) {
    case "first-lesson":
      return {
        current: Math.min(userProgress.completedLessons.length, 1),
        target: 1,
        percentage: userProgress.completedLessons.length >= 1 ? 100 : 0,
      };
    case "week-streak":
      return {
        current: Math.min(userProgress.currentStreak, 7),
        target: 7,
        percentage: Math.min((userProgress.currentStreak / 7) * 100, 100),
      };
    case "month-streak":
      return {
        current: Math.min(userProgress.currentStreak, 30),
        target: 30,
        percentage: Math.min((userProgress.currentStreak / 30) * 100, 100),
      };
    case "level-5":
      return {
        current: Math.min(userProgress.level, 5),
        target: 5,
        percentage: Math.min((userProgress.level / 5) * 100, 100),
      };
    case "level-10":
      return {
        current: Math.min(userProgress.level, 10),
        target: 10,
        percentage: Math.min((userProgress.level / 10) * 100, 100),
      };
    case "all-worlds": {
      const worldsWithCompletedLessons = worlds.filter((w) =>
        w.lessons.some((l) => userProgress.completedLessons.includes(l.id))
      ).length;
      return {
        current: worldsWithCompletedLessons,
        target: 6,
        percentage: Math.min((worldsWithCompletedLessons / 6) * 100, 100),
      };
    }
    case "card-collector": {
      const unlockedCards = cards.filter((c) => c.unlocked).length;
      return {
        current: Math.min(unlockedCards, 10),
        target: 10,
        percentage: Math.min((unlockedCards / 10) * 100, 100),
      };
    }
    case "quest-master": {
      const completedQuests = quests.filter((q) => q.completed).length;
      return {
        current: Math.min(completedQuests, 5),
        target: 5,
        percentage: Math.min((completedQuests / 5) * 100, 100),
      };
    }
    case "compassion-badge":
      return {
        current: Math.min(userProgress.completedLessons.length, 20),
        target: 20,
        percentage: Math.min((userProgress.completedLessons.length / 20) * 100, 100),
      };
    case "myth-buster":
      // This would need sorting game tracking - for now estimate based on lessons
      const sortingEstimate = Math.floor(userProgress.completedLessons.length / 3);
      return {
        current: Math.min(sortingEstimate, 5),
        target: 5,
        percentage: Math.min((sortingEstimate / 5) * 100, 100),
      };
    case "sensory-solver": {
      const sensoryWorld = worlds.find((w) => w.id === "sensory-world");
      const sensoryCompleted = sensoryWorld?.lessons.filter((l) =>
        userProgress.completedLessons.includes(l.id)
      ).length || 0;
      const sensoryTotal = sensoryWorld?.lessons.length || 4;
      return {
        current: sensoryCompleted,
        target: sensoryTotal,
        percentage: Math.min((sensoryCompleted / sensoryTotal) * 100, 100),
      };
    }
    default:
      return { current: 0, target: 1, percentage: 0 };
  }
};

export default function BadgesScreen() {
  const navigation = useNavigation<BadgesScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const badges = useBadges();
  const userProgress = useUserProgress();
  const worlds = useWorlds();
  const cards = useCards();
  const quests = useQuests();

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  return (
    <View className="flex-1 bg-slate-50">
      <View
        style={{ paddingTop: insets.top + 16 }}
        className="px-5 pb-4 bg-white border-b border-slate-200"
      >
        <View className="flex-row items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#1E293B" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-slate-800 text-2xl font-bold">Badges</Text>
            <Text className="text-slate-500 text-sm">
              {earnedBadges.length} / {badges.length} earned
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {earnedBadges.length > 0 && (
          <>
            <Text className="text-slate-800 text-lg font-bold mb-4">Earned Badges</Text>
            {earnedBadges.map((badge) => (
              <View
                key={badge.id}
                className="bg-white rounded-2xl p-5 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 5,
                }}
              >
                <View className="flex-row items-start">
                  <View className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 items-center justify-center mr-4"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <Ionicons name="trophy" size={32} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-800 text-lg font-bold mb-1">{badge.name}</Text>
                    <Text className="text-slate-600 text-sm mb-2">{badge.description}</Text>
                    {badge.dateEarned && (
                      <Text className="text-slate-400 text-xs">
                        Earned on {new Date(badge.dateEarned).toLocaleDateString()}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {lockedBadges.length > 0 && (
          <>
            <Text className="text-slate-800 text-lg font-bold mb-4 mt-4">
              Locked Badges ({lockedBadges.length})
            </Text>
            {lockedBadges.map((badge) => {
              const progress = getBadgeProgress(badge, userProgress, worlds, cards, quests);
              const hasProgress = progress.percentage > 0;

              return (
                <View
                  key={badge.id}
                  className="bg-white rounded-2xl p-5 mb-4"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <View className="flex-row items-start">
                    <View
                      className="w-16 h-16 rounded-full items-center justify-center mr-4"
                      style={{
                        backgroundColor: hasProgress ? "#EEF2FF" : "#F1F5F9",
                        borderWidth: hasProgress ? 2 : 0,
                        borderColor: "#6366F1",
                      }}
                    >
                      {hasProgress ? (
                        <Text className="text-2xl">
                          {badge.id === "week-streak" || badge.id === "month-streak" ? "🔥" :
                           badge.id === "level-5" || badge.id === "level-10" ? "⭐" :
                           badge.id === "all-worlds" ? "🌍" :
                           badge.id === "card-collector" ? "🃏" :
                           badge.id === "quest-master" ? "🎯" :
                           badge.id === "compassion-badge" ? "💜" :
                           badge.id === "myth-buster" ? "🛡️" :
                           badge.id === "sensory-solver" ? "🧠" : "🏆"}
                        </Text>
                      ) : (
                        <Ionicons name="lock-closed" size={28} color="#94A3B8" />
                      )}
                    </View>
                    <View className="flex-1">
                      <Text className="text-slate-800 text-lg font-bold mb-1">{badge.name}</Text>
                      <Text className="text-slate-500 text-sm mb-3">{badge.description}</Text>

                      {/* Progress bar */}
                      <View className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                        <View
                          className="h-full rounded-full"
                          style={{
                            width: `${progress.percentage}%`,
                            backgroundColor: progress.percentage >= 100 ? "#10B981" : "#6366F1",
                          }}
                        />
                      </View>
                      <Text className="text-slate-400 text-xs">
                        {progress.current} / {progress.target}
                        {progress.percentage > 0 && progress.percentage < 100 && (
                          <Text className="text-indigo-500"> ({Math.round(progress.percentage)}%)</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}
