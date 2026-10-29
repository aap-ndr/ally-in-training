import React from "react";
import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import WebViewModal from "../components/WebViewModal";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AppLogo from "../components/AppLogo";
import * as Haptics from "expo-haptics";

export default function AboutScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();


  const [showFeedbackWebView, setShowFeedbackWebView] = React.useState(false);
  const handleLinkPress = async (url: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient
        colors={["#6366F1", "#8B5CF6", "#EC4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </Pressable>
          <Text className="text-white text-xl font-bold">About</Text>
          <View className="w-10" />
        </View>

        <View className="items-center">
          <AppLogo size={100} showName={false} />
          <Text className="text-white text-2xl font-bold mt-4">
            Ally in Training™
          </Text>
          <Text className="text-white/80 text-sm mt-1">Version 1.0.0</Text>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Organization Section */}
        <View
          className="bg-white rounded-2xl p-5 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-indigo-100 items-center justify-center mr-3">
              <Ionicons name="people" size={24} color="#6366F1" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-800 text-lg font-bold">Organization</Text>
              <Text className="text-slate-500 text-sm">Our mission and team</Text>
            </View>
          </View>

          <Text className="text-slate-700 text-base leading-relaxed mb-4">
            <Text className="font-bold text-indigo-600">Youth for Neurodiversity Inc.</Text>
            {" "}is a youth-led nonprofit organization dedicated to empowering young people to understand, embrace, and celebrate neurodiversity. We believe in creating a world where neurological differences are recognized as natural variations of the human experience.
          </Text>

          <Pressable
            onPress={() => handleLinkPress("https://youthfornd.org")}
            className="flex-row items-center justify-between bg-indigo-50 rounded-xl p-4 mb-3 active:opacity-80"
          >
            <View className="flex-row items-center">
              <Ionicons name="globe-outline" size={20} color="#6366F1" />
              <Text className="text-indigo-700 font-semibold ml-2">YouthforND.org</Text>
            </View>
            <Ionicons name="open-outline" size={18} color="#6366F1" />
          </Pressable>

          <Pressable
            onPress={() => handleLinkPress("https://instagram.com/YouthforND")}
            className="flex-row items-center justify-between bg-pink-50 rounded-xl p-4 active:opacity-80"
          >
            <View className="flex-row items-center">
              <Ionicons name="logo-instagram" size={20} color="#EC4899" />
              <Text className="text-pink-700 font-semibold ml-2">@YouthforND</Text>
            </View>
            <Ionicons name="open-outline" size={18} color="#EC4899" />
          </Pressable>
        </View>

        {/* Developer Section */}
        <View
          className="bg-white rounded-2xl p-5 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-purple-100 items-center justify-center mr-3">
              <Ionicons name="code-slash" size={24} color="#8B5CF6" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-800 text-lg font-bold">Developer</Text>
              <Text className="text-slate-500 text-sm">App development</Text>
            </View>
          </View>

          <View className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
            <Text className="text-slate-700 text-base leading-relaxed">
              This app is created by <Text className="font-bold text-indigo-600">Aashna Parsa</Text>, Founder and President of Youth for Neurodiversity Inc. The content is sourced from leading organizations promoting the strengths-based model of neurodiversity. More details are on our website.
            </Text>
            <Pressable
              onPress={() => handleLinkPress("https://youthfornd.org")}
              className="flex-row items-center mt-3 active:opacity-80"
            >
              <Ionicons name="globe-outline" size={16} color="#6366F1" />
              <Text className="text-indigo-600 font-semibold text-sm ml-1">youthfornd.org</Text>
              <Ionicons name="open-outline" size={14} color="#6366F1" style={{ marginLeft: 4 }} />
            </Pressable>
          </View>
        </View>

        {/* Mission Section */}
        <View
          className="bg-white rounded-2xl p-5 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-rose-100 items-center justify-center mr-3">
              <Ionicons name="heart" size={24} color="#F43F5E" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-800 text-lg font-bold">Our Mission</Text>
              <Text className="text-slate-500 text-sm">Why we built this</Text>
            </View>
          </View>

          <Text className="text-slate-700 text-base leading-relaxed">
            Ally in Training™ helps young people learn about neurodiversity in an engaging, interactive way. Our goal is to build empathy, understanding, and create a more inclusive world where everyone feels accepted for who they are.
          </Text>
        </View>

        {/* App Features Section */}
        <View
          className="bg-white rounded-2xl p-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-amber-100 items-center justify-center mr-3">
              <Ionicons name="sparkles" size={24} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-800 text-lg font-bold">App Features</Text>
              <Text className="text-slate-500 text-sm">What you can explore</Text>
            </View>
          </View>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons name="map" size={16} color="#3B82F6" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">9 themed worlds to explore</Text>
            </View>

            <View className="flex-row items-center mt-3">
              <View className="w-8 h-8 rounded-full bg-purple-100 items-center justify-center mr-3">
                <Ionicons name="layers" size={16} color="#8B5CF6" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">Collectible concept cards</Text>
            </View>

            <View className="flex-row items-center mt-3">
              <View className="w-8 h-8 rounded-full bg-amber-100 items-center justify-center mr-3">
                <Ionicons name="compass" size={16} color="#F59E0B" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">Interactive quests and scenarios</Text>
            </View>

            <View className="flex-row items-center mt-3">
              <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-3">
                <Ionicons name="trophy" size={16} color="#10B981" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">Badges and level progression</Text>
            </View>


            <View className="flex-row items-center mt-3">
              <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center mr-3">
                <Ionicons name="megaphone" size={16} color="#6366F1" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">Join the movement</Text>
            </View>

            <View className="flex-row items-center mt-3">
              <View className="w-8 h-8 rounded-full bg-yellow-100 items-center justify-center mr-3">
                <Ionicons name="share-social" size={16} color="#F59E0B" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">Share with Friends</Text>
            </View>

            <View className="flex-row items-center mt-3">
              <View className="w-8 h-8 rounded-full bg-teal-100 items-center justify-center mr-3">
                <Ionicons name="person-circle" size={16} color="#14B8A6" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">Avatar personalization</Text>
            </View>

            <View className="flex-row items-center mt-3">
              <View className="w-8 h-8 rounded-full bg-rose-100 items-center justify-center mr-3">
                <Ionicons name="ribbon" size={16} color="#F43F5E" />
              </View>
              <Text className="text-slate-700 text-sm flex-1">Certificate of achievement</Text>
            </View>
          </View>
        </View>

        {/* Help Improve Ally Section */}
        <View
          className="bg-white rounded-2xl p-5 mt-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mr-3">
              <Ionicons name="bulb" size={24} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-800 text-lg font-bold">Help Improve Ally</Text>
              <Text className="text-slate-500 text-sm">Your feedback shapes the app</Text>
            </View>
          </View>

          <Text className="text-slate-700 text-base leading-relaxed mb-4">
            {"Ally in Training\u2122 is built by and for young people. Have a suggestion, spotted something to improve, or want to share what's working? We want to hear from you!"}
          </Text>

          <Pressable
            onPress={() => setShowFeedbackWebView(true)}
            className="flex-row items-center justify-between bg-green-50 rounded-xl p-4 active:opacity-80"
          >
            <View className="flex-row items-center">
              <Ionicons name="bulb" size={20} color="#10B981" />
              <Text className="text-green-700 font-semibold ml-2">Open Feedback Form</Text>
            </View>
            <Ionicons name="open-outline" size={18} color="#10B981" />
          </Pressable>

          <WebViewModal
            visible={showFeedbackWebView}
            onClose={() => setShowFeedbackWebView(false)}
            url="https://www.youthfornd.org/feedback-form-ally-in-training"
            title="Help Improve Ally"
          />
        </View>

        {/* Copyright */}
        <Text className="text-slate-400 text-xs text-center mt-6">
          {"© 2024 Youth for Neurodiversity Inc. All rights reserved."}
        </Text>
      </ScrollView>
    </View>
  );
}
