import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";

const joinMovementImage = require("../../assets/join-the-movement.png");
import JoinMovementIcon from "../components/JoinMovementIcon";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { saveAmbassadorData } from "../api/firebase";
import { useGameStore } from "../state/gameStore";

interface FormData {
  name: string;
  email: string;
  age: string;
  city: string;
  state: string;
  country: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  city?: string;
  country?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email";
  }
  if (!data.age.trim()) {
    errors.age = "Age is required";
  } else if (!/^\d+$/.test(data.age.trim()) || parseInt(data.age.trim(), 10) < 1) {
    errors.age = "Please enter a valid age";
  }
  if (!data.city.trim()) errors.city = "City is required";
  if (!data.country.trim()) errors.country = "Country is required";
  return errors;
}

export default function JoinUsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const setJoinedMovement = useGameStore((s) => s.setJoinedMovement);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    city: "",
    state: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      await saveAmbassadorData(form);
      setJoinedMovement(form);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <LinearGradient
          colors={["#6366F1", "#8B5CF6", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + 12, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={{ color: "white", fontSize: 16, marginLeft: 4 }}>Back</Text>
          </Pressable>
        </LinearGradient>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <Ionicons name="checkmark-circle" size={56} color="#6366F1" />
          </View>
          <Text style={{ fontSize: 26, fontWeight: "800", color: "#1E293B", textAlign: "center", marginBottom: 12 }}>
            {"You're In!"}
          </Text>
          <Text style={{ fontSize: 16, color: "#64748B", textAlign: "center", lineHeight: 24, marginBottom: 32 }}>
            {"Thank you for joining the movement! Youth for Neurodiversity Inc. will reach out about ambassador and chapter leader opportunities."}
          </Text>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "#6366F1", borderRadius: 18, paddingVertical: 16, paddingHorizontal: 40 }}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Back to Learning</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <LinearGradient
        colors={["#6366F1", "#8B5CF6", "#EC4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + 12, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 4 }}>Back</Text>
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <View style={{ marginRight: 12 }}>
            <JoinMovementIcon size={52} />
          </View>
          <View>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>Join the Movement</Text>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 2 }}>Youth for Neurodiversity Inc.</Text>
          </View>
        </View>
        <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 20, marginTop: 4 }}>
          Become an ambassador or lead a chapter in your community. Help us spread empathy and understanding for neurodiversity.
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: insets.bottom + 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#1E293B", marginBottom: 4 }}>Your Information</Text>
          <Text style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>
            This will only be used to contact you about volunteer opportunities.
          </Text>

          {/* Name */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>Full Name *</Text>
            <TextInput
              value={form.name}
              onChangeText={(v) => updateField("name", v)}
              placeholder="Your full name"
              placeholderTextColor="#CBD5E1"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                color: "#1E293B",
                borderWidth: 1.5,
                borderColor: errors.name ? "#EF4444" : "#E2E8F0",
              }}
            />
            {errors.name ? <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.name}</Text> : null}
          </View>

          {/* Email */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>Email Address *</Text>
            <TextInput
              value={form.email}
              onChangeText={(v) => updateField("email", v)}
              placeholder="you@example.com"
              placeholderTextColor="#CBD5E1"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                color: "#1E293B",
                borderWidth: 1.5,
                borderColor: errors.email ? "#EF4444" : "#E2E8F0",
              }}
            />
            {errors.email ? <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.email}</Text> : null}
          </View>

          {/* Age */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>Age *</Text>
            <TextInput
              value={form.age}
              onChangeText={(v) => updateField("age", v)}
              placeholder="Your age"
              placeholderTextColor="#CBD5E1"
              keyboardType="number-pad"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                color: "#1E293B",
                borderWidth: 1.5,
                borderColor: errors.age ? "#EF4444" : "#E2E8F0",
              }}
            />
            {errors.age ? <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.age}</Text> : null}
          </View>

          {/* City */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>City *</Text>
            <TextInput
              value={form.city}
              onChangeText={(v) => updateField("city", v)}
              placeholder="Your city"
              placeholderTextColor="#CBD5E1"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                color: "#1E293B",
                borderWidth: 1.5,
                borderColor: errors.city ? "#EF4444" : "#E2E8F0",
              }}
            />
            {errors.city ? <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.city}</Text> : null}
          </View>

          {/* State */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>
              State / Province <Text style={{ color: "#94A3B8", fontWeight: "400" }}>(optional)</Text>
            </Text>
            <TextInput
              value={form.state}
              onChangeText={(v) => updateField("state", v)}
              placeholder="State or province"
              placeholderTextColor="#CBD5E1"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                color: "#1E293B",
                borderWidth: 1.5,
                borderColor: "#E2E8F0",
              }}
            />
          </View>

          {/* Country */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>Country *</Text>
            <TextInput
              value={form.country}
              onChangeText={(v) => updateField("country", v)}
              placeholder="Your country"
              placeholderTextColor="#CBD5E1"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                color: "#1E293B",
                borderWidth: 1.5,
                borderColor: errors.country ? "#EF4444" : "#E2E8F0",
              }}
            />
            {errors.country ? <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.country}</Text> : null}
          </View>

          {/* Message */}
          <View style={{ marginBottom: 28 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 }}>
              Tell us a bit about yourself <Text style={{ color: "#94A3B8", fontWeight: "400" }}>(optional)</Text>
            </Text>
            <TextInput
              value={form.message}
              onChangeText={(v) => updateField("message", v)}
              placeholder="Share your interest in neurodiversity, your community role, or anything you want us to know..."
              placeholderTextColor="#CBD5E1"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{
                backgroundColor: "white",
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 15,
                color: "#1E293B",
                borderWidth: 1.5,
                borderColor: "#E2E8F0",
                minHeight: 110,
              }}
            />
          </View>

          {/* Submit error */}
          {submitError ? (
            <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 14, marginBottom: 16, flexDirection: "row", alignItems: "flex-start" }}>
              <Ionicons name="alert-circle" size={18} color="#EF4444" style={{ marginTop: 1, marginRight: 8 }} />
              <Text style={{ color: "#DC2626", fontSize: 13, flex: 1, lineHeight: 19 }}>{submitError}</Text>
            </View>
          ) : null}

          {/* Submit button */}
          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            style={{
              borderRadius: 18,
              overflow: "hidden",
              shadowColor: "#6366F1",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <LinearGradient
              colors={["#6366F1", "#8B5CF6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Ionicons name="send" size={18} color="white" style={{ marginRight: 8 }} />
                  <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>Submit Application</Text>
                </>
              )}
            </LinearGradient>
          </Pressable>

          <Text style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 16, lineHeight: 18 }}>
            Your information is only used by Youth for Neurodiversity Inc. and is never sold or shared with third parties.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
