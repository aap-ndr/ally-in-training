import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCards, useGameStore } from "../state/gameStore";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import XPGainAnimation from "../components/XPGainAnimation";
import ConfettiCelebration from "../components/ConfettiCelebration";

type CardQuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CardQuiz">;
type CardQuizScreenRouteProp = RouteProp<RootStackParamList, "CardQuiz">;

const XP_PER_CORRECT = 10;

// Fun congratulatory messages
const CONGRATS_MESSAGES = [
  { title: "Amazing!", subtitle: "You really know your stuff!" },
  { title: "Brilliant!", subtitle: "Your understanding is growing!" },
  { title: "Fantastic!", subtitle: "Keep up the great work!" },
  { title: "Superstar!", subtitle: "You nailed it!" },
  { title: "Wonderful!", subtitle: "Your knowledge shines bright!" },
  { title: "Excellent!", subtitle: "You are becoming an expert!" },
  { title: "Outstanding!", subtitle: "That was perfect!" },
  { title: "Incredible!", subtitle: "You are on fire!" },
];

const getRandomCongrats = () => {
  return CONGRATS_MESSAGES[Math.floor(Math.random() * CONGRATS_MESSAGES.length)];
};

interface AnswerOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  showResult: boolean;
  isCorrectAnswer: boolean;
  onSelect: (index: number) => void;
}

function AnswerOption({
  option,
  index,
  isSelected,
  showResult,
  isCorrectAnswer,
  onSelect,
}: AnswerOptionProps) {
  const buttonScale = useSharedValue(1);

  let bgColor = "bg-white";
  let borderColor = "#E2E8F0";
  let textColor = "text-slate-700";

  if (showResult) {
    if (isCorrectAnswer) {
      bgColor = "bg-emerald-50";
      borderColor = "#10B981";
      textColor = "text-emerald-800";
    } else if (isSelected && !isCorrectAnswer) {
      bgColor = "bg-red-50";
      borderColor = "#EF4444";
      textColor = "text-red-800";
    }
  } else if (isSelected) {
    bgColor = "bg-indigo-50";
    borderColor = "#6366F1";
    textColor = "text-indigo-800";
  }

  const handlePress = async () => {
    if (showResult) return;

    buttonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1)
    );

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(index);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        disabled={showResult}
        className={`${bgColor} rounded-2xl p-4 mb-3 flex-row items-center active:opacity-80`}
        style={{
          borderWidth: 2,
          borderColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View
          className="w-8 h-8 rounded-full items-center justify-center mr-3"
          style={{
            backgroundColor: isSelected || (showResult && isCorrectAnswer) ? borderColor : "#F1F5F9",
          }}
        >
          {showResult && isCorrectAnswer ? (
            <Ionicons name="checkmark" size={18} color="white" />
          ) : showResult && isSelected && !isCorrectAnswer ? (
            <Ionicons name="close" size={18} color="white" />
          ) : (
            <Text
              className="font-bold"
              style={{ color: isSelected ? "white" : "#64748B" }}
            >
              {String.fromCharCode(65 + index)}
            </Text>
          )}
        </View>
        <Text className={`${textColor} text-base flex-1`} style={{ lineHeight: 22 }}>
          {option}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export default function CardQuizScreen() {
  const navigation = useNavigation<CardQuizScreenNavigationProp>();
  const route = useRoute<CardQuizScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const cards = useCards();
  const addXP = useGameStore((s) => s.addXP);

  const { cardId } = route.params;
  const card = cards.find((c) => c.id === cardId);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState(getRandomCongrats());

  const resultScale = useSharedValue(0);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null || !card?.quizQuestion) return;

    const correct = selectedAnswer === card.quizQuestion.correctIndex;
    setIsCorrect(correct);
    setShowResult(true);

    resultScale.value = withSpring(1, { damping: 12 });

    if (correct) {
      setCongratsMessage(getRandomCongrats());
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      addXP(XP_PER_CORRECT);
      setShowXPAnimation(true);
      setShowConfetti(true);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const resultAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: resultScale.value }],
    opacity: resultScale.value,
  }));

  if (!card || !card.quizQuestion) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center">
        <Ionicons name="alert-circle" size={48} color="#94A3B8" />
        <Text className="text-slate-500 text-lg mt-4">Quiz not available</Text>
        <Pressable
          onPress={() => navigation.goBack()}
          className="mt-6 px-6 py-3 bg-indigo-500 rounded-full"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      {/* Confetti */}
      <ConfettiCelebration
        visible={showConfetti}
        onComplete={() => setShowConfetti(false)}
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
        <View className="flex-row items-center mb-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3"
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-white/80 text-sm">Test Your Knowledge</Text>
            <Text className="text-white text-lg font-bold" numberOfLines={1}>
              {card.title}
            </Text>
          </View>
          <View className="bg-white/20 px-3 py-1.5 rounded-full flex-row items-center">
            <Ionicons name="star" size={16} color="#FCD34D" />
            <Text className="text-white font-semibold ml-1">+{XP_PER_CORRECT} XP</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Card */}
        <View
          className="bg-white rounded-3xl p-6 mb-6"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <View className="w-12 h-12 rounded-full bg-indigo-100 items-center justify-center mb-4">
            <Ionicons name="help" size={24} color="#6366F1" />
          </View>
          <Text className="text-slate-800 text-xl font-bold leading-relaxed">
            {card.quizQuestion.question}
          </Text>
        </View>

        {/* Answer Options */}
        {card.quizQuestion.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            showResult={showResult}
            isCorrectAnswer={index === card.quizQuestion!.correctIndex}
            onSelect={handleAnswerSelect}
          />
        ))}

        {/* Result Message */}
        {showResult && (
          <Animated.View style={resultAnimatedStyle}>
            <View
              className={`rounded-2xl p-5 mt-4 ${isCorrect ? "bg-emerald-100" : "bg-amber-100"}`}
              style={{
                borderWidth: 2,
                borderColor: isCorrect ? "#10B981" : "#F59E0B",
              }}
            >
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name={isCorrect ? "checkmark-circle" : "information-circle"}
                  size={28}
                  color={isCorrect ? "#059669" : "#D97706"}
                />
                <View className="ml-3 flex-1">
                  <Text
                    className={`text-xl font-bold ${isCorrect ? "text-emerald-800" : "text-amber-800"}`}
                  >
                    {isCorrect ? congratsMessage.title : "Not quite right"}
                  </Text>
                  <Text className={`text-sm ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
                    {isCorrect ? congratsMessage.subtitle : "Keep learning!"}
                  </Text>
                </View>
              </View>
              <View className="mt-3 pt-3 border-t border-emerald-200/50">
                <Text className={`text-sm ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
                  {isCorrect
                    ? `You earned ${XP_PER_CORRECT} XP for understanding ${card.title}!`
                    : `The correct answer was: "${card.quizQuestion.options[card.quizQuestion.correctIndex]}"`}
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200"
        style={{ paddingBottom: insets.bottom + 16, paddingTop: 16, paddingHorizontal: 20 }}
      >
        {!showResult ? (
          <Pressable
            onPress={handleSubmit}
            disabled={selectedAnswer === null}
            className={`py-4 rounded-2xl items-center ${
              selectedAnswer !== null ? "bg-indigo-500" : "bg-slate-300"
            }`}
            style={{
              shadowColor: selectedAnswer !== null ? "#6366F1" : "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="text-white text-lg font-bold">Check Answer</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.goBack()}
            className="py-4 rounded-2xl items-center bg-indigo-500"
            style={{
              shadowColor: "#6366F1",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="text-white text-lg font-bold">Continue</Text>
          </Pressable>
        )}
      </View>

      {/* XP Animation */}
      <XPGainAnimation
        xpAmount={XP_PER_CORRECT}
        visible={showXPAnimation}
        onComplete={() => setShowXPAnimation(false)}
      />
    </View>
  );
}
