import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useWorlds } from "../state/gameStore";
import { LinearGradient } from "expo-linear-gradient";

type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Map">;

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  island: "water",
  rocket: "rocket",
  sparkles: "sparkles",
  "message-circle": "chatbubbles",
  mountain: "trending-up",
  trophy: "trophy",
  book: "book",
};

export default function MapScreen() {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const worlds = useWorlds();

  return (
    <View className="flex-1 bg-slate-50">
      <View
        style={{ paddingTop: insets.top + 16 }}
        className="px-5 pb-4 bg-white border-b border-slate-200"
      >
        <View className="flex-row items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#1E293B" />
          </Pressable>
          <Text className="text-slate-800 text-2xl font-bold">Your Learning Map</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-slate-600 text-sm mb-6 px-1">
          Explore 9 themed worlds to learn about neurodiversity. Each world has lessons, activities,
          and concept cards to unlock!
        </Text>

        {worlds.map((world, index) => {
          const iconName = ICON_MAP[world.icon] || "planet";
          const isLocked = !world.unlocked;

          return (
            <Pressable
              key={world.id}
              onPress={() => {
                if (!isLocked) {
                  navigation.navigate("WorldDetail", { worldId: world.id });
                }
              }}
              disabled={isLocked}
              className="mb-4"
            >
              <View
                className="rounded-3xl overflow-hidden"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 5,
                  opacity: isLocked ? 0.5 : 1,
                }}
              >
                <LinearGradient
                  colors={[world.color, `${world.color}CC`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 20 }}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 mr-4">
                      <View className="flex-row items-center mb-2">
                        <View className="w-10 h-10 rounded-full bg-white/30 items-center justify-center mr-3">
                          <Ionicons name={iconName} size={20} color="white" />
                        </View>
                        {isLocked && (
                          <View className="px-3 py-1 bg-white/20 rounded-full">
                            <Text className="text-white text-xs font-semibold">Locked</Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-white text-xl font-bold mb-2">{world.name}</Text>
                      <Text className="text-white/90 text-sm mb-4">{world.description}</Text>

                      <View className="mb-2">
                        <View className="flex-row items-center justify-between mb-1">
                          <Text className="text-white/80 text-xs font-medium">Progress</Text>
                          <Text className="text-white text-xs font-bold">
                            {Math.round(world.progress)}%
                          </Text>
                        </View>
                        <View className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <View
                            className="h-full bg-white rounded-full"
                            style={{ width: `${world.progress}%` }}
                          />
                        </View>
                      </View>

                      <View className="flex-row items-center">
                        <Ionicons name="book" size={14} color="white" />
                        <Text className="text-white/80 text-xs ml-1">
                          {world.lessons.filter((l) => l.completed).length} / {world.lessons.length}{" "}
                          lessons
                        </Text>
                      </View>
                    </View>

                    {!isLocked && (
                      <View className="items-center justify-center">
                        <Ionicons name="chevron-forward" size={24} color="white" />
                      </View>
                    )}
                    {isLocked && (
                      <View className="items-center justify-center">
                        <Ionicons name="lock-closed" size={24} color="white" />
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
