import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useWorlds } from "../state/gameStore";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedProgressBar from "../components/AnimatedProgressBar";
import AnimatedButton from "../components/AnimatedButton";

type WorldDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WorldDetail"
>;
type WorldDetailScreenRouteProp = RouteProp<RootStackParamList, "WorldDetail">;

const LESSON_TYPE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  scenario: "document-text",
  sorting: "apps",
  matching: "git-compare",
  quiz: "help-circle",
  animation: "play-circle",
};

export default function WorldDetailScreen() {
  const navigation = useNavigation<WorldDetailScreenNavigationProp>();
  const route = useRoute<WorldDetailScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const worlds = useWorlds();

  const world = worlds.find((w) => w.id === route.params.worldId);

  if (!world) {
    return null;
  }

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient
        colors={[world.color, `${world.color}CC`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center mb-6">
          <AnimatedButton
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </AnimatedButton>
        </View>

        <Text className="text-white text-3xl font-bold mb-2">{world.name}</Text>
        <Text className="text-white/90 text-base mb-6">{world.description}</Text>

        <View className="bg-white/20 rounded-2xl p-4 mb-3">
          <AnimatedProgressBar
            progress={world.progress}
            color="white"
            height={10}
            showLabel
          />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-1 bg-white/20 rounded-2xl p-4 mr-2">
            <Text className="text-white/80 text-xs font-medium mb-1">Completed</Text>
            <Text className="text-white text-2xl font-bold">
              {world.lessons.filter((l) => l.completed).length}/{world.lessons.length}
            </Text>
          </View>
          <View className="flex-1 bg-white/20 rounded-2xl p-4 ml-2">
            <Text className="text-white/80 text-xs font-medium mb-1">Total XP</Text>
            <Text className="text-white text-2xl font-bold">
              {world.lessons.reduce((sum, l) => sum + (l.completed ? l.xpReward : 0), 0)}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-slate-800 text-xl font-bold mb-4">Lessons</Text>

        {world.lessons.map((lesson, index) => {
          const iconName = LESSON_TYPE_ICONS[lesson.type] || "book";
          const isLocked = !lesson.unlocked;

          return (
            <AnimatedButton
              key={lesson.id}
              onPress={() => {
                if (!isLocked) {
                  navigation.navigate("Lesson", { lessonId: lesson.id });
                }
              }}
              disabled={isLocked}
              className="mb-3"
              hapticFeedback={!isLocked}
            >
              <View
                className="bg-white rounded-2xl p-4 flex-row items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                  opacity: isLocked ? 0.5 : 1,
                }}
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: `${world.color}20` }}
                >
                  {lesson.completed ? (
                    <Ionicons name="checkmark-circle" size={24} color={world.color} />
                  ) : isLocked ? (
                    <Ionicons name="lock-closed" size={20} color="#94A3B8" />
                  ) : (
                    <Ionicons name={iconName} size={20} color={world.color} />
                  )}
                </View>

                <View className="flex-1">
                  <Text className="text-slate-800 text-base font-bold mb-1">{lesson.title}</Text>
                  <View className="flex-row items-center">
                    <View
                      className="px-2 py-1 rounded-full mr-2"
                      style={{ backgroundColor: `${world.color}15` }}
                    >
                      <Text className="text-xs font-medium capitalize" style={{ color: world.color }}>
                        {lesson.type}
                      </Text>
                    </View>
                    <Text className="text-slate-500 text-xs">+{lesson.xpReward} XP</Text>
                  </View>
                </View>

                {!isLocked && !lesson.completed && (
                  <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                )}
              </View>
            </AnimatedButton>
          );
        })}
      </ScrollView>
    </View>
  );
}
