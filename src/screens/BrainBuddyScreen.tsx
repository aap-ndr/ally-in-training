import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import { askBrainBuddy } from "../api/brain-buddy";
import AppLogo from "../components/AppLogo";
import { useGameStore } from "../state/gameStore";

type BrainBuddyNavigationProp = NativeStackNavigationProp<RootStackParamList, "BrainBuddy">;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  xpEarned?: number;
}

const WELCOME_MESSAGE = "Hi there! I'm Brain Buddy, your friendly guide to understanding neurodiversity. Ask me anything about ADHD, autism, dyslexia, sensory processing, or how to be a great ally. You'll earn +5 XP for every question you ask! What would you like to know?";

const SUGGESTED_QUESTIONS = [
  "What is neurodiversity?",
  "What is ADHD?",
  "How can I support autistic friends?",
  "What is stimming?",
];

// Follow-up questions to show after bot responses
const FOLLOW_UP_QUESTIONS = [
  "What is dyslexia?",
  "How does hyperfocus work?",
  "What is masking?",
  "How can I be a better ally?",
  "What are sensory differences?",
  "What is executive function?",
];

// XP rewards for chatbot interactions
const CHAT_XP_REWARD = 5;

// Map-related topics to suggest exploring the map
const MAP_EXPLORATION_TOPICS = [
  "adhd", "autism", "dyslexia", "sensory", "executive function",
  "communication", "strengths", "hyperfocus", "stimming", "masking",
  "processing", "neurodivergent", "neurodiverse", "support", "ally"
];

const getMapSuggestion = (question: string): string | null => {
  const lowercaseQuestion = question.toLowerCase();
  const matchedTopic = MAP_EXPLORATION_TOPICS.find(topic => lowercaseQuestion.includes(topic));

  if (matchedTopic) {
    return "\n\nWant to learn more? Tap [Explore the Map] to discover interactive lessons on this topic!";
  }
  return null;
};

export default function BrainBuddyScreen() {
  const navigation = useNavigation<BrainBuddyNavigationProp>();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const addXP = useGameStore((s) => s.addXP);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: WELCOME_MESSAGE,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const inputScale = useSharedValue(1);
  const xpScale = useSharedValue(1);

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: inputScale.value }],
  }));

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmedText = inputText.trim();
    if (!trimmedText || isLoading) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();

    // Animate input
    inputScale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Get response from Brain Buddy
    const response = await askBrainBuddy(trimmedText);

    // Add map exploration suggestion if relevant
    const mapSuggestion = getMapSuggestion(trimmedText);
    const fullResponse = mapSuggestion ? response + mapSuggestion : response;

    // Award XP for asking a question
    addXP(CHAT_XP_REWARD);
    setTotalXpEarned((prev) => prev + CHAT_XP_REWARD);

    // Animate XP badge
    xpScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: fullResponse,
      isUser: false,
      timestamp: new Date(),
      xpEarned: CHAT_XP_REWARD,
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleSuggestedQuestion = async (question: string) => {
    // Set the input text and immediately send
    setInputText(question);

    // Directly trigger send with the question
    if (isLoading) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();

    // Animate input
    inputScale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Get response from Brain Buddy
    const response = await askBrainBuddy(question);

    // Add map exploration suggestion if relevant
    const mapSuggestion = getMapSuggestion(question);
    const fullResponse = mapSuggestion ? response + mapSuggestion : response;

    // Award XP for asking a question
    addXP(CHAT_XP_REWARD);
    setTotalXpEarned((prev) => prev + CHAT_XP_REWARD);

    // Animate XP badge
    xpScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: fullResponse,
      isUser: false,
      timestamp: new Date(),
      xpEarned: CHAT_XP_REWARD,
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  // Function to render message text with clickable links
  const renderMessageText = (text: string, isUser: boolean) => {
    // Combined pattern for [Explore the Map] and URLs
    const combinedPattern = /(\[Explore the Map\])|(https?:\/\/[^\s<>\])"]+)/g;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = combinedPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(
          <Text
            key={`text-${keyIndex++}`}
            className={`text-base leading-6 ${isUser ? "text-white" : "text-slate-800"}`}
          >
            {text.slice(lastIndex, match.index)}
          </Text>
        );
      }

      if (match[1]) {
        // [Explore the Map] link
        elements.push(
          <Text
            key={`map-link-${keyIndex++}`}
            className="text-base leading-6 text-purple-600 font-semibold underline"
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate("Map");
            }}
          >
            Explore the Map
          </Text>
        );
      } else if (match[2]) {
        // URL link
        const url = match[2];
        elements.push(
          <Text
            key={`url-link-${keyIndex++}`}
            className="text-base leading-6 text-purple-600 font-semibold underline"
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Linking.openURL(url);
            }}
          >
            {url}
          </Text>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after the last match
    if (lastIndex < text.length) {
      elements.push(
        <Text
          key={`text-${keyIndex++}`}
          className={`text-base leading-6 ${isUser ? "text-white" : "text-slate-800"}`}
        >
          {text.slice(lastIndex)}
        </Text>
      );
    }

    // If no matches found, return plain text
    if (elements.length === 0) {
      return (
        <Text
          className={`text-base leading-6 ${isUser ? "text-white" : "text-slate-800"}`}
        >
          {text}
        </Text>
      );
    }

    return <Text>{elements}</Text>;
  };

  const xpAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: xpScale.value }],
  }));

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.isUser;

    return (
      <Animated.View
        key={message.id}
        entering={FadeInDown.delay(index === messages.length - 1 ? 0 : 0).duration(300)}
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          maxWidth: "85%",
          marginBottom: 12,
        }}
      >
        {!isUser && (
          <View className="flex-row items-center mb-1">
            <View className="mr-2" style={{ backgroundColor: "transparent" }}>
              <AppLogo size={24} showName={false} />
            </View>
            <Text className="text-slate-500 text-xs font-medium">Brain Buddy</Text>
            {message.xpEarned && (
              <View className="flex-row items-center ml-2 bg-amber-100 rounded-full px-2 py-0.5">
                <Ionicons name="flash" size={12} color="#F59E0B" />
                <Text className="text-amber-600 text-xs font-semibold ml-0.5">+{message.xpEarned} XP</Text>
              </View>
            )}
          </View>
        )}
        <View
          className={`rounded-2xl px-4 py-3 ${
            isUser ? "rounded-br-sm" : "rounded-bl-sm"
          }`}
          style={{
            backgroundColor: isUser ? "#6366F1" : "#F1F5F9",
          }}
        >
          {renderMessageText(message.text, isUser)}
        </View>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <LinearGradient
        colors={["#8B5CF6", "#A855F7", "#D946EF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top,
          paddingBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        <View className="flex-row items-center">
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.goBack();
            }}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </Pressable>
          <View className="flex-row items-center flex-1">
            <View className="mr-3" style={{ backgroundColor: "transparent" }}>
              <AppLogo size={40} showName={false} />
            </View>
            <View>
              <Text className="text-white text-lg font-bold">Brain Buddy</Text>
              <Text className="text-white/80 text-xs">Your neurodiversity guide</Text>
            </View>
          </View>
          {/* XP Earned Badge */}
          {totalXpEarned > 0 && (
            <Animated.View style={xpAnimatedStyle}>
              <View className="bg-white/20 rounded-full px-3 py-1.5 flex-row items-center">
                <Ionicons name="flash" size={16} color="#FCD34D" />
                <Text className="text-white font-bold text-sm ml-1">+{totalXpEarned} XP</Text>
              </View>
            </Animated.View>
          )}
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {messages.map((message, index) => renderMessage(message, index))}

          {/* Typing indicator */}
          {isLoading && (
            <Animated.View
              entering={FadeIn.duration(200)}
              className="flex-row items-center self-start mb-4"
            >
              <View className="mr-2">
                <AppLogo size={24} showName={false} />
              </View>
              <View className="bg-slate-100 rounded-2xl px-4 py-3 rounded-bl-sm">
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="#8B5CF6" />
                  <Text className="text-slate-500 text-sm ml-2">Thinking...</Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Suggested questions (only show at start) */}
          {messages.length === 1 && !isLoading && (
            <View className="mt-4">
              <Text className="text-slate-500 text-sm font-medium mb-3">
                Try asking:
              </Text>
              <View className="flex-row flex-wrap">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleSuggestedQuestion(question)}
                    className="bg-purple-50 border border-purple-200 rounded-full px-4 py-2 mr-2 mb-2 active:opacity-70"
                  >
                    <Text className="text-purple-700 text-sm">{question}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Follow-up questions (show after bot responses) */}
          {messages.length > 1 && !isLoading && (
            <View className="mt-4">
              <Text className="text-slate-500 text-sm font-medium mb-3">
                Keep exploring:
              </Text>
              <View className="flex-row flex-wrap">
                {FOLLOW_UP_QUESTIONS.slice(0, 4).map((question, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleSuggestedQuestion(question)}
                    className="bg-purple-50 border border-purple-200 rounded-full px-4 py-2 mr-2 mb-2 active:opacity-70"
                  >
                    <Text className="text-purple-700 text-sm">{question}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Quick navigation links (show after a few messages) */}
          {messages.length >= 3 && !isLoading && (
            <View className="mt-4 bg-slate-50 rounded-2xl p-4">
              <Text className="text-slate-500 text-sm font-medium mb-3">
                Explore more in the app:
              </Text>
              <View className="flex-row flex-wrap">
                <Pressable
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    navigation.navigate("Map");
                  }}
                  className="flex-row items-center bg-indigo-100 rounded-full px-3 py-2 mr-2 mb-2 active:opacity-70"
                >
                  <Ionicons name="map" size={14} color="#6366F1" />
                  <Text className="text-indigo-700 text-sm font-medium ml-1">Explore Map</Text>
                </Pressable>
                <Pressable
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    navigation.navigate("CardCollection");
                  }}
                  className="flex-row items-center bg-purple-100 rounded-full px-3 py-2 mr-2 mb-2 active:opacity-70"
                >
                  <Ionicons name="layers" size={14} color="#8B5CF6" />
                  <Text className="text-purple-700 text-sm font-medium ml-1">Cards</Text>
                </Pressable>
                <Pressable
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    navigation.navigate("Quests");
                  }}
                  className="flex-row items-center bg-amber-100 rounded-full px-3 py-2 mr-2 mb-2 active:opacity-70"
                >
                  <Ionicons name="compass" size={14} color="#F59E0B" />
                  <Text className="text-amber-700 text-sm font-medium ml-1">Quests</Text>
                </Pressable>
                <Pressable
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    navigation.navigate("Home");
                  }}
                  className="flex-row items-center bg-slate-200 rounded-full px-3 py-2 mr-2 mb-2 active:opacity-70"
                >
                  <Ionicons name="home" size={14} color="#64748B" />
                  <Text className="text-slate-700 text-sm font-medium ml-1">Home</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input area */}
        <Animated.View
          style={[
            {
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
              backgroundColor: "#FFFFFF",
              borderTopWidth: 1,
              borderTopColor: "#E2E8F0",
            },
            inputAnimatedStyle,
          ]}
        >
          <View className="flex-row items-end">
            <View className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 mr-3">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask about neurodiversity..."
                placeholderTextColor="#94A3B8"
                multiline
                maxLength={500}
                className="text-slate-800 text-base"
                style={{
                  maxHeight: 100,
                  minHeight: 24,
                }}
                returnKeyType="send"
                onSubmitEditing={handleSend}
                blurOnSubmit={false}
              />
            </View>
            <Pressable
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                inputText.trim() && !isLoading ? "bg-purple-600" : "bg-slate-200"
              }`}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() && !isLoading ? "white" : "#94A3B8"}
              />
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}
