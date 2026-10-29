import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface AnimatedProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export default function AnimatedProgressBar({
  progress,
  color = "#6366F1",
  height = 8,
  showLabel = false,
}: AnimatedProgressBarProps) {
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withSpring(progress, {
      damping: 15,
      stiffness: 100,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  return (
    <View>
      {showLabel && (
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-slate-600 text-xs font-medium">Progress</Text>
          <Text className="text-slate-800 text-xs font-bold">{Math.round(progress)}%</Text>
        </View>
      )}
      <View
        className="bg-slate-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <Animated.View
          className="h-full rounded-full"
          style={[animatedStyle, { backgroundColor: color }]}
        />
      </View>
    </View>
  );
}
