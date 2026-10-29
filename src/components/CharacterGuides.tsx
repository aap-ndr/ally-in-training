import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CHARACTERS } from "../data/characters";
import CharacterGuideModal from "./CharacterGuideModal";
import type { CharacterType } from "../types/game";

export default function CharacterGuides() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);

  const charactersList = Object.values(CHARACTERS);

  return (
    <>
      <View className="mb-6">
        <Text className="text-slate-800 text-lg font-bold mb-3 px-1">Meet Your Guides</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          {charactersList.map((character) => (
            <Pressable
              key={character.id}
              onPress={() => setSelectedCharacter(character.id)}
              className="mr-3"
            >
              <View
                className="rounded-2xl p-4 w-36"
                style={{
                  backgroundColor: `${character.color}15`,
                  borderWidth: 2,
                  borderColor: `${character.color}30`,
                }}
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: character.color }}
                >
                  {character.id === "spark" && <Text className="text-white text-2xl">⚡</Text>}
                  {character.id === "wave" && <Text className="text-white text-2xl">🌊</Text>}
                  {character.id === "echo" && <Text className="text-white text-2xl">🎵</Text>}
                  {character.id === "flux" && <Text className="text-white text-2xl">⚙️</Text>}
                  {character.id === "page" && <Text className="text-white text-2xl">📖</Text>}
                </View>
                <Text className="text-slate-800 text-base font-bold mb-1">{character.name}</Text>
                <Text className="text-slate-600 text-xs" numberOfLines={2}>
                  {character.description.split("!")[0]}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <CharacterGuideModal
        visible={selectedCharacter !== null}
        characterId={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </>
  );
}
