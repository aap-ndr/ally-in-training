import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Modal,
  Linking,
  TextInput,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";

const joinMovementImage = require("../../assets/join-the-movement.png");
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import Checkbox from "expo-checkbox";
import AppLogo from "./AppLogo";
import { useGameStore } from "../state/gameStore";
import { saveAmbassadorData } from "../api/firebase";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface TourStep {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  gradient: [string, string];
  credit?: string;
  isNameEntry?: boolean;

  hideSkip?: boolean;
  image?: ReturnType<typeof require>;
}

const TOUR_STEPS: TourStep[] = [
  {
    icon: "heart",
    iconColor: "#EC4899",
    iconBg: "#FCE7F3",
    title: "Welcome to Ally in Training\u2122",
    description: "Learn about neurodiversity and become a better ally to your friends. This app helps you understand ADHD, autism, sensory processing, and more!",
    gradient: ["#6366F1", "#8B5CF6"],
    credit: "Made by Youth for Neurodiversity Inc.",
  },
  {
    icon: "map",
    iconColor: "#6366F1",
    iconBg: "#EEF2FF",
    title: "Explore 9 Worlds",
    description: "Journey through themed worlds like ADHD Adventure Park, Dyslexia Discovery, Island of Autism Awareness, and more. Each world has interactive lessons to complete!",
    gradient: ["#8B5CF6", "#A855F7"],
  },
  {
    icon: "layers",
    iconColor: "#8B5CF6",
    iconBg: "#F3E8FF",
    title: "Collect Concept Cards",
    description: "Unlock cards as you learn! Each card teaches you something new about neurodiversity. Test your knowledge to earn extra XP!",
    gradient: ["#A855F7", "#EC4899"],
  },
  {
    icon: "compass",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    title: "Complete Side Quests",
    description: "Put your knowledge to the test with real-world scenarios. Quests help you practice being a supportive ally in everyday situations.",
    gradient: ["#EC4899", "#F59E0B"],
  },
  {
    icon: "trophy",
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
    title: "Earn Badges, Certificate, & Level Up",
    description: "Earn XP, level up, and collect badges as you learn. Complete levels to earn a shareable certificate of achievement! Keep a daily streak going to maximize your progress.",
    gradient: ["#F97316", "#10B981"],
  },
  {
    icon: "infinite",
    iconColor: "#EC4899",
    iconBg: "#FCE7F3",
    title: "Join the Movement \u267e\ufe0f",
    description: "Be a Youth Champion for neurodiversity! Every mind is unique and brings extraordinary gifts to the world. Join a UN-recognized youth movement and help build a more inclusive world for everyone!",
    gradient: ["#EC4899", "#8B5CF6"],
    image: joinMovementImage,
  },
  {
    icon: "person",
    iconColor: "#6366F1",
    iconBg: "#EEF2FF",
    title: "What should we call you?",
    description: "Enter your name to personalize your learning journey and certificate!",
    gradient: ["#10B981", "#14B8A6"],
    isNameEntry: true,
    hideSkip: true,
  },
];

interface QuickTourProps {
  visible: boolean;
  onComplete: () => void;
}

export default function QuickTour({ visible = false, onComplete }: QuickTourProps) {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [policyChecked, setPolicyChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const setUserNameInStore = useGameStore((s) => s.setUserName);

  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const step = TOUR_STEPS[currentStep];
  const isLastStep = currentStep === TOUR_STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const isNameStep = !!step.isNameEntry;
  // The name/policy step is the only one that gates progression
  const canProceed = isNameStep ? policyChecked : true;

  // Fire-and-forget: sign in anonymously + save name to Firestore
  const persistToFirebase = (name: string) => {
    if (!name.trim()) return;
    saveAmbassadorData({ name: name.trim() }).catch(() => {});
  };

  const animateTransition = (direction: "next" | "prev") => {
    Keyboard.dismiss();
    cardScale.value = withTiming(0.9, { duration: 150 });
    cardOpacity.value = withTiming(0, { duration: 150 });
    translateX.value = withTiming(direction === "next" ? -50 : 50, { duration: 150 });

    setTimeout(() => {
      if (direction === "next") {
        setCurrentStep((prev) => Math.min(prev + 1, TOUR_STEPS.length - 1));
      } else {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      }
      translateX.value = direction === "next" ? 50 : -50;
      cardScale.value = withSequence(
        withTiming(1.05, { duration: 150 }),
        withSpring(1)
      );
      cardOpacity.value = withTiming(1, { duration: 150 });
      translateX.value = withSpring(0);
    }, 150);
  };

  const handleNext = async () => {
    if (!canProceed) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isNameStep && userName.trim()) {
      setUserNameInStore(userName.trim());
    }

    if (isLastStep) {
      persistToFirebase(userName);
      onComplete();
      return;
    }

    animateTransition("next");
  };

  const handlePrev = async () => {
    if (isFirstStep) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    animateTransition("prev");
  };

  const handleSkip = async () => {
    // Skip is hidden on hideSkip steps and the last step — this is a safety guard
    if (isLastStep || step.hideSkip) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Always set a userName (entered or default)
    const nameToPersist = userName.trim() || "Guest";
    setUserNameInStore(nameToPersist);
    onComplete();
  };

  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      const SWIPE_THRESHOLD = 50;
      if (event.translationX < -SWIPE_THRESHOLD && !isLastStep) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        runOnJS(animateTransition)("next");
      } else if (event.translationX > SWIPE_THRESHOLD && !isFirstStep) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        runOnJS(animateTransition)("prev");
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cardScale.value },
      { translateX: translateX.value },
    ],
    opacity: cardOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      {/* ── Terms sheet ── */}
      <Modal visible={showTerms} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "85%", paddingBottom: insets.bottom + 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#1E293B" }}>Terms & Privacy Policy</Text>
              <Pressable onPress={() => setShowTerms(false)} style={{ padding: 4 }}>
                <Ionicons name="close" size={24} color="#64748B" />
              </Pressable>
            </View>
            <ScrollView style={{ paddingHorizontal: 24 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>About This App</Text>
              <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
                {"Ally in Training\u2122 is a free educational app created by Aashna Parsa, Founder of Youth for Neurodiversity Inc., to help young people learn about neurodiversity and become better allies to their peers."}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>Age Requirement</Text>
              <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
                This app is intended for users who are 13 years of age or older. By using this app, you confirm that you meet this age requirement. If you are under 13, please ask a parent or guardian to review this app with you.
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>Not Medical Advice</Text>
              <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
                The content in this app is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>Educational Content</Text>
              <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
                All lessons, quests, and content in this app are designed to promote empathy, understanding, and awareness of neurodiversity. They are not clinical assessments and should not be used to diagnose any individual.
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>Privacy</Text>
              <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
                We collect minimal personal information. Your nickname and learning progress are stored locally on your device and are not shared with third parties. If you choose to join our ambassador program, the information you provide (name, email, city, state, country) will be used solely by Youth for Neurodiversity Inc. to contact you about volunteer and leadership opportunities.
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>Data Security</Text>
              <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
                We take reasonable measures to protect your data. We do not sell your personal information to any third parties.
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#1E293B", marginBottom: 6 }}>Contact</Text>
              <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
                {"If you have questions about these terms or our privacy practices, please visit "}
                <Text style={{ color: "#6366F1", textDecorationLine: "underline" }} onPress={() => Linking.openURL("https://youthfornd.org")}>
                  youthfornd.org
                </Text>
              </Text>
              <Text style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 8 }}>
                Youth for Neurodiversity Inc. Last updated April 2026.
              </Text>
            </ScrollView>
            <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
              <Pressable onPress={() => setShowTerms(false)} style={{ backgroundColor: "#6366F1", borderRadius: 16, paddingVertical: 14, alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Got it</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <GestureDetector gesture={swipeGesture}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={step.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          >
            {/* Skip button — hidden on hideSkip steps and last step */}
            {!isLastStep && !step.hideSkip ? (
              <Pressable
                onPress={handleSkip}
                style={{ paddingTop: insets.top + 16, paddingRight: 20 }}
                className="self-end"
              >
                <Text className="text-white/80 text-base font-medium">Skip</Text>
              </Pressable>
            ) : (
              <View style={{ height: insets.top + 48 }} />
            )}

            {/* Main content */}
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Animated.View style={[cardAnimatedStyle, { width: "100%", alignItems: "center" }]}>

                {/* Logo for first step */}
                {currentStep === 0 && (
                  <View className="items-center mb-8">
                    <AppLogo size={120} showName={false} />
                  </View>
                )}

                {/* Image for steps that have one */}
                {currentStep > 0 && !isNameStep && step.image && (
                  <View className="mb-1 self-center items-center justify-center">
                    <Image
                      source={step.image}
                      style={{ width: 140, height: 140, borderRadius: 24 }}
                      resizeMode="contain"
                    />
                  </View>
                )}

                {/* Icon for middle steps without an image */}
                {currentStep > 0 && !isNameStep && !step.image && (
                  <View
                    className="w-24 h-24 rounded-full items-center justify-center mb-8 self-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <View className="w-16 h-16 rounded-full items-center justify-center" style={{ backgroundColor: step.iconBg }}>
                      <Ionicons name={step.icon} size={32} color={step.iconColor} />
                    </View>
                  </View>
                )}

                {/* Title */}
                <Text className="text-white text-3xl font-bold text-center mb-4">{step.title}</Text>

                {/* Description */}
                <Text className="text-white/90 text-lg text-center leading-relaxed">{step.description}</Text>

                {/* ── Name + policy step ── */}
                {isNameStep && (
                  <View style={{ marginTop: 28, width: "100%", alignItems: "center" }}>
                    <TextInput
                      value={userName}
                      onChangeText={setUserName}
                      placeholder="Your name"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: 16,
                        paddingHorizontal: 24,
                        paddingVertical: 16,
                        color: "white",
                        fontSize: 20,
                        fontWeight: "600",
                        textAlign: "center",
                        width: "100%",
                      }}
                      maxLength={30}
                      returnKeyType="done"
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center", marginTop: 8 }}>
                      This will appear on your certificate
                    </Text>
                    <Pressable
                      onPress={() => setPolicyChecked((v) => !v)}
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginTop: 20,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderRadius: 14,
                        padding: 14,
                        width: "100%",
                      }}
                    >
                      <Checkbox
                        value={policyChecked}
                        onValueChange={setPolicyChecked}
                        color={policyChecked ? "#FFFFFF" : "rgba(255,255,255,0.5)"}
                        style={{ width: 22, height: 22, borderRadius: 6, marginTop: 1 }}
                      />
                      <Text style={{ color: "white", fontSize: 13, lineHeight: 20, marginLeft: 10, flex: 1 }}>
                        {"I am 13+ years old. I understand this app is a fun way to learn about neurodiversity, not for advice or diagnosis. See "}
                        <Text
                          style={{ textDecorationLine: "underline", fontWeight: "600" }}
                          onPress={(e) => { e.stopPropagation(); setShowTerms(true); }}
                        >
                          terms
                        </Text>
                        {"."}
                      </Text>
                    </Pressable>
                  </View>
                )}

                {/* Credit for first step */}
                {step.credit && (
                  <View className="mt-6 items-center">
                    <Text className="text-white/70 text-sm text-center italic">Made by Aashna Parsa</Text>
                    <Text
                      className="text-white/90 text-sm text-center italic underline mt-1"
                      onPress={() => Linking.openURL("https://youthfornd.org")}
                    >
                      Youth for Neurodiversity Inc.
                    </Text>
                  </View>
                )}
              </Animated.View>
            </ScrollView>

            {/* Swipe hint */}
            <View className="items-center mb-2">
              <Text className="text-white/50 text-xs">Swipe left or right to navigate</Text>
            </View>

            {/* Bottom navigation */}
            <View style={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 24 }}>
              {/* Progress dots */}
              <View className="flex-row justify-center mb-6">
                {TOUR_STEPS.map((_, index) => (
                  <View
                    key={index}
                    className="mx-1.5"
                    style={{
                      width: index === currentStep ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: index === currentStep ? "white" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </View>

              <View className="flex-row items-center">
                {/* Back button */}
                {!isFirstStep ? (
                  <Pressable
                    onPress={handlePrev}
                    className="w-14 h-14 rounded-full items-center justify-center mr-3 active:opacity-80"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <Ionicons name="chevron-back" size={24} color="white" />
                  </Pressable>
                ) : (
                  <View className="w-14 mr-3" />
                )}

                {/* Primary button */}
                <Pressable
                  onPress={handleNext}
                  disabled={!canProceed}
                  className="flex-1 py-4 rounded-2xl items-center"
                  style={{
                    backgroundColor: canProceed ? "white" : "rgba(255,255,255,0.35)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: canProceed ? 0.15 : 0,
                    shadowRadius: 8,
                    elevation: canProceed ? 4 : 0,
                  }}
                >
                  <Text
                    className="text-lg font-bold"
                    style={{ color: canProceed ? step.gradient[0] : "rgba(255,255,255,0.6)" }}
                  >
                    {isLastStep && isNameStep
                      ? (policyChecked ? "Get Started!" : "Agree to Continue")
                      : isLastStep
                      ? "Get Started!"
                      : isNameStep
                      ? (policyChecked ? "Continue" : "Agree to Continue")
                      : "Next"}
                  </Text>
                </Pressable>

                <View className="w-14 ml-3" />
              </View>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </GestureDetector>
    </Modal>
  );
}
