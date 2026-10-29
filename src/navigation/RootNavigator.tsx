import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { WorldType, CharacterType } from "../types/game";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import LessonScreen from "../screens/LessonScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CardCollectionScreen from "../screens/CardCollectionScreen";
import QuestsScreen from "../screens/QuestsScreen";
import QuestDetailScreen from "../screens/QuestDetailScreen";
import BadgesScreen from "../screens/BadgesScreen";
import WorldDetailScreen from "../screens/WorldDetailScreen";
import GuidedJourneyScreen from "../screens/GuidedJourneyScreen";
import CardQuizScreen from "../screens/CardQuizScreen";
import AboutScreen from "../screens/AboutScreen";
import CertificateScreen from "../screens/CertificateScreen";
import BrainBuddyScreen from "../screens/BrainBuddyScreen";
import JoinUsScreen from "../screens/JoinUsScreen";

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  WorldDetail: { worldId: WorldType };
  Lesson: { lessonId: string };
  Profile: undefined;
  CardCollection: undefined;
  Quests: undefined;
  QuestDetail: { questId: string };
  Badges: undefined;
  GuidedJourney: { guideId: CharacterType };
  CardQuiz: { cardId: string };
  About: undefined;
  Certificate: undefined;
  BrainBuddy: undefined;
  JoinUs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: "default",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="WorldDetail" component={WorldDetailScreen} />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CardCollection" component={CardCollectionScreen} />
      <Stack.Screen name="Quests" component={QuestsScreen} />
      <Stack.Screen
        name="QuestDetail"
        component={QuestDetailScreen}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="Badges" component={BadgesScreen} />
      <Stack.Screen name="GuidedJourney" component={GuidedJourneyScreen} />
      <Stack.Screen
        name="CardQuiz"
        component={CardQuizScreen}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Certificate" component={CertificateScreen} />
      <Stack.Screen name="BrainBuddy" component={BrainBuddyScreen} />
      <Stack.Screen name="JoinUs" component={JoinUsScreen} />
    </Stack.Navigator>
  );
}
