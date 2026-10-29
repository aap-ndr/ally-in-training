import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useWorlds, useUserProgress, useGameStore } from "../state/gameStore";
import { CHARACTERS } from "../data/characters";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import type { CharacterType, WorldType } from "../types/game";

type GuidedJourneyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "GuidedJourney">;
type GuidedJourneyScreenRouteProp = RouteProp<RootStackParamList, "GuidedJourney">;

// Map guides to their recommended worlds
const GUIDE_WORLDS: Record<CharacterType, WorldType[]> = {
  spark: ["adhd-adventure", "executive-function"],
  wave: ["autism-awareness", "communication-forest"],
  echo: ["sensory-world"],
  flux: ["executive-function", "strengths-arena"],
  page: ["dyslexia-discovery", "strengths-arena"],
};

// Guide-specific tips for neurodivergent teens
const ND_TIPS: Record<CharacterType, string[]> = {
  spark: [
    "Hyperfocus can be your superpower when you find something interesting!",
    "Your brain works differently, and that is a strength!",
    "ADHD presents differently in girls - it is not just about hyperactivity or not being able to sit still. Inattentiveness, daydreaming, and feeling overwhelmed are just as real.",
    "Time blindness is real - set a timer to help keep track!",
    "Take breaks when you need them - movement can help you reset and refocus!",
  ],
  wave: [
    "Clear communication helps everyone understand each other better.",
    "Routines give structure and help reduce anxiety.",
    "Special interests are not weird - they are areas of expertise!",
    "It is okay to need time to process information.",
  ],
  echo: [
    "Your senses might be more sensitive - that is your superpower for noticing details!",
    "Finding the right sensory tools can make a big difference.",
    "It is okay to need quiet time to recharge.",
    "Different environments affect people in different ways.",
  ],
  flux: [
    "Breaking big tasks into small steps makes them easier to start.",
    "External reminders like lists and timers are helpful tools.",
    "Planning ahead can reduce stress and overwhelm.",
    "Organization looks different for everyone - find what works for you!",
  ],
  page: [
    "Reading differently is not reading wrong - it is just different!",
    "Audiobooks and text-to-speech are awesome tools, not cheating!",
    "Your creative brain sees solutions others might miss.",
    "Many successful entrepreneurs, artists, and inventors have dyslexia!",
  ],
};

// Tips for ally users - how to support neurodivergent friends
const ALLY_TIPS: Record<CharacterType, string[]> = {
  spark: [
    "Volunteer to be a body double to your friend. Sometimes doing things together can help with their procrastination or motivation.",
    "Give your ADHD friends grace when they need to move or fidget during conversations.",
    "Help them by sending reminders for events - time blindness makes this genuinely helpful!",
    "Celebrate their passions when they hyperfocus, even if the topic seems unusual.",
    "Be patient if they interrupt - their brain is excited, not being rude!",
  ],
  wave: [
    "Say what you mean directly - hints and sarcasm can be confusing.",
    "Respect their routines - sudden changes can be really stressful.",
    "Ask about their special interests - they love sharing what they are passionate about!",
    "Give them time to respond - processing can take longer and that is okay.",
  ],
  echo: [
    "Ask before hugging or touching - some people are sensitive to unexpected contact.",
    "Keep volume in mind - what seems normal to you might be overwhelming.",
    "Offer a quiet space if things get too loud or busy at events.",
    "Notice if they seem uncomfortable - they might need a sensory break.",
  ],
  flux: [
    "Help them break big projects into smaller, manageable steps.",
    "Be a body double - just being present can help them start tasks!",
    "Do not take it personally if they forget things - offer gentle reminders.",
    "Celebrate small wins with them - starting tasks is often the hardest part.",
  ],
  page: [
    "Give them extra time to read without making them feel rushed or embarrassed.",
    "Offer to read instructions out loud - it can really help!",
    "Appreciate their creative ideas and different perspective on problems.",
    "Never make fun of spelling mistakes - focus on their ideas instead.",
  ],
};

const GUIDE_EMOJIS: Record<CharacterType, string> = {
  spark: "⚡",
  wave: "🌊",
  echo: "🎵",
  flux: "⚙️",
   page: "📖",
};

export default function GuidedJourneyScreen() {
  const navigation = useNavigation<GuidedJourneyScreenNavigationProp>();
  const route = useRoute<GuidedJourneyScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const worlds = useWorlds();
  const userProgress = useUserProgress();
  const selectGuide = useGameStore((s) => s.selectGuide);

  const guideId = route.params.guideId;
  const character = CHARACTERS[guideId];

  if (!character) {
    return null;
  }

  const recommendedWorldIds = GUIDE_WORLDS[guideId];
  const recommendedWorlds = worlds.filter((w) => recommendedWorldIds.includes(w.id));
  const ndTips = ND_TIPS[guideId];
  const allyTips = ALLY_TIPS[guideId];
  const emoji = GUIDE_EMOJIS[guideId];

  const handleSelectGuide = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    selectGuide(guideId);
  };

  const handleStartLesson = (lessonId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("Lesson", { lessonId });
  };

  // Get next recommended lesson (first incomplete lesson in recommended worlds)
  const getNextLesson = () => {
    for (const world of recommendedWorlds) {
      const nextLesson = world.lessons.find(
        (l) => l.unlocked && !userProgress.completedLessons.includes(l.id)
      );
      if (nextLesson) {
        return { lesson: nextLesson, world };
      }
    }
    return null;
  };

  const nextLessonInfo = getNextLesson();

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient
        colors={[character.color, `${character.color}DD`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 32,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </Pressable>
        </View>

        <View className="flex-row items-center">
          <View className="w-20 h-20 rounded-full bg-white/30 items-center justify-center mr-4">
            <Text className="text-4xl">{emoji}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-1">{character.name}</Text>
            <Text className="text-white/90 text-base">{character.description}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Guide's Focus */}
        <View
          className="rounded-2xl p-5 mb-6"
          style={{
            backgroundColor: `${character.color}15`,
            borderWidth: 1,
            borderColor: `${character.color}30`,
          }}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="star" size={20} color={character.color} />
            <Text className="text-slate-800 font-bold ml-2">What I Teach</Text>
          </View>
          <Text className="text-slate-700">{character.focus}</Text>
        </View>

        {/* Next Recommended Lesson */}
        {nextLessonInfo && (
          <>
            <Text className="text-slate-800 text-lg font-bold mb-3">Next Lesson</Text>
            <Pressable
              onPress={() => handleStartLesson(nextLessonInfo.lesson.id)}
              className="mb-6"
            >
              <View
                className="rounded-2xl overflow-hidden"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 5,
                }}
              >
                <LinearGradient
                  colors={[character.color, `${character.color}CC`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 20 }}
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="px-3 py-1 bg-white/20 rounded-full">
                      <Text className="text-white/90 text-xs font-medium">
                        {nextLessonInfo.world.name}
                      </Text>
                    </View>
                    <View className="px-3 py-1 bg-white/30 rounded-full">
                      <Text className="text-white text-xs font-bold">
                        +{nextLessonInfo.lesson.xpReward} XP
                      </Text>
                    </View>
                  </View>
                  <Text className="text-white text-xl font-bold mb-2">
                    {nextLessonInfo.lesson.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="play-circle" size={24} color="white" />
                    <Text className="text-white font-semibold ml-2">Start Lesson</Text>
                  </View>
                </LinearGradient>
              </View>
            </Pressable>
          </>
        )}

        {/* Tips for Allies - First */}
        <Text className="text-slate-800 text-lg font-bold mb-3">Tips for Allies</Text>
        <View className="mb-6">
          {allyTips.map((tip: string, index: number) => (
            <View
              key={index}
              className="bg-indigo-50 rounded-2xl p-4 mb-3 flex-row items-start border border-indigo-100"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-3 bg-indigo-100"
              >
                <Text>🤝</Text>
              </View>
              <Text className="flex-1 text-indigo-800 text-sm leading-relaxed">{tip}</Text>
            </View>
          ))}
        </View>

        {/* Tips for ND Friends - Second */}
        <Text className="text-slate-800 text-lg font-bold mb-3">
          Tips for {guideId === "spark" ? "ADHD" : guideId === "wave" ? "Autistic" : guideId === "echo" ? "Sensory-Sensitive" : guideId === "page" ? "Dyslexic" : "Executive Function"} Friends
        </Text>
        <View className="mb-6">
          {ndTips.map((tip: string, index: number) => (
            <View
              key={index}
              className="bg-white rounded-2xl p-4 mb-3 flex-row items-start"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${character.color}20` }}
              >
                <Text>{emoji}</Text>
              </View>
              <Text className="flex-1 text-slate-700 text-sm leading-relaxed">{tip}</Text>
            </View>
          ))}
        </View>

        {/* Recommended Worlds */}
        <Text className="text-slate-800 text-lg font-bold mb-3">My Learning Paths</Text>
        {recommendedWorlds.map((world) => {
          const completedLessons = world.lessons.filter((l) =>
            userProgress.completedLessons.includes(l.id)
          ).length;
          const totalLessons = world.lessons.length;
          const progress = (completedLessons / totalLessons) * 100;

          return (
            <Pressable
              key={world.id}
              onPress={() => navigation.navigate("WorldDetail", { worldId: world.id })}
              className="mb-3"
            >
              <View
                className="bg-white rounded-2xl p-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: `${world.color}20` }}
                    >
                      <Ionicons
                        name={world.icon as keyof typeof Ionicons.glyphMap}
                        size={20}
                        color={world.color}
                      />
                    </View>
                    <View>
                      <Text className="text-slate-800 font-bold">{world.name}</Text>
                      <Text className="text-slate-500 text-xs">
                        {completedLessons} / {totalLessons} lessons
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </View>

                <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: world.color }}
                  />
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
