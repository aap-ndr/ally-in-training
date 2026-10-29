import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useQuests, useGameStore } from "../state/gameStore";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedButton from "../components/AnimatedButton";

type QuestsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Quests">;

const QUEST_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  "identify-strength": "star",
  "sensory-choices": "color-palette",
  "communication-style": "chatbubbles",
};

const QUEST_COLORS: Record<string, [string, string]> = {
  "identify-strength": ["#F59E0B", "#F97316"],
  "sensory-choices": ["#8B5CF6", "#A855F7"],
  "communication-style": ["#10B981", "#14B8A6"],
};

export default function QuestsScreen() {
  const navigation = useNavigation<QuestsScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const quests = useQuests();
  const completeQuest = useGameStore((s) => s.completeQuest);

  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient
        colors={["#F59E0B", "#F97316"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <AnimatedButton
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </AnimatedButton>
          <View className="px-4 py-2 bg-white/20 rounded-full">
            <Text className="text-white text-sm font-semibold">
              {completedQuests.length} / {quests.length}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mb-2">
          <View className="w-12 h-12 rounded-full bg-white/30 items-center justify-center mr-3">
            <Ionicons name="compass" size={24} color="white" />
          </View>
          <Text className="text-white text-3xl font-bold">Quests</Text>
        </View>
        <Text className="text-white/90 text-base">
          Practice what you learned!
        </Text>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {activeQuests.length > 0 && (
          <>
            <Text className="text-slate-800 text-lg font-bold mb-4">Active Quests</Text>
            {activeQuests.map((quest) => {
              const colors = QUEST_COLORS[quest.type] || ["#6366F1", "#8B5CF6"];
              const iconName = QUEST_ICONS[quest.type] || "compass";

              return (
                <AnimatedButton
                  key={quest.id}
                  onPress={() => navigation.navigate("QuestDetail", { questId: quest.id })}
                  className="mb-4"
                >
                  <View
                    className="rounded-3xl overflow-hidden"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 12,
                      elevation: 5,
                    }}
                  >
                    <LinearGradient
                      colors={colors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ padding: 20 }}
                    >
                      <View className="flex-row items-center justify-between mb-3">
                        <View className="w-14 h-14 rounded-full bg-white/30 items-center justify-center">
                          <Ionicons name={iconName} size={28} color="white" />
                        </View>
                        <View className="px-4 py-2 bg-white/30 rounded-full">
                          <Text className="text-white text-sm font-bold">+{quest.xpReward} XP</Text>
                        </View>
                      </View>

                      <Text className="text-white text-xl font-bold mb-2">{quest.title}</Text>
                      <Text className="text-white/90 text-sm" numberOfLines={2}>
                        {quest.description}
                      </Text>

                      <View className="mt-4 flex-row items-center">
                        <View className="flex-1 bg-white/20 rounded-full p-3">
                          <Text className="text-white text-center text-sm font-semibold">
                            Complete Quest
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                </AnimatedButton>
              );
            })}
          </>
        )}

        {completedQuests.length > 0 && (
          <>
            <Text className="text-slate-800 text-lg font-bold mb-4 mt-2">Completed</Text>
            <View className="flex-row flex-wrap">
              {completedQuests.map((quest) => {
                const colors: [string, string] = QUEST_COLORS[quest.type] || ["#6366F1", "#8B5CF6"];
                const iconName = QUEST_ICONS[quest.type] || "compass";

                return (
                  <AnimatedButton
                    key={quest.id}
                    onPress={() => navigation.navigate("QuestDetail", { questId: quest.id })}
                    style={{ width: "47%" }}
                    className="mb-3 mr-3"
                  >
                    <LinearGradient
                      colors={[colors[0], colors[1], `${colors[1]}CC`] as [string, string, ...string[]]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ padding: 16, opacity: 0.6, borderRadius: 16 }}
                    >
                      <View className="w-12 h-12 rounded-full bg-white/40 items-center justify-center mb-2">
                        <Ionicons name="checkmark" size={24} color="white" />
                      </View>
                      <Text className="text-white text-sm font-bold" numberOfLines={2}>
                        {quest.title}
                      </Text>
                    </LinearGradient>
                  </AnimatedButton>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
