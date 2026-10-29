import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  runOnJS,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONFETTI_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#FFE66D", // Yellow
  "#95E1D3", // Mint
  "#F38181", // Coral
  "#AA96DA", // Purple
  "#58CC02", // Green
  "#1CB0F6", // Blue
  "#FF9500", // Orange
  "#CE82FF", // Lavender
];

interface ConfettiPieceProps {
  delay: number;
  startX: number;
  color: string;
  size: number;
  duration: number;
  onComplete?: () => void;
  isLast?: boolean;
}

function ConfettiPiece({ delay, startX, color, size, duration, onComplete, isLast }: ConfettiPieceProps) {
  const translateY = useSharedValue(-size * 2);
  const translateX = useSharedValue(startX);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    const randomEndX = startX + (Math.random() - 0.5) * 150;
    const randomRotation = Math.random() * 720 - 360;

    translateY.value = withDelay(
      delay,
      withTiming(SCREEN_HEIGHT + 50, {
        duration,
        easing: Easing.out(Easing.quad),
      })
    );

    translateX.value = withDelay(
      delay,
      withSequence(
        withTiming(randomEndX, { duration: duration * 0.5 }),
        withTiming(startX + (Math.random() - 0.5) * 100, { duration: duration * 0.5 })
      )
    );

    rotate.value = withDelay(
      delay,
      withTiming(randomRotation, { duration, easing: Easing.linear })
    );

    opacity.value = withDelay(
      delay + duration * 0.7,
      withTiming(0, { duration: duration * 0.3 }, (finished) => {
        if (finished && isLast && onComplete) {
          runOnJS(onComplete)();
        }
      })
    );

    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(1.2, { duration: 100 }),
        withTiming(1, { duration: 100 })
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const isCircle = Math.random() > 0.5;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: isCircle ? size : size * 2,
          backgroundColor: color,
          borderRadius: isCircle ? size / 2 : 2,
        },
        animatedStyle,
      ]}
    />
  );
}

interface ConfettiCelebrationProps {
  visible: boolean;
  onComplete?: () => void;
}

export default function ConfettiCelebration({ visible, onComplete }: ConfettiCelebrationProps) {
  if (!visible) return null;

  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 500,
    startX: Math.random() * SCREEN_WIDTH,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 10 + 6,
    duration: Math.random() * 1500 + 2000,
  }));

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      {pieces.map((piece, index) => (
        <ConfettiPiece
          key={piece.id}
          delay={piece.delay}
          startX={piece.startX}
          color={piece.color}
          size={piece.size}
          duration={piece.duration}
          onComplete={onComplete}
          isLast={index === pieces.length - 1}
        />
      ))}
    </View>
  );
}
