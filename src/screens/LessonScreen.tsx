import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useWorlds, useGameStore } from "../state/gameStore";
import * as Haptics from "expo-haptics";
import type { SortItem, MatchPair, QuizQuestion } from "../types/game";
import ConfettiCelebration from "../components/ConfettiCelebration";
import AppLogo from "../components/AppLogo";

type LessonScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Lesson">;
type LessonScreenRouteProp = RouteProp<RootStackParamList, "Lesson">;

// Encouraging messages for wrong answers
const SCENARIO_ENCOURAGING_MESSAGES = [
  { message: "Almost there!", hint: "Think about how this might feel from their perspective." },
  { message: "Good try!", hint: "Consider what genuine support might look like here." },
  { message: "You are learning!", hint: "Put yourself in their shoes and try again." },
  { message: "Nice effort!", hint: "Think about what true allyship looks like in this moment." },
  { message: "Keep it up!", hint: "Every person experiences this differently - think it through." },
];

const FACTUAL_ENCOURAGING_MESSAGES = [
  { message: "Almost there!", hint: "Read through each option carefully and try again." },
  { message: "Good try!", hint: "Take another look - the right answer is in there." },
  { message: "You are learning!", hint: "Every attempt brings you closer to understanding." },
  { message: "Nice effort!", hint: "No rush - review the options and give it another go." },
  { message: "Keep it up!", hint: "Think it through and try again." },
];

const getRandomEncouragement = (lessonType?: string) => {
  const pool = lessonType === "scenario" ? SCENARIO_ENCOURAGING_MESSAGES : FACTUAL_ENCOURAGING_MESSAGES;
  return pool[Math.floor(Math.random() * pool.length)];
};

export default function LessonScreen() {
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const route = useRoute<LessonScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const worlds = useWorlds();
  const completeLesson = useGameStore((s) => s.completeLesson);

  // Scenario state
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [encouragement, setEncouragement] = useState(getRandomEncouragement("scenario"));

  // Sorting state
  const [sortedItems, setSortedItems] = useState<Record<string, string>>({});
  const [sortingComplete, setSortingComplete] = useState(false);
  const [sortingResults, setSortingResults] = useState<Record<string, boolean>>({});

  // Matching state
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [wrongMatch, setWrongMatch] = useState<number | null>(null);
  const [shuffledRightOrder, setShuffledRightOrder] = useState<number[]>([]);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);

  // Find lesson across all worlds
  let lesson = null;
  let world = null;
  for (const w of worlds) {
    const found = w.lessons.find((l) => l.id === route.params.lessonId);
    if (found) {
      lesson = found;
      world = w;
      break;
    }
  }

  // Initialize shuffled order for matching lessons
  useEffect(() => {
    if (lesson?.type === "matching" && lesson.content.matching) {
      const indices = lesson.content.matching.pairs.map((_, i) => i);
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledRightOrder(indices);
    }
  }, [lesson?.id]);

  if (!lesson || !world) {
    return null;
  }

  const handleChoiceSelect = (index: number) => {
    if (showFeedback) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedChoice(index);
  };

  const handleSubmit = () => {
    if (selectedChoice === null) return;
    const choice = lesson.content.scenario?.choices[selectedChoice];
    if (!choice) return;

    setIsCorrect(choice.isCorrect);
    setShowFeedback(true);

    if (choice.isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setEncouragement(getRandomEncouragement("scenario"));
    }
  };

  const handleContinue = () => {
    if (!isCorrect) {
      setSelectedChoice(null);
      setShowFeedback(false);
      return;
    }
    finishLesson();
  };

  const finishLesson = () => {
    setShowConfetti(true);
    completeLesson(lesson!.id, lesson!.xpReward);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  // --- SORTING LESSON ---
  const handleSortItem = (itemId: string, category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSortedItems((prev) => ({ ...prev, [itemId]: category }));
  };

  const handleCheckSorting = () => {
    if (!lesson.content.sorting) return;
    const results: Record<string, boolean> = {};
    let allCorrect = true;

    lesson.content.sorting.items.forEach((item) => {
      const isCorrect = sortedItems[item.id] === item.correctCategory;
      results[item.id] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setSortingResults(results);
    setSortingComplete(true);

    if (allCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setEncouragement(getRandomEncouragement("sorting"));
    }
  };

  const handleRetrySorting = () => {
    setSortedItems({});
    setSortingComplete(false);
    setSortingResults({});
  };

  const allSortingCorrect = Object.values(sortingResults).every((v) => v);

  // --- MATCHING LESSON ---
  // handleMatchSelect: leftIndex is the original pair index, rightOriginalIndex is which original pair index the user selected on right
  const handleMatchSelect = (originalIndex: number, side: "left" | "right") => {
    if (matchedPairs.includes(originalIndex)) return;

    if (side === "left") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedLeft(originalIndex);
      setWrongMatch(null);
    } else if (selectedLeft !== null && side === "right") {
      // Check if selected left matches the original index of the right item
      if (selectedLeft === originalIndex) {
        // Correct match
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setMatchedPairs([...matchedPairs, originalIndex]);
        setSelectedLeft(null);
      } else {
        // Wrong match
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setWrongMatch(originalIndex);
        setEncouragement(getRandomEncouragement("matching"));
        setTimeout(() => {
          setWrongMatch(null);
          setSelectedLeft(null);
        }, 1000);
      }
    }
  };

  const matchingComplete = lesson.content.matching
    ? matchedPairs.length === lesson.content.matching.pairs.length
    : false;

  // --- QUIZ LESSON ---
  const handleQuizAnswer = (answerIndex: number) => {
    if (showQuizFeedback) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQuizAnswers((prev) => ({ ...prev, [currentQuestion]: answerIndex }));
  };

  const handleQuizSubmit = () => {
    if (quizAnswers[currentQuestion] === undefined) return;
    const questions = lesson.content.quiz?.questions || [];
    const isCorrect = quizAnswers[currentQuestion] === questions[currentQuestion].correctIndex;
    setShowQuizFeedback(true);

    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setEncouragement(getRandomEncouragement("quiz"));
    }
  };

  const handleQuizNext = () => {
    const questions = lesson.content.quiz?.questions || [];
    const isCorrect = quizAnswers[currentQuestion] === questions[currentQuestion].correctIndex;

    if (!isCorrect) {
      // Reset for retry
      setQuizAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[currentQuestion];
        return newAnswers;
      });
      setShowQuizFeedback(false);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowQuizFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  // Common header
  const renderHeader = () => (
    <>
      {/* Confetti for lesson completion */}
      <ConfettiCelebration
        visible={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
      <View
        style={{ paddingTop: insets.top + 16 }}
        className="px-5 pb-4 bg-white border-b border-slate-200"
      >
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
          >
            <Ionicons name="close" size={20} color="#1E293B" />
          </Pressable>
          <Text className="text-slate-800 text-lg font-bold flex-1 text-center mr-10">
            {lesson.title}
          </Text>
        </View>
      </View>
    </>
  );

  // SCENARIO LESSON
  if (lesson.type === "scenario" && lesson.content.scenario) {
    const scenario = lesson.content.scenario;

    return (
      <View className="flex-1 bg-slate-50">
        {renderHeader()}

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            className="rounded-3xl p-6 mb-6"
            style={{ backgroundColor: "#EEF2FF" }}
          >
            <View className="flex-row items-start mb-3">
              <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                <Ionicons name="book" size={20} color="#6366F1" />
              </View>
              <Text className="flex-1 text-indigo-900 text-base leading-relaxed">
                {scenario.situation}
              </Text>
            </View>
          </View>

          <Text className="text-slate-800 text-lg font-bold mb-4">{scenario.question}</Text>

          {scenario.choices.map((choice, index) => {
            const isSelected = selectedChoice === index;
            // Only show correct answer if user got it right, not when they got it wrong
            const showCorrect = showFeedback && isCorrect && choice.isCorrect;
            const showIncorrect = showFeedback && isSelected && !choice.isCorrect;

            return (
              <Pressable
                key={index}
                onPress={() => handleChoiceSelect(index)}
                disabled={showFeedback}
                className="mb-3"
              >
                <View
                  className={`rounded-2xl p-4 border-2 ${
                    showCorrect
                      ? "bg-green-50 border-green-400"
                      : showIncorrect
                      ? "bg-red-50 border-red-400"
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
                          : showIncorrect
                          ? "bg-red-400 border-red-400"
                          : isSelected
                          ? "bg-indigo-400 border-indigo-400"
                          : "bg-white border-slate-300"
                      }`}
                    >
                      {showCorrect && <Ionicons name="checkmark" size={16} color="white" />}
                      {showIncorrect && <Ionicons name="close" size={16} color="white" />}
                    </View>
                    <Text
                      className={`flex-1 text-base ${showCorrect || showIncorrect ? "font-semibold" : ""}`}
                      style={{ color: showCorrect ? "#15803D" : showIncorrect ? "#991B1B" : "#1E293B" }}
                    >
                      {choice.text}
                    </Text>
                  </View>

                  {showFeedback && isSelected && (
                    <View className="mt-3 pt-3 border-t border-slate-200">
                      <Text
                        className="text-sm"
                        style={{ color: choice.isCorrect ? "#15803D" : "#92400E" }}
                      >
                        {choice.feedback}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}

          {showFeedback && !isCorrect && (
            <View className="mt-4 bg-red-50 rounded-2xl p-4 border border-red-200">
              <View className="flex-row items-start">
                <AppLogo size={28} />
                <View className="flex-1 ml-3">
                  <Text className="text-red-800 text-base font-semibold mb-1">
                    {encouragement.message}
                  </Text>
                  <Text className="text-red-700 text-sm">{encouragement.hint}</Text>
                </View>
              </View>
            </View>
          )}

          {showFeedback && isCorrect && (
            <View className="mt-4 bg-green-50 rounded-2xl p-4 border border-green-200">
              <View className="flex-row items-start">
                <Ionicons name="bulb" size={20} color="#15803D" />
                <View className="flex-1 ml-3">
                  <Text className="text-green-800 text-sm font-semibold mb-1">Why this matters:</Text>
                  <Text className="text-green-700 text-sm">{scenario.explanation}</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View
          className="bg-white border-t border-slate-200 px-5"
          style={{ paddingBottom: insets.bottom + 16, paddingTop: 16 }}
        >
          {!showFeedback ? (
            <Pressable
              onPress={handleSubmit}
              disabled={selectedChoice === null}
              className={`rounded-2xl py-4 items-center ${
                selectedChoice === null ? "bg-slate-300" : "bg-indigo-500"
              }`}
            >
              <Text className="text-white text-base font-bold">Submit Answer</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleContinue}
              className={`rounded-2xl py-4 items-center ${isCorrect ? "bg-green-500" : "bg-red-500"}`}
            >
              <Text className="text-white text-base font-bold">
                {isCorrect ? `Continue (+${lesson.xpReward} XP)` : "Try Again"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  // SORTING LESSON
  if (lesson.type === "sorting" && lesson.content.sorting) {
    const sorting = lesson.content.sorting;

    return (
      <View className="flex-1 bg-slate-50">
        {renderHeader()}

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-indigo-50 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center">
              <Ionicons name="swap-horizontal" size={24} color="#6366F1" />
              <Text className="text-indigo-800 text-base font-medium ml-3 flex-1">
                {sorting.instruction}
              </Text>
            </View>
          </View>

          {/* Category Headers */}
          <View className="flex-row mb-4">
            {sorting.categories.map((cat, i) => (
              <View
                key={cat}
                className={`flex-1 py-3 rounded-xl items-center ${i === 0 ? "mr-2 bg-blue-100" : "ml-2 bg-orange-100"}`}
              >
                <Text className={`font-bold ${i === 0 ? "text-blue-700" : "text-orange-700"}`}>{cat}</Text>
              </View>
            ))}
          </View>

          {/* Items to Sort */}
          {sorting.items.map((item) => {
            const sorted = sortedItems[item.id];
            const isCorrect = sortingComplete && sortingResults[item.id];
            const isWrong = sortingComplete && sortingResults[item.id] === false;

            return (
              <View key={item.id} className="mb-3">
                <View
                  className={`rounded-2xl p-4 ${
                    isCorrect
                      ? "bg-green-50 border-2 border-green-300"
                      : isWrong
                      ? "bg-red-50 border-2 border-red-300"
                      : "bg-white border border-slate-200"
                  }`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <Text className="text-slate-800 text-base mb-3">{item.text}</Text>

                  <View className="flex-row">
                    {sorting.categories.map((cat, i) => {
                      const isSelected = sorted === cat;
                      return (
                        <Pressable
                          key={cat}
                          onPress={() => !sortingComplete && handleSortItem(item.id, cat)}
                          disabled={sortingComplete}
                          className={`flex-1 py-2 rounded-lg items-center ${i === 0 ? "mr-1" : "ml-1"} ${
                            isSelected
                              ? i === 0
                                ? "bg-blue-500"
                                : "bg-orange-500"
                              : "bg-slate-100"
                          }`}
                        >
                          <Text
                            className={`text-sm font-semibold ${isSelected ? "text-white" : "text-slate-600"}`}
                          >
                            {cat}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          })}

          {sortingComplete && !allSortingCorrect && (
            <View className="mt-4 bg-red-50 rounded-2xl p-4 border border-red-200">
              <View className="flex-row items-start">
                <AppLogo size={28} />
                <View className="flex-1 ml-3">
                  <Text className="text-red-800 text-base font-semibold mb-1">
                    {encouragement.message}
                  </Text>
                  <Text className="text-red-700 text-sm">{encouragement.hint}</Text>
                </View>
              </View>
            </View>
          )}

          {sortingComplete && allSortingCorrect && (
            <View className="mt-4 bg-green-50 rounded-2xl p-4 border border-green-200">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={24} color="#15803D" />
                <Text className="text-green-800 text-base font-semibold ml-3">
                  Perfect! You sorted everything correctly!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View
          className="bg-white border-t border-slate-200 px-5"
          style={{ paddingBottom: insets.bottom + 16, paddingTop: 16 }}
        >
          {!sortingComplete ? (
            <Pressable
              onPress={handleCheckSorting}
              disabled={Object.keys(sortedItems).length !== sorting.items.length}
              className={`rounded-2xl py-4 items-center ${
                Object.keys(sortedItems).length !== sorting.items.length ? "bg-slate-300" : "bg-indigo-500"
              }`}
            >
              <Text className="text-white text-base font-bold">Check Answers</Text>
            </Pressable>
          ) : allSortingCorrect ? (
            <Pressable onPress={finishLesson} className="rounded-2xl py-4 items-center bg-green-500">
              <Text className="text-white text-base font-bold">Continue (+{lesson.xpReward} XP)</Text>
            </Pressable>
          ) : (
            <Pressable onPress={handleRetrySorting} className="rounded-2xl py-4 items-center bg-red-500">
              <Text className="text-white text-base font-bold">Try Again</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  // MATCHING LESSON
  if (lesson.type === "matching" && lesson.content.matching) {
    const matching = lesson.content.matching;

    // Use shuffled order for right side, fallback to original if not yet shuffled
    const rightOrder = shuffledRightOrder.length === matching.pairs.length
      ? shuffledRightOrder
      : matching.pairs.map((_, i) => i);

    return (
      <View className="flex-1 bg-slate-50">
        {renderHeader()}

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-purple-50 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center">
              <Ionicons name="git-compare" size={24} color="#8B5CF6" />
              <Text className="text-purple-800 text-base font-medium ml-3 flex-1">
                {matching.instruction}
              </Text>
            </View>
          </View>

          <Text className="text-slate-500 text-sm mb-4 text-center">
            Tap a card on the left, then tap its match on the right
          </Text>

          <View className="flex-row">
            {/* Left column */}
            <View className="flex-1 mr-2">
              {matching.pairs.map((pair, index) => {
                const isMatched = matchedPairs.includes(index);
                const isLeftSelected = selectedLeft === index;

                return (
                  <Pressable
                    key={index}
                    onPress={() => handleMatchSelect(index, "left")}
                    disabled={isMatched}
                    className="mb-3"
                  >
                    <View
                      className={`rounded-2xl p-4 border-2 ${
                        isMatched
                          ? "bg-green-50 border-green-300"
                          : isLeftSelected
                          ? "bg-purple-100 border-purple-400"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <Text
                        className={`text-sm ${isMatched ? "text-green-700" : "text-slate-700"}`}
                      >
                        {pair.left}
                      </Text>
                      {isMatched && (
                        <View className="absolute top-2 right-2">
                          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* Right column - shuffled order */}
            <View className="flex-1 ml-2">
              {rightOrder.map((originalIndex) => {
                const pair = matching.pairs[originalIndex];
                const isMatched = matchedPairs.includes(originalIndex);
                const isWrongRight = wrongMatch === originalIndex;

                return (
                  <Pressable
                    key={originalIndex}
                    onPress={() => handleMatchSelect(originalIndex, "right")}
                    disabled={isMatched || selectedLeft === null}
                    className="mb-3"
                  >
                    <View
                      className={`rounded-2xl p-4 border-2 ${
                        isMatched
                          ? "bg-green-50 border-green-300"
                          : isWrongRight
                          ? "bg-red-50 border-red-300"
                          : selectedLeft !== null && !isMatched
                          ? "bg-slate-50 border-slate-300"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isMatched ? "text-green-700" : isWrongRight ? "text-red-700" : "text-slate-700"
                        }`}
                      >
                        {pair.right}
                      </Text>
                      {isMatched && (
                        <View className="absolute top-2 right-2">
                          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {wrongMatch !== null && (
            <View className="mt-4 bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <View className="flex-row items-start">
                <Ionicons name="sparkles" size={20} color="#D97706" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-800 text-base font-semibold mb-1">
                    {encouragement.message}
                  </Text>
                  <Text className="text-amber-700 text-sm">{encouragement.hint}</Text>
                </View>
              </View>
            </View>
          )}

          {matchingComplete && (
            <View className="mt-4 bg-green-50 rounded-2xl p-4 border border-green-200">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={24} color="#15803D" />
                <Text className="text-green-800 text-base font-semibold ml-3">
                  Excellent! All pairs matched correctly!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View
          className="bg-white border-t border-slate-200 px-5"
          style={{ paddingBottom: insets.bottom + 16, paddingTop: 16 }}
        >
          {matchingComplete ? (
            <Pressable onPress={finishLesson} className="rounded-2xl py-4 items-center bg-green-500">
              <Text className="text-white text-base font-bold">Continue (+{lesson.xpReward} XP)</Text>
            </Pressable>
          ) : (
            <View className="rounded-2xl py-4 items-center bg-slate-200">
              <Text className="text-slate-500 text-base font-bold">
                {matchedPairs.length} / {matching.pairs.length} matched
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  // QUIZ LESSON
  if (lesson.type === "quiz" && lesson.content.quiz) {
    const quiz = lesson.content.quiz;
    const question = quiz.questions[currentQuestion];
    const selectedAnswer = quizAnswers[currentQuestion];
    const isAnswerCorrect = selectedAnswer === question.correctIndex;

    if (quizComplete) {
      return (
        <View className="flex-1 bg-slate-50">
          {renderHeader()}
          <View className="flex-1 items-center justify-center p-8">
            <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
              <Ionicons name="checkmark-circle" size={60} color="#10B981" />
            </View>
            <Text className="text-slate-800 text-2xl font-bold text-center mb-2">Quiz Complete!</Text>
            <Text className="text-slate-600 text-center mb-8">
              Great job! You answered all questions correctly.
            </Text>
            <Pressable onPress={finishLesson} className="rounded-2xl py-4 px-8 bg-green-500">
              <Text className="text-white text-base font-bold">Continue (+{lesson.xpReward} XP)</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-slate-50">
        {renderHeader()}

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-slate-500 text-sm">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Text>
            <View className="flex-row">
              {quiz.questions.map((_, i) => (
                <View
                  key={i}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    i < currentQuestion
                      ? "bg-green-400"
                      : i === currentQuestion
                      ? "bg-indigo-500"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </View>
          </View>

          <View className="bg-indigo-50 rounded-2xl p-5 mb-6">
            <Ionicons name="help-circle" size={28} color="#6366F1" />
            <Text className="text-indigo-900 text-lg font-semibold mt-3">{question.question}</Text>
          </View>

          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            // Only show correct answer if user got it right
            const showCorrect = showQuizFeedback && isAnswerCorrect && index === question.correctIndex;
            const showWrong = showQuizFeedback && isSelected && !isAnswerCorrect;

            return (
              <Pressable
                key={index}
                onPress={() => handleQuizAnswer(index)}
                disabled={showQuizFeedback}
                className="mb-3"
              >
                <View
                  className={`rounded-2xl p-4 border-2 ${
                    showCorrect
                      ? "bg-green-50 border-green-400"
                      : showWrong
                      ? "bg-red-50 border-red-400"
                      : isSelected
                      ? "bg-indigo-50 border-indigo-400"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-8 h-8 rounded-full border-2 items-center justify-center mr-3 ${
                        showCorrect
                          ? "bg-green-400 border-green-400"
                          : showWrong
                          ? "bg-red-400 border-red-400"
                          : isSelected
                          ? "bg-indigo-400 border-indigo-400"
                          : "bg-white border-slate-300"
                      }`}
                    >
                      <Text
                        className={`text-sm font-bold ${
                          showCorrect || showWrong || isSelected ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text className="flex-1 text-base text-slate-800">{option}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}

          {showQuizFeedback && (
            <View
              className={`mt-4 rounded-2xl p-4 border ${
                isAnswerCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <View className="flex-row items-start">
                <Ionicons
                  name={isAnswerCorrect ? "bulb" : "heart"}
                  size={20}
                  color={isAnswerCorrect ? "#15803D" : "#DC2626"}
                />
                <View className="flex-1 ml-3">
                  {isAnswerCorrect ? (
                    <>
                      <Text className="text-green-800 text-sm font-semibold mb-1">Correct!</Text>
                      <Text className="text-green-700 text-sm">{question.explanation}</Text>
                    </>
                  ) : (
                    <>
                      <Text className="text-red-800 text-base font-semibold mb-1">
                        {encouragement.message}
                      </Text>
                      <Text className="text-red-700 text-sm">{encouragement.hint}</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View
          className="bg-white border-t border-slate-200 px-5"
          style={{ paddingBottom: insets.bottom + 16, paddingTop: 16 }}
        >
          {!showQuizFeedback ? (
            <Pressable
              onPress={handleQuizSubmit}
              disabled={selectedAnswer === undefined}
              className={`rounded-2xl py-4 items-center ${
                selectedAnswer === undefined ? "bg-slate-300" : "bg-indigo-500"
              }`}
            >
              <Text className="text-white text-base font-bold">Submit Answer</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleQuizNext}
              className={`rounded-2xl py-4 items-center ${isAnswerCorrect ? "bg-green-500" : "bg-red-500"}`}
            >
              <Text className="text-white text-base font-bold">
                {isAnswerCorrect
                  ? currentQuestion < quiz.questions.length - 1
                    ? "Next Question"
                    : "Complete Quiz"
                  : "Try Again"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  // Fallback for unimplemented types
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center p-8">
      <View className="w-20 h-20 rounded-full bg-indigo-100 items-center justify-center mb-4">
        <Ionicons name="construct" size={40} color="#6366F1" />
      </View>
      <Text className="text-slate-800 text-xl font-bold text-center mb-2">{lesson.title}</Text>
      <Text className="text-slate-600 text-center mb-6">
        Lesson type: {lesson.type}
      </Text>
      <Pressable
        onPress={finishLesson}
        className="bg-indigo-500 rounded-2xl px-8 py-4"
      >
        <Text className="text-white font-bold">Complete Lesson (+{lesson.xpReward} XP)</Text>
      </Pressable>
    </View>
  );
}
