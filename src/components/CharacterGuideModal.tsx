import React from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Ionicons } from "@expo/vector-icons";
import { CHARACTERS } from "../data/characters";
import { useGameStore, useSelectedGuide } from "../state/gameStore";
import type { CharacterType } from "../types/game";
import * as Haptics from "expo-haptics";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CharacterGuideModalProps {
  visible: boolean;
  characterId: CharacterType | null;
  onClose: () => void;
}

export default function CharacterGuideModal({
  visible,
  characterId,
  onClose,
}: CharacterGuideModalProps) {
  const navigation = useNavigation<NavigationProp>();
  const selectedGuide = useSelectedGuide();
  const selectGuide = useGameStore((s) => s.selectGuide);

  if (!characterId) return null;

  const character = CHARACTERS[characterId];
  if (!character) return null;

  const isSelected = selectedGuide === characterId;

  const handleSelectGuide = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    selectGuide(characterId);
  };

  const handleStartJourney = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onClose();
    navigation.navigate("GuidedJourney", { guideId: characterId });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: "85%" }}>
          <View
            className="p-6 pb-8"
            style={{ backgroundColor: character.color }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="w-16 h-16 rounded-full bg-white/30 items-center justify-center">
                {characterId === "spark" && <Text className="text-white text-3xl">⚡</Text>}
                {characterId === "wave" && <Text className="text-white text-3xl">🌊</Text>}
                {characterId === "echo" && <Text className="text-white text-3xl">🎵</Text>}
                {characterId === "flux" && <Text className="text-white text-3xl">⚙️</Text>}
                {characterId === "page" && <Text className="text-white text-3xl">📖</Text>}
              </View>
              <Pressable
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              >
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            </View>
            <Text className="text-white text-3xl font-bold mb-2">{character.name}</Text>
            <Text className="text-white/90 text-base">{character.description}</Text>
          </View>

          <View className="p-6">
            {isSelected && (
              <View className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-200 flex-row items-center">
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text className="text-green-800 font-semibold ml-2">
                  {character.name} is your current guide!
                </Text>
              </View>
            )}

            <View className="bg-slate-50 rounded-2xl p-4 mb-4">
              <View className="flex-row items-start mb-2">
                <Ionicons name="star" size={20} color={character.color} />
                <Text className="flex-1 text-slate-700 text-sm font-semibold ml-2">
                  What {character.name} teaches:
                </Text>
              </View>
              <Text className="text-slate-600 text-sm ml-7">{character.focus}</Text>
            </View>

            <View className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="bulb" size={18} color="#6366F1" />
                <Text className="flex-1 text-indigo-700 text-sm ml-2">
                  {character.name} will guide you through lessons and share insights about neurodiversity tailored to their expertise.
                </Text>
              </View>
            </View>

            {/* Action Button */}
            <Pressable
              onPress={handleStartJourney}
              className="py-4 rounded-2xl items-center flex-row justify-center"
              style={{ backgroundColor: character.color }}
            >
              <Ionicons name="compass" size={20} color="white" />
              <Text className="text-white font-bold ml-2">
                Start Journey
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
