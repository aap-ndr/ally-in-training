import React from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface WebViewModalProps {
  visible: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function WebViewModal({ visible, onClose, url, title }: WebViewModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <View style={styles.container}>
          <SafeAreaView edges={["top"]} style={styles.safeTop}>
            <View style={styles.headerRow}>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="#334155" />
              </Pressable>
              <Text style={styles.title}>{title}</Text>
            </View>
          </SafeAreaView>
          <WebView source={{ uri: url }} style={styles.webView} />
        </View>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeTop: {
    backgroundColor: "#f1f5f9",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f1f5f9",
  },
  closeButton: {
    marginRight: 12,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: "#334155",
  },
  webView: {
    flex: 1,
  },
});
