import React from "react";
import { View } from "react-native";

interface JoinMovementIconProps {
  size?: number;
}

export default function JoinMovementIcon({ size = 52 }: JoinMovementIconProps) {
  const figures = [
    { xCenter: size * 0.25, yHead: size * 0.32, headR: size * 0.115, color: "#FF6B6B" },
    { xCenter: size * 0.50, yHead: size * 0.22, headR: size * 0.130, color: "#FECA57" },
    { xCenter: size * 0.75, yHead: size * 0.32, headR: size * 0.115, color: "#48DBFB" },
  ];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        backgroundColor: "#4F46E5",
      }}
    >
      {/* Subtle top highlight */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: size * 0.45,
          backgroundColor: "#6366F1",
        }}
      />

      {/* Ground bar */}
      <View
        style={{
          position: "absolute",
          bottom: size * 0.1,
          left: size * 0.08,
          right: size * 0.08,
          height: size * 0.028,
          backgroundColor: "rgba(255,255,255,0.25)",
          borderRadius: size * 0.014,
        }}
      />

      {/* Three person figures */}
      {figures.map((fig, i) => {
        const headD = fig.headR * 2;
        const bodyW = fig.headR * 1.55;
        const bodyH = fig.headR * 1.9;
        const bodyTop = fig.yHead + headD + size * 0.025;
        return (
          <View key={i}>
            <View
              style={{
                position: "absolute",
                left: fig.xCenter - fig.headR,
                top: fig.yHead,
                width: headD,
                height: headD,
                borderRadius: fig.headR,
                backgroundColor: fig.color,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: fig.xCenter - bodyW / 2,
                top: bodyTop,
                width: bodyW,
                height: bodyH,
                borderRadius: bodyW * 0.32,
                backgroundColor: fig.color,
                opacity: 0.88,
              }}
            />
          </View>
        );
      })}

      {/* Small star above center figure */}
      <View
        style={{
          position: "absolute",
          top: size * 0.07,
          left: size * 0.5 - size * 0.05,
          width: size * 0.1,
          height: size * 0.1,
          borderRadius: size * 0.05,
          backgroundColor: "#C4B5FD",
          opacity: 0.7,
        }}
      />
    </View>
  );
}
