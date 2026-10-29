import React from "react";
import { View } from "react-native";

interface AppLogoProps {
  size?: number;
  showName?: boolean;
}

// Rainbow colors representing neurodiversity
const RAINBOW_COLORS = [
  "#FF6B6B", // Red
  "#FF9F43", // Orange
  "#FECA57", // Yellow
  "#48DBFB", // Cyan/Light Blue
  "#5F27CD", // Purple
  "#FF6B9D", // Pink
];

export default function AppLogo({ size = 48 }: AppLogoProps) {
  // Rainbow butterfly/infinity creature representing neurodiversity
  // Friendly character with rainbow-colored wings in infinity pattern

  const wingSize = size * 0.35;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {/* Rainbow infinity wings - left side */}
      <View
        style={{
          position: "absolute",
          left: size * 0.02,
          top: size * 0.18,
          width: wingSize,
          height: wingSize * 0.8,
          borderRadius: wingSize * 0.4,
          backgroundColor: RAINBOW_COLORS[0],
          transform: [{ rotate: "-25deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          left: size * 0.08,
          top: size * 0.28,
          width: wingSize * 0.7,
          height: wingSize * 0.6,
          borderRadius: wingSize * 0.3,
          backgroundColor: RAINBOW_COLORS[1],
          transform: [{ rotate: "-25deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          left: size * 0.12,
          top: size * 0.35,
          width: wingSize * 0.5,
          height: wingSize * 0.4,
          borderRadius: wingSize * 0.2,
          backgroundColor: RAINBOW_COLORS[2],
          transform: [{ rotate: "-25deg" }],
        }}
      />

      {/* Rainbow infinity wings - right side */}
      <View
        style={{
          position: "absolute",
          right: size * 0.02,
          top: size * 0.18,
          width: wingSize,
          height: wingSize * 0.8,
          borderRadius: wingSize * 0.4,
          backgroundColor: RAINBOW_COLORS[3],
          transform: [{ rotate: "25deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          right: size * 0.08,
          top: size * 0.28,
          width: wingSize * 0.7,
          height: wingSize * 0.6,
          borderRadius: wingSize * 0.3,
          backgroundColor: RAINBOW_COLORS[4],
          transform: [{ rotate: "25deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          right: size * 0.12,
          top: size * 0.35,
          width: wingSize * 0.5,
          height: wingSize * 0.4,
          borderRadius: wingSize * 0.2,
          backgroundColor: RAINBOW_COLORS[5],
          transform: [{ rotate: "25deg" }],
        }}
      />

      {/* Bottom wings - like butterfly lower wings */}
      <View
        style={{
          position: "absolute",
          left: size * 0.08,
          bottom: size * 0.12,
          width: wingSize * 0.65,
          height: wingSize * 0.55,
          borderRadius: wingSize * 0.25,
          backgroundColor: RAINBOW_COLORS[4],
          transform: [{ rotate: "25deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          right: size * 0.08,
          bottom: size * 0.12,
          width: wingSize * 0.65,
          height: wingSize * 0.55,
          borderRadius: wingSize * 0.25,
          backgroundColor: RAINBOW_COLORS[1],
          transform: [{ rotate: "-25deg" }],
        }}
      />

      {/* Center body - friendly face */}
      <View
        style={{
          width: size * 0.42,
          height: size * 0.5,
          borderRadius: size * 0.21,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        {/* Eyes container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: size * 0.28,
            marginTop: -size * 0.02,
          }}
        >
          {/* Left eye */}
          <View
            style={{
              width: size * 0.1,
              height: size * 0.12,
              backgroundColor: "#2D3436",
              borderRadius: size * 0.05,
            }}
          >
            {/* Eye sparkle */}
            <View
              style={{
                position: "absolute",
                left: size * 0.02,
                top: size * 0.02,
                width: size * 0.03,
                height: size * 0.03,
                backgroundColor: "#FFFFFF",
                borderRadius: size * 0.015,
              }}
            />
          </View>

          {/* Right eye */}
          <View
            style={{
              width: size * 0.1,
              height: size * 0.12,
              backgroundColor: "#2D3436",
              borderRadius: size * 0.05,
            }}
          >
            {/* Eye sparkle */}
            <View
              style={{
                position: "absolute",
                left: size * 0.02,
                top: size * 0.02,
                width: size * 0.03,
                height: size * 0.03,
                backgroundColor: "#FFFFFF",
                borderRadius: size * 0.015,
              }}
            />
          </View>
        </View>

        {/* Rosy cheeks */}
        <View
          style={{
            position: "absolute",
            left: size * 0.04,
            top: size * 0.22,
            width: size * 0.06,
            height: size * 0.04,
            backgroundColor: "#FFB8C0",
            borderRadius: size * 0.02,
            opacity: 0.7,
          }}
        />
        <View
          style={{
            position: "absolute",
            right: size * 0.04,
            top: size * 0.22,
            width: size * 0.06,
            height: size * 0.04,
            backgroundColor: "#FFB8C0",
            borderRadius: size * 0.02,
            opacity: 0.7,
          }}
        />

        {/* Happy smile */}
        <View
          style={{
            width: size * 0.14,
            height: size * 0.08,
            borderBottomLeftRadius: size * 0.07,
            borderBottomRightRadius: size * 0.07,
            backgroundColor: "#FF6B9D",
            marginTop: size * 0.02,
            overflow: "hidden",
          }}
        >
          {/* Tongue */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: size * 0.03,
              width: size * 0.08,
              height: size * 0.04,
              backgroundColor: "#FF8FAB",
              borderTopLeftRadius: size * 0.04,
              borderTopRightRadius: size * 0.04,
            }}
          />
        </View>
      </View>

      {/* Antennae */}
      <View
        style={{
          position: "absolute",
          top: size * 0.02,
          left: size * 0.32,
          width: size * 0.03,
          height: size * 0.15,
          backgroundColor: "#2D3436",
          borderRadius: size * 0.015,
          transform: [{ rotate: "-20deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: size * 0.28,
          width: size * 0.08,
          height: size * 0.08,
          backgroundColor: RAINBOW_COLORS[0],
          borderRadius: size * 0.04,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: size * 0.02,
          right: size * 0.32,
          width: size * 0.03,
          height: size * 0.15,
          backgroundColor: "#2D3436",
          borderRadius: size * 0.015,
          transform: [{ rotate: "20deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: size * 0.28,
          width: size * 0.08,
          height: size * 0.08,
          backgroundColor: RAINBOW_COLORS[3],
          borderRadius: size * 0.04,
        }}
      />

      {/* Rainbow sparkle accents */}
      <View
        style={{
          position: "absolute",
          top: size * 0.08,
          left: size * 0.05,
          width: size * 0.04,
          height: size * 0.04,
          backgroundColor: RAINBOW_COLORS[2],
          borderRadius: size * 0.02,
          opacity: 0.8,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: size * 0.12,
          right: size * 0.03,
          width: size * 0.03,
          height: size * 0.03,
          backgroundColor: RAINBOW_COLORS[5],
          borderRadius: size * 0.015,
          opacity: 0.8,
        }}
      />
    </View>
  );
}
