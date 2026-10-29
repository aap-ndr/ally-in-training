import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface XPGainAnimationProps {
  xpAmount: number;
  visible: boolean;
  onComplete?: () => void;
}

export default function XPGainAnimation({
  xpAmount,
  visible,
  onComplete,
}: XPGainAnimationProps) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    if (visible) {
      translateY.value = 0;
      opacity.value = 1;
      scale.value = 1;

      translateY.value = withSequence(
        withSpring(-50, { damping: 10 }),
        withDelay(800, withSpring(-80))
      );
      opacity.value = withSequence(
        withSpring(1),
        withDelay(800, withSpring(0))
      );
      scale.value = withSequence(
        withSpring(1.2, { damping: 8 }),
        withSpring(1)
      );

      setTimeout(() => {
        onComplete?.();
      }, 1500);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
      opacity: opacity.value,
    };
  });

  if (!visible) return null;

  return (
    <Animated.View
      className="absolute self-center bg-amber-500 rounded-full px-4 py-2 flex-row items-center"
      style={[
        animatedStyle,
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
      ]}
    >
      <Ionicons name="flash" size={20} color="white" />
      <Text className="text-white text-lg font-bold ml-1">+{xpAmount} XP</Text>
    </Animated.View>
  );
}
