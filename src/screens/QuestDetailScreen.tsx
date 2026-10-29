import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useQuests, useGameStore } from "../state/gameStore";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import ConfettiCelebration from "../components/ConfettiCelebration";

type QuestDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "QuestDetail">;
type QuestDetailScreenRouteProp = RouteProp<RootStackParamList, "QuestDetail">;

// Quest content data
const QUEST_CONTENT: Record<string, {
  type: "identify-strength" | "sensory-choices" | "communication-style";
  story?: string;
  question: string;
  options?: { id: string; text: string; correct?: boolean }[];
  multiSelect?: boolean;
  correctCount?: number;
  freeResponse?: boolean;
  hint?: string;
  explanation?: string;
  relatedWorld?: string;
  relatedWorldName?: string;
}> = {
  "dyslexia-awareness-1": {
    type: "communication-style",
    story: "Your friend Maya takes longer to read assignments and prefers listening to audiobooks instead of reading printed text. During a group project, someone suggests everyone read silently then discuss.",
    question: "How can you support Maya without making her feel different?",
    options: [
      { id: "a", text: "Suggest the group listens to the audiobook version together", correct: true },
      { id: "b", text: "Tell the group Maya has dyslexia and needs special help", correct: false },
      { id: "c", text: "Offer to read aloud for anyone who prefers it", correct: true },
      { id: "d", text: "Tell Maya to just try harder at reading", correct: false },
      { id: "e", text: "Ask Maya privately what would work best for her", correct: true },
    ],
    multiSelect: true,
    correctCount: 3,
    hint: "Good allies offer options that help everyone without singling anyone out.",
    explanation: "Great support is inclusive and private. Offering alternatives that benefit everyone (like audiobooks or reading aloud) helps without making anyone feel different.",
    relatedWorld: "dyslexia-discovery",
    relatedWorldName: "Dyslexia Discovery",
  },
  "dyslexia-strength-1": {
    type: "identify-strength",
    story: "Morgan has dyslexia and struggles with spelling tests. However, when their school cafeteria had a problem with long lunch lines, Morgan came up with a brilliant solution: a color-coded system that reduced wait times by half. The principal was amazed at how Morgan could see the whole problem from above and find a creative fix.",
    question: "What strength is Morgan showing?",
    options: [
      { id: "a", text: "Big-picture thinking and creative problem-solving", correct: true },
      { id: "b", text: "Being good at spelling", correct: false },
      { id: "c", text: "Just being lucky", correct: false },
      { id: "d", text: "Spatial reasoning and seeing patterns others miss", correct: true },
    ],
    multiSelect: true,
    correctCount: 2,
    hint: "Many people with dyslexia excel at seeing the big picture and thinking creatively!",
    explanation: "People with dyslexia often have strong spatial reasoning, big-picture thinking, and creative problem-solving skills. These are valuable strengths in many careers like architecture, engineering, and entrepreneurship!",
    relatedWorld: "dyslexia-discovery",
    relatedWorldName: "Dyslexia Discovery",
  },
  "dyslexia-support-1": {
    type: "sensory-choices",
    story: "Alex has dyslexia and is struggling to finish a reading assignment for class. The text is dense and the deadline is tomorrow.",
    question: "Which tools or accommodations could help Alex succeed?",
    options: [
      { id: "a", text: "Text-to-speech software to listen to the text", correct: true },
      { id: "b", text: "Telling Alex to read faster", correct: false },
      { id: "c", text: "A colored overlay to reduce visual stress", correct: true },
      { id: "d", text: "Extra time to complete the assignment", correct: true },
      { id: "e", text: "Reading the same text repeatedly without breaks", correct: false },
      { id: "f", text: "Breaking the text into smaller chunks", correct: true },
      { id: "g", text: "Using a dyslexia-friendly font", correct: true },
    ],
    multiSelect: true,
    correctCount: 5,
    hint: "Think about tools that make reading easier or provide alternative ways to access information.",
    explanation: "Many tools can help with dyslexia: text-to-speech, colored overlays, extra time, chunking text, and special fonts. The right accommodations help people show their true abilities!",
    relatedWorld: "dyslexia-discovery",
    relatedWorldName: "Dyslexia Discovery",
  },
  "identify-strength-1": {
    type: "identify-strength",
    story: "Jamie spends hours researching butterflies and can name over 100 species. They have created detailed drawings and notes about each one. Their room is filled with butterfly books and they get excited whenever anyone mentions insects.",
    question: "What strength is Jamie showing?",
    options: [
      { id: "a", text: "Obsessive behavior that needs to stop", correct: false },
      { id: "b", text: "Deep focus and passionate expertise", correct: true },
      { id: "c", text: "Being antisocial and weird", correct: false },
      { id: "d", text: "Avoiding other activities", correct: false },
    ],
    hint: "Think about how passion can become expertise!",
    explanation: "Jamie is showing deep focus and passionate expertise. Special interests are strengths - they often lead to careers and bring joy!",
    relatedWorld: "strengths-arena",
    relatedWorldName: "Strengths Arena",
  },
  "sensory-choice-1": {
    type: "sensory-choices",
    question: "Which of the following would make a group study session more sensory-friendly?",
    options: [
      { id: "a", text: "Bright fluorescent lighting", correct: false },
      { id: "b", text: "Soft, adjustable lighting", correct: true },
      { id: "c", text: "Quiet corner available", correct: true },
      { id: "d", text: "Loud background music", correct: false },
      { id: "e", text: "Fidget toys available", correct: true },
      { id: "f", text: "Strong air fresheners", correct: false },
      { id: "g", text: "Noise-canceling options", correct: true },
    ],
    multiSelect: true,
    correctCount: 3,
    hint: "Think about what helps people who are sensitive to light, sound, and need movement.",
    explanation: "Sensory-friendly spaces have adjustable lighting, quiet areas, fidget toys, and avoid overwhelming smells or sounds.",
    relatedWorld: "sensory-world",
    relatedWorldName: "Sensory World",
  },
  "communication-style-1": {
    type: "communication-style",
    story: "Watch these scenarios:\n\n1. Alex says \"Whatever you want\" when asked where to eat, but seems upset later.\n\n2. Jordan says exactly \"I want pizza for dinner\" and waits for a response.",
    question: "Who is using direct communication?",
    options: [
      { id: "a", text: "Alex - they are being polite", correct: false },
      { id: "b", text: "Jordan - they state exactly what they want", correct: true },
      { id: "c", text: "Both are being direct", correct: false },
    ],
    hint: "Direct communication means saying exactly what you mean without hints.",
    explanation: "Jordan is being direct by stating their preference clearly. Alex is using indirect communication, which can lead to misunderstandings.",
    relatedWorld: "communication-forest",
    relatedWorldName: "Communication Forest",
  },
  "identify-strength-2": {
    type: "identify-strength",
    story: "Someone says: \"They are so stubborn and will not change their routine. Every morning has to be exactly the same.\"",
    question: "How would you reframe this as a strength?",
    options: [
      { id: "a", text: "They are reliable and consistent - you can count on them", correct: true },
      { id: "b", text: "They are difficult to work with", correct: false },
      { id: "c", text: "They need to learn to be more flexible", correct: false },
      { id: "d", text: "They have strong attention to structure and routine", correct: true },
    ],
    multiSelect: true,
    correctCount: 2,
    hint: "What is positive about having strong routines?",
    explanation: "Routines show reliability, consistency, and strong organizational skills. Many employers value workers who are predictable and structured!",
    relatedWorld: "strengths-arena",
    relatedWorldName: "Strengths Arena",
  },
  "sensory-choice-2": {
    type: "sensory-choices",
    question: "Match the right sensory tool to each situation:",
    options: [
      { id: "a", text: "Overwhelming classroom = Noise-canceling headphones", correct: true },
      { id: "b", text: "Overwhelming classroom = Louder music", correct: false },
      { id: "c", text: "Need movement during homework = Fidget cube or exercise ball chair", correct: true },
      { id: "d", text: "Need movement during homework = Sit perfectly still", correct: false },
      { id: "e", text: "Trouble sleeping = Weighted blanket", correct: true },
      { id: "f", text: "Trouble sleeping = Bright lights", correct: false },
    ],
    multiSelect: true,
    correctCount: 3,
    hint: "Think about what would help calm or regulate each situation.",
    explanation: "The right sensory tools can help regulate our nervous system: headphones for sound, movement for focus, and weighted blankets for calming pressure.",
    relatedWorld: "sensory-world",
    relatedWorldName: "Sensory World",
  },
  "communication-style-2": {
    type: "communication-style",
    story: "These phrases are unclear:\n\n\"Maybe we could hang out sometime...\"\n\"I am fine\" (said while clearly upset)",
    question: "Which is a more direct way to communicate?",
    options: [
      { id: "a", text: "\"I would like to spend time with you. Are you free Saturday?\"", correct: true },
      { id: "b", text: "\"Perhaps someday we might possibly do something\"", correct: false },
      { id: "c", text: "\"I am feeling upset right now and need a moment\"", correct: true },
      { id: "d", text: "\"Whatever, I do not care\"", correct: false },
    ],
    multiSelect: true,
    correctCount: 2,
    hint: "Direct communication is specific about feelings and intentions.",
    explanation: "Direct communication helps everyone understand each other better. Saying exactly what you mean reduces confusion and frustration.",
    relatedWorld: "communication-forest",
    relatedWorldName: "Communication Forest",
  },
  "identify-strength-3": {
    type: "identify-strength",
    story: "Think of someone with an intense interest in something - maybe video games, trains, weather, or animals. They know everything about it and could talk about it for hours.",
    question: "How could this passion become a career or help others?",
    options: [
      { id: "a", text: "Deep knowledge can lead to expertise in a career field", correct: true },
      { id: "b", text: "Passion makes work feel less like work", correct: true },
      { id: "c", text: "It cannot - interests are just hobbies", correct: false },
      { id: "d", text: "They can teach and inspire others with their knowledge", correct: true },
    ],
    multiSelect: true,
    correctCount: 3,
    hint: "Many successful people turned their special interests into careers!",
    explanation: "Temple Grandin (animals), Mozart (music), and many others turned their intense interests into world-changing careers. Passion + knowledge = expertise!",
    relatedWorld: "strengths-arena",
    relatedWorldName: "Strengths Arena",
  },
  "sensory-choice-3": {
    type: "sensory-choices",
    question: "You are designing a calm-down corner at school. What would help BOTH sensory seekers AND avoiders?",
    options: [
      { id: "a", text: "Dimmable lights (avoiders can dim, seekers can brighten)", correct: true },
      { id: "b", text: "Only beanbag chairs", correct: false },
      { id: "c", text: "Fidget toys AND quiet space (different needs)", correct: true },
      { id: "d", text: "Noise-canceling headphones available", correct: true },
      { id: "e", text: "Weighted blankets available", correct: true },
      { id: "f", text: "Loud calming music always playing", correct: false },
    ],
    multiSelect: true,
    correctCount: 4,
    hint: "The best spaces offer OPTIONS so different people can choose what works for them.",
    explanation: "Great sensory spaces offer choices: adjustable lighting, quiet areas AND movement options, and tools like weighted blankets that work for many people.",
    relatedWorld: "sensory-world",
    relatedWorldName: "Sensory World",
  },
};

export default function QuestDetailScreen() {
  const navigation = useNavigation<QuestDetailScreenNavigationProp>();
  const route = useRoute<QuestDetailScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const quests = useQuests();
  const completeQuest = useGameStore((s) => s.completeQuest);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const quest = quests.find((q) => q.id === route.params.questId);
  const content = QUEST_CONTENT[route.params.questId];

  if (!quest || !content) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center">
        <Text className="text-slate-600">Quest not found</Text>
      </View>
    );
  }

  const isAlreadyCompleted = quest.completed;

  const handleOptionSelect = (optionId: string) => {
    if (submitted || isAlreadyCompleted) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (content.multiSelect) {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        // Allow unlimited selections - no restriction on count
        setSelectedOptions([...selectedOptions, optionId]);
      }
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSubmitted(true);

    const allCorrect = selectedOptions.every((id) =>
      content.options?.find((o) => o.id === id)?.correct
    );
    const hasAllCorrect = content.options
      ?.filter((o) => o.correct)
      .every((o) => selectedOptions.includes(o.id));

    if (allCorrect && (!content.multiSelect || hasAllCorrect)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    completeQuest(quest.id);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const handleRetry = () => {
    setSelectedOptions([]);
    setSubmitted(false);
    setShowHint(false);
  };

  const isCorrectAnswer = () => {
    if (!content.options) return false;
    const correctOptions = content.options.filter((o) => o.correct);
    return (
      selectedOptions.length === correctOptions.length &&
      selectedOptions.every((id) => content.options?.find((o) => o.id === id)?.correct)
    );
  };

  const COLORS: Record<string, [string, string]> = {
    "identify-strength": ["#F59E0B", "#F97316"],
    "sensory-choices": ["#8B5CF6", "#A855F7"],
    "communication-style": ["#10B981", "#14B8A6"],
  };

  const colors = COLORS[content.type] || ["#6366F1", "#8B5CF6"];

  return (
    <View className="flex-1 bg-slate-50">
      {/* Confetti for quest completion */}
      <ConfettiCelebration
        visible={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </Pressable>
          <View className="px-4 py-2 bg-white/20 rounded-full">
            <Text className="text-white text-sm font-semibold">+{quest.xpReward} XP</Text>
          </View>
        </View>

        <Text className="text-white text-2xl font-bold">{quest.title}</Text>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {isAlreadyCompleted && (
          <View className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              <Text className="text-green-800 font-semibold ml-2">
                You have completed this quest!
              </Text>
            </View>
            <Text className="text-green-700 text-sm mt-2">
              Review the content below to refresh your memory.
            </Text>
          </View>
        )}

        {content.story && (
          <View className="bg-white rounded-2xl p-5 mb-6" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
            <View className="flex-row items-center mb-3">
              <Ionicons name="book" size={20} color={colors[0]} />
              <Text className="text-slate-800 font-bold ml-2">Scenario</Text>
            </View>
            <Text className="text-slate-700 leading-relaxed">{content.story}</Text>
          </View>
        )}

        <Text className="text-slate-800 text-lg font-bold mb-4">{content.question}</Text>

        {content.multiSelect && !isAlreadyCompleted && (
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-slate-500 text-sm">
              Select all that apply
            </Text>
            {/* Need Help? link */}
            {content.hint && !submitted && (
              <Pressable
                onPress={() => setShowHint(!showHint)}
                className="flex-row items-center"
              >
                <Ionicons name="help-circle-outline" size={16} color="#F59E0B" />
                <Text className="text-amber-600 text-sm font-medium ml-1 underline">
                  Need help?
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Need Help? link for single-select questions */}
        {!content.multiSelect && !isAlreadyCompleted && content.hint && !submitted && (
          <View className="flex-row justify-end mb-3">
            <Pressable
              onPress={() => setShowHint(!showHint)}
              className="flex-row items-center"
            >
              <Ionicons name="help-circle-outline" size={16} color="#F59E0B" />
              <Text className="text-amber-600 text-sm font-medium ml-1 underline">
                Need help?
              </Text>
            </Pressable>
          </View>
        )}

        {/* Hint content - shown when user taps Need help? */}
        {showHint && !submitted && !isAlreadyCompleted && content.hint && (
          <View className="bg-amber-50 rounded-2xl p-4 mb-4 border border-amber-200">
            <View className="flex-row items-start mb-3">
              <Ionicons name="bulb" size={18} color="#D97706" />
              <Text className="text-amber-800 ml-2 flex-1">{content.hint}</Text>
            </View>

            {content.relatedWorld && (
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  navigation.navigate("WorldDetail", {
                    worldId: content.relatedWorld as import("../types/game").WorldType,
                  });
                }}
                className="bg-amber-500 rounded-xl py-3 flex-row items-center justify-center"
              >
                <Ionicons name="book" size={18} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Learn in {content.relatedWorldName}
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {content.options?.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const showCorrect = (submitted || isAlreadyCompleted) && option.correct;
          const showWrong = submitted && isSelected && !option.correct;

          return (
            <Pressable
              key={option.id}
              onPress={() => handleOptionSelect(option.id)}
              disabled={submitted || isAlreadyCompleted}
              className="mb-3"
            >
              <View
                className={`rounded-2xl p-4 border-2 ${
                  showCorrect
                    ? "bg-green-50 border-green-400"
                    : showWrong
                    ? "bg-amber-50 border-amber-400"
                    : isSelected
                    ? "bg-indigo-50 border-indigo-400"
                    : "bg-white border-slate-200"
                }`}
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                      showCorrect
                        ? "bg-green-400 border-green-400"
                        : showWrong
                        ? "bg-amber-400 border-amber-400"
                        : isSelected
                        ? "bg-indigo-400 border-indigo-400"
                        : "bg-white border-slate-300"
                    }`}
                  >
                    {(showCorrect || (isAlreadyCompleted && option.correct)) && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                    {showWrong && <Ionicons name="close" size={16} color="white" />}
                  </View>
                  <Text
                    className={`flex-1 text-base ${
                      showCorrect ? "text-green-800" : showWrong ? "text-amber-800" : "text-slate-700"
                    }`}
                  >
                    {option.text}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}

        {(submitted || isAlreadyCompleted) && content.explanation && (
          <View className="bg-green-50 rounded-2xl p-4 mt-4 border border-green-200">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#15803D" />
              <View className="flex-1 ml-3">
                <Text className="text-green-800 font-semibold mb-1">Key Insight</Text>
                <Text className="text-green-700">{content.explanation}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View
        className="bg-white border-t border-slate-200 px-5"
        style={{ paddingBottom: insets.bottom + 16, paddingTop: 16 }}
      >
        {isAlreadyCompleted ? (
          <Pressable
            onPress={() => navigation.goBack()}
            className="rounded-2xl py-4 items-center bg-slate-200"
          >
            <Text className="text-slate-600 text-base font-bold">Back to Quests</Text>
          </Pressable>
        ) : !submitted ? (
          <Pressable
            onPress={handleSubmit}
            disabled={selectedOptions.length === 0}
            className={`rounded-2xl py-4 items-center ${
              selectedOptions.length === 0 ? "bg-slate-300" : "bg-indigo-500"
            }`}
          >
            <Text className="text-white text-base font-bold">Submit Answer</Text>
          </Pressable>
        ) : isCorrectAnswer() ? (
          <Pressable
            onPress={handleComplete}
            className="rounded-2xl py-4 items-center bg-green-500"
          >
            <Text className="text-white text-base font-bold">Complete Quest (+{quest.xpReward} XP)</Text>
          </Pressable>
        ) : (
          <View className="flex-row">
            <Pressable
              onPress={handleRetry}
              className="flex-1 rounded-2xl py-4 items-center bg-amber-500 mr-2"
            >
              <Text className="text-white text-base font-bold">Try Again</Text>
            </Pressable>
            <Pressable
              onPress={handleComplete}
              className="flex-1 rounded-2xl py-4 items-center bg-slate-400 ml-2"
            >
              <Text className="text-white text-base font-bold">Continue</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
