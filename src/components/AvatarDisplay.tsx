import React from "react";
import { View } from "react-native";
import type { AvatarCustomization } from "../types/game";

interface AvatarDisplayProps {
  avatar: AvatarCustomization;
  size?: number;
  showBorder?: boolean;
}

// Duolingo-style avatar colors for various elements
const AVATAR_BG_COLORS = [
  "#58CC02", // Duo green
  "#1CB0F6", // Bright blue
  "#FF9600", // Orange
  "#CE82FF", // Purple
  "#FF4B4B", // Red
  "#2B70C9", // Dark blue
];

// Get consistent background color based on skin tone
const getAvatarBgColor = (skinTone: string): string => {
  const hash = skinTone.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
  return AVATAR_BG_COLORS[Math.abs(hash) % AVATAR_BG_COLORS.length];
};

export default function AvatarDisplay({ avatar, size = 80, showBorder = false }: AvatarDisplayProps) {
  // Use custom background color if set, otherwise use generated color
  const bgColor = avatar.backgroundColor || getAvatarBgColor(avatar.skinTone);

  const isHijab = avatar.accessory === "hijab";
  const isTurban = avatar.accessory === "turban";
  const isCap = avatar.accessory === "cap";
  const isBeanie = avatar.accessory === "beanie";
  const showHair = !isHijab && !isTurban;

  // Check if this hairstyle needs more space (zoom out effect)
  const needsZoomOut = avatar.hairStyle === "ponytail" || avatar.hairStyle === "braids" || avatar.hairStyle === "locs";
  const scale = needsZoomOut ? 0.85 : 1;
  const innerSize = size * scale;
  const offset = (size - innerSize) / 2;

  // Hair that drapes in front of the face (bangs/fringe)
  const renderFrontHair = () => {
    if (!showHair || isCap || isBeanie) return null;

    const hairColor = avatar.hairColor || "#4A3728";

    switch (avatar.hairStyle) {
      case "long":
      case "wavy":
        // Side hair that comes down in front
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.12,
                top: innerSize * 0.25,
                width: innerSize * 0.1,
                height: innerSize * 0.35,
                backgroundColor: hairColor,
                borderBottomLeftRadius: innerSize * 0.05,
                borderBottomRightRadius: innerSize * 0.03,
                zIndex: 15,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.12,
                top: innerSize * 0.25,
                width: innerSize * 0.1,
                height: innerSize * 0.35,
                backgroundColor: hairColor,
                borderBottomLeftRadius: innerSize * 0.03,
                borderBottomRightRadius: innerSize * 0.05,
                zIndex: 15,
              }}
            />
          </>
        );

      case "curly":
        // Curly bits framing the face
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.1,
                top: innerSize * 0.22,
                width: innerSize * 0.14,
                height: innerSize * 0.2,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.07,
                zIndex: 15,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.1,
                top: innerSize * 0.22,
                width: innerSize * 0.14,
                height: innerSize * 0.2,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.07,
                zIndex: 15,
              }}
            />
          </>
        );

      case "medium":
      case "short":
        // Small bangs/fringe
        return (
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.22,
              right: innerSize * 0.22,
              top: innerSize * 0.18,
              height: innerSize * 0.08,
              backgroundColor: hairColor,
              borderBottomLeftRadius: innerSize * 0.04,
              borderBottomRightRadius: innerSize * 0.04,
              zIndex: 15,
            }}
          />
        );

      case "buzz":
        // Very short stubble effect - subtle texture at the hairline
        return (
          <>
            {/* Stubble effect at hairline - multiple small dots for texture */}
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.28,
                right: innerSize * 0.28,
                top: innerSize * 0.2,
                height: innerSize * 0.02,
                backgroundColor: hairColor,
                opacity: 0.4,
                borderBottomLeftRadius: innerSize * 0.01,
                borderBottomRightRadius: innerSize * 0.01,
                zIndex: 15,
              }}
            />
          </>
        );

      case "pixie":
        // Asymmetric fringe
        return (
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.18,
              top: innerSize * 0.18,
              width: innerSize * 0.25,
              height: innerSize * 0.12,
              backgroundColor: hairColor,
              borderBottomLeftRadius: innerSize * 0.08,
              borderBottomRightRadius: innerSize * 0.04,
              zIndex: 15,
            }}
          />
        );

      default:
        return null;
    }
  };

  // Hair behind the face
  const renderBackHair = () => {
    if (!showHair) return null;

    const hairColor = avatar.hairColor || "#4A3728";

    switch (avatar.hairStyle) {
      case "afro":
        return (
          <View
            style={{
              position: "absolute",
              width: innerSize * 0.9,
              height: innerSize * 0.6,
              backgroundColor: hairColor,
              borderRadius: innerSize * 0.45,
              top: innerSize * 0.02,
              left: innerSize * 0.05,
            }}
          />
        );

      case "long":
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.12,
                right: innerSize * 0.12,
                top: innerSize * 0.05,
                height: innerSize * 0.32,
                backgroundColor: hairColor,
                borderTopLeftRadius: innerSize * 0.28,
                borderTopRightRadius: innerSize * 0.28,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.08,
                top: innerSize * 0.25,
                width: innerSize * 0.14,
                height: innerSize * 0.55,
                backgroundColor: hairColor,
                borderBottomLeftRadius: innerSize * 0.07,
                borderBottomRightRadius: innerSize * 0.07,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.08,
                top: innerSize * 0.25,
                width: innerSize * 0.14,
                height: innerSize * 0.55,
                backgroundColor: hairColor,
                borderBottomLeftRadius: innerSize * 0.07,
                borderBottomRightRadius: innerSize * 0.07,
              }}
            />
          </>
        );

      case "curly":
        return (
          <>
            <View
              style={{
                position: "absolute",
                width: innerSize * 0.75,
                height: innerSize * 0.42,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.38,
                top: innerSize * 0.02,
                left: innerSize * 0.125,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.06,
                top: innerSize * 0.2,
                width: innerSize * 0.2,
                height: innerSize * 0.3,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.1,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.06,
                top: innerSize * 0.2,
                width: innerSize * 0.2,
                height: innerSize * 0.3,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.1,
              }}
            />
          </>
        );

      case "bun":
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.2,
                right: innerSize * 0.2,
                top: innerSize * 0.08,
                height: innerSize * 0.2,
                backgroundColor: hairColor,
                borderTopLeftRadius: innerSize * 0.22,
                borderTopRightRadius: innerSize * 0.22,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: -innerSize * 0.05,
                left: innerSize * 0.375,
                width: innerSize * 0.25,
                height: innerSize * 0.22,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.12,
              }}
            />
          </>
        );

      case "ponytail":
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.18,
                right: innerSize * 0.18,
                top: innerSize * 0.05,
                height: innerSize * 0.24,
                backgroundColor: hairColor,
                borderTopLeftRadius: innerSize * 0.24,
                borderTopRightRadius: innerSize * 0.24,
              }}
            />
            {/* Ponytail extending out */}
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.02,
                top: innerSize * 0.1,
                width: innerSize * 0.18,
                height: innerSize * 0.5,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.09,
                transform: [{ rotate: "15deg" }],
              }}
            />
            {/* Hair tie */}
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.06,
                top: innerSize * 0.15,
                width: innerSize * 0.1,
                height: innerSize * 0.06,
                backgroundColor: "#EC4899",
                borderRadius: innerSize * 0.03,
                transform: [{ rotate: "15deg" }],
                zIndex: 1,
              }}
            />
          </>
        );

      case "pixie":
        return (
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.12,
              right: innerSize * 0.28,
              top: innerSize * 0.05,
              height: innerSize * 0.24,
              backgroundColor: hairColor,
              borderTopLeftRadius: innerSize * 0.2,
              borderTopRightRadius: innerSize * 0.12,
              borderBottomLeftRadius: innerSize * 0.1,
            }}
          />
        );

      case "buzz":
        // Buzz cut - very short, rounded, hugs the head shape
        return (
          <>
            {/* Main buzz cut - rounded to follow head shape */}
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.2,
                right: innerSize * 0.2,
                top: innerSize * 0.08,
                height: innerSize * 0.22,
                backgroundColor: hairColor,
                borderTopLeftRadius: innerSize * 0.25,
                borderTopRightRadius: innerSize * 0.25,
                borderBottomLeftRadius: innerSize * 0.08,
                borderBottomRightRadius: innerSize * 0.08,
                opacity: 0.85,
              }}
            />
            {/* Side stubble left */}
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.15,
                top: innerSize * 0.18,
                width: innerSize * 0.08,
                height: innerSize * 0.12,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.04,
                opacity: 0.65,
              }}
            />
            {/* Side stubble right */}
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.15,
                top: innerSize * 0.18,
                width: innerSize * 0.08,
                height: innerSize * 0.12,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.04,
                opacity: 0.65,
              }}
            />
          </>
        );

      case "braids":
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.15,
                right: innerSize * 0.15,
                top: innerSize * 0.05,
                height: innerSize * 0.24,
                backgroundColor: hairColor,
                borderTopLeftRadius: innerSize * 0.22,
                borderTopRightRadius: innerSize * 0.22,
              }}
            />
            {/* Left braid */}
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.12,
                top: innerSize * 0.22,
                width: innerSize * 0.1,
                height: innerSize * 0.6,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.05,
              }}
            />
            {/* Right braid */}
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.12,
                top: innerSize * 0.22,
                width: innerSize * 0.1,
                height: innerSize * 0.6,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.05,
              }}
            />
            {/* Braid ties */}
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.13,
                top: innerSize * 0.75,
                width: innerSize * 0.08,
                height: innerSize * 0.04,
                backgroundColor: "#F59E0B",
                borderRadius: innerSize * 0.02,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.13,
                top: innerSize * 0.75,
                width: innerSize * 0.08,
                height: innerSize * 0.04,
                backgroundColor: "#F59E0B",
                borderRadius: innerSize * 0.02,
              }}
            />
          </>
        );

      case "locs":
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.14,
                right: innerSize * 0.14,
                top: innerSize * 0.04,
                height: innerSize * 0.28,
                backgroundColor: hairColor,
                borderTopLeftRadius: innerSize * 0.24,
                borderTopRightRadius: innerSize * 0.24,
              }}
            />
            {[0.06, 0.2, 0.58, 0.72].map((left, i) => (
              <View
                key={i}
                style={{
                  position: "absolute",
                  left: innerSize * left,
                  top: innerSize * (0.24 + (i % 2) * 0.03),
                  width: innerSize * 0.09,
                  height: innerSize * (0.45 + (i % 3) * 0.1),
                  backgroundColor: hairColor,
                  borderRadius: innerSize * 0.045,
                }}
              />
            ))}
          </>
        );

      case "wavy":
        return (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.12,
                right: innerSize * 0.12,
                top: innerSize * 0.04,
                height: innerSize * 0.28,
                backgroundColor: hairColor,
                borderTopLeftRadius: innerSize * 0.28,
                borderTopRightRadius: innerSize * 0.28,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.06,
                top: innerSize * 0.2,
                width: innerSize * 0.16,
                height: innerSize * 0.4,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.08,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.06,
                top: innerSize * 0.2,
                width: innerSize * 0.16,
                height: innerSize * 0.4,
                backgroundColor: hairColor,
                borderRadius: innerSize * 0.08,
              }}
            />
          </>
        );

      case "short":
      case "medium":
      default:
        return (
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.15,
              right: innerSize * 0.15,
              top: innerSize * 0.06,
              height: innerSize * 0.26,
              backgroundColor: hairColor,
              borderTopLeftRadius: innerSize * 0.24,
              borderTopRightRadius: innerSize * 0.24,
            }}
          />
        );
    }
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: showBorder ? 3 : 0,
        borderColor: "#FFFFFF",
        borderRadius: size / 2,
        backgroundColor: bgColor,
        overflow: "hidden",
      }}
    >
      {/* Inner container for zoom effect */}
      <View
        style={{
          width: innerSize,
          height: innerSize,
          alignItems: "center",
          position: "absolute",
          top: offset,
        }}
      >
        {/* Hair behind face */}
        {showHair && !isCap && !isBeanie && (
          <View style={{ position: "absolute", width: innerSize, height: innerSize, zIndex: 0 }}>
            {renderBackHair()}
          </View>
        )}

        {/* Neck */}
        <View
          style={{
            position: "absolute",
            bottom: innerSize * 0.02,
            width: innerSize * 0.28,
            height: innerSize * 0.14,
            backgroundColor: avatar.skinTone,
            borderBottomLeftRadius: innerSize * 0.1,
            borderBottomRightRadius: innerSize * 0.1,
            zIndex: 1,
          }}
        />

        {/* Ears */}
        <View
          style={{
            position: "absolute",
            left: innerSize * 0.12,
            top: innerSize * 0.4,
            width: innerSize * 0.08,
            height: innerSize * 0.1,
            backgroundColor: avatar.skinTone,
            borderRadius: innerSize * 0.04,
            zIndex: 2,
          }}
        />
        <View
          style={{
            position: "absolute",
            right: innerSize * 0.12,
            top: innerSize * 0.4,
            width: innerSize * 0.08,
            height: innerSize * 0.1,
            backgroundColor: avatar.skinTone,
            borderRadius: innerSize * 0.04,
            zIndex: 2,
          }}
        />

        {/* Face - Slightly oval shape, not perfectly circular */}
        <View
          style={{
            position: "absolute",
            width: innerSize * 0.62,
            height: innerSize * 0.7,
            backgroundColor: avatar.skinTone,
            borderTopLeftRadius: innerSize * 0.28,
            borderTopRightRadius: innerSize * 0.28,
            borderBottomLeftRadius: innerSize * 0.26,
            borderBottomRightRadius: innerSize * 0.26,
            top: innerSize * 0.18,
            zIndex: 3,
          }}
        />

        {/* Hijab */}
        {isHijab && (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.08,
                right: innerSize * 0.08,
                top: innerSize * 0.08,
                height: innerSize * 0.48,
                backgroundColor: "#8B5CF6",
                borderTopLeftRadius: innerSize * 0.35,
                borderTopRightRadius: innerSize * 0.35,
                zIndex: 6,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.12,
                right: innerSize * 0.12,
                top: innerSize * 0.42,
                height: innerSize * 0.4,
                backgroundColor: "#7C3AED",
                borderBottomLeftRadius: innerSize * 0.15,
                borderBottomRightRadius: innerSize * 0.15,
                zIndex: 2,
              }}
            />
          </>
        )}

        {/* Turban */}
        {isTurban && (
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.12,
              right: innerSize * 0.12,
              top: innerSize * 0.05,
              height: innerSize * 0.32,
              backgroundColor: "#F59E0B",
              borderTopLeftRadius: innerSize * 0.28,
              borderTopRightRadius: innerSize * 0.28,
              borderBottomLeftRadius: innerSize * 0.08,
              borderBottomRightRadius: innerSize * 0.08,
              zIndex: 6,
            }}
          />
        )}

        {/* Cap */}
        {isCap && (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.15,
                right: innerSize * 0.15,
                top: innerSize * 0.08,
                height: innerSize * 0.26,
                backgroundColor: "#EF4444",
                borderTopLeftRadius: innerSize * 0.28,
                borderTopRightRadius: innerSize * 0.28,
                zIndex: 6,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: 0,
                top: innerSize * 0.25,
                width: innerSize * 0.42,
                height: innerSize * 0.08,
                backgroundColor: "#DC2626",
                borderTopLeftRadius: innerSize * 0.04,
                borderBottomLeftRadius: innerSize * 0.04,
                zIndex: 7,
              }}
            />
          </>
        )}

        {/* Beanie */}
        {isBeanie && (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.12,
                right: innerSize * 0.12,
                top: innerSize * 0.05,
                height: innerSize * 0.32,
                backgroundColor: "#3B82F6",
                borderTopLeftRadius: innerSize * 0.28,
                borderTopRightRadius: innerSize * 0.28,
                zIndex: 6,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.12,
                right: innerSize * 0.12,
                top: innerSize * 0.28,
                height: innerSize * 0.06,
                backgroundColor: "#2563EB",
                zIndex: 7,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: -innerSize * 0.02,
                left: innerSize * 0.44,
                width: innerSize * 0.12,
                height: innerSize * 0.12,
                backgroundColor: "#FFFFFF",
                borderRadius: innerSize * 0.06,
                zIndex: 8,
              }}
            />
          </>
        )}

        {/* Eyebrows */}
        <View
          style={{
            position: "absolute",
            left: innerSize * 0.28,
            top: innerSize * 0.38,
            width: innerSize * 0.12,
            height: innerSize * 0.025,
            backgroundColor: "#3D3D3D",
            borderRadius: innerSize * 0.012,
            transform: [{ rotate: "-8deg" }],
            zIndex: 10,
          }}
        />
        <View
          style={{
            position: "absolute",
            right: innerSize * 0.28,
            top: innerSize * 0.38,
            width: innerSize * 0.12,
            height: innerSize * 0.025,
            backgroundColor: "#3D3D3D",
            borderRadius: innerSize * 0.012,
            transform: [{ rotate: "8deg" }],
            zIndex: 10,
          }}
        />

        {/* Eyes - Closer together, less frog-like */}
        <View
          style={{
            position: "absolute",
            left: innerSize * 0.27,
            top: innerSize * 0.44,
            width: innerSize * 0.14,
            height: innerSize * 0.14,
            backgroundColor: "#FFFFFF",
            borderRadius: innerSize * 0.07,
            zIndex: 10,
          }}
        >
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.035,
              top: innerSize * 0.03,
              width: innerSize * 0.08,
              height: innerSize * 0.08,
              backgroundColor: "#1A1A1A",
              borderRadius: innerSize * 0.04,
            }}
          />
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.055,
              top: innerSize * 0.025,
              width: innerSize * 0.03,
              height: innerSize * 0.03,
              backgroundColor: "#FFFFFF",
              borderRadius: innerSize * 0.015,
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            right: innerSize * 0.27,
            top: innerSize * 0.44,
            width: innerSize * 0.14,
            height: innerSize * 0.14,
            backgroundColor: "#FFFFFF",
            borderRadius: innerSize * 0.07,
            zIndex: 10,
          }}
        >
          <View
            style={{
              position: "absolute",
              right: innerSize * 0.035,
              top: innerSize * 0.03,
              width: innerSize * 0.08,
              height: innerSize * 0.08,
              backgroundColor: "#1A1A1A",
              borderRadius: innerSize * 0.04,
            }}
          />
          <View
            style={{
              position: "absolute",
              right: innerSize * 0.055,
              top: innerSize * 0.025,
              width: innerSize * 0.03,
              height: innerSize * 0.03,
              backgroundColor: "#FFFFFF",
              borderRadius: innerSize * 0.015,
            }}
          />
        </View>

        {/* Nose */}
        <View
          style={{
            position: "absolute",
            top: innerSize * 0.57,
            left: innerSize * 0.47,
            width: innerSize * 0.06,
            height: innerSize * 0.04,
            backgroundColor: "rgba(0,0,0,0.08)",
            borderRadius: innerSize * 0.02,
            zIndex: 10,
          }}
        />

        {/* Cheeks - rosy */}
        <View
          style={{
            position: "absolute",
            left: innerSize * 0.22,
            top: innerSize * 0.58,
            width: innerSize * 0.09,
            height: innerSize * 0.055,
            backgroundColor: "#FFB8C0",
            borderRadius: innerSize * 0.03,
            opacity: 0.6,
            zIndex: 10,
          }}
        />
        <View
          style={{
            position: "absolute",
            right: innerSize * 0.22,
            top: innerSize * 0.58,
            width: innerSize * 0.09,
            height: innerSize * 0.055,
            backgroundColor: "#FFB8C0",
            borderRadius: innerSize * 0.03,
            opacity: 0.6,
            zIndex: 10,
          }}
        />

        {/* Smile */}
        <View
          style={{
            position: "absolute",
            top: innerSize * 0.66,
            left: innerSize * 0.41,
            width: innerSize * 0.18,
            height: innerSize * 0.09,
            borderBottomLeftRadius: innerSize * 0.1,
            borderBottomRightRadius: innerSize * 0.1,
            backgroundColor: "#E85D5D",
            zIndex: 10,
          }}
        />

        {/* Front hair (bangs/fringe) that drapes over face */}
        {renderFrontHair()}

        {/* Glasses */}
        {(avatar.accessory === "glasses" || avatar.accessory === "round-glasses" || avatar.accessory === "sunglasses") && (
          <View
            style={{
              position: "absolute",
              top: innerSize * 0.42,
              left: innerSize * 0.18,
              right: innerSize * 0.18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 16,
            }}
          >
            <View
              style={{
                width: innerSize * 0.18,
                height: innerSize * 0.14,
                borderRadius: avatar.accessory === "round-glasses" ? innerSize * 0.09 : innerSize * 0.03,
                borderWidth: innerSize * 0.012,
                borderColor: avatar.accessory === "sunglasses" ? "#1F2937" : "#374151",
                backgroundColor: avatar.accessory === "sunglasses" ? "rgba(0,0,0,0.6)" : "transparent",
              }}
            />
            <View
              style={{
                width: innerSize * 0.06,
                height: innerSize * 0.012,
                backgroundColor: avatar.accessory === "sunglasses" ? "#1F2937" : "#374151",
              }}
            />
            <View
              style={{
                width: innerSize * 0.18,
                height: innerSize * 0.14,
                borderRadius: avatar.accessory === "round-glasses" ? innerSize * 0.09 : innerSize * 0.03,
                borderWidth: innerSize * 0.012,
                borderColor: avatar.accessory === "sunglasses" ? "#1F2937" : "#374151",
                backgroundColor: avatar.accessory === "sunglasses" ? "rgba(0,0,0,0.6)" : "transparent",
              }}
            />
          </View>
        )}

        {/* Headphones */}
        {avatar.accessory === "headphones" && (
          <>
            <View
              style={{
                position: "absolute",
                top: innerSize * 0.08,
                left: innerSize * 0.2,
                right: innerSize * 0.2,
                height: innerSize * 0.08,
                backgroundColor: "#4F46E5",
                borderTopLeftRadius: innerSize * 0.15,
                borderTopRightRadius: innerSize * 0.15,
                zIndex: 16,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.05,
                top: innerSize * 0.34,
                width: innerSize * 0.1,
                height: innerSize * 0.15,
                backgroundColor: "#6366F1",
                borderRadius: innerSize * 0.05,
                zIndex: 16,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.05,
                top: innerSize * 0.34,
                width: innerSize * 0.1,
                height: innerSize * 0.15,
                backgroundColor: "#6366F1",
                borderRadius: innerSize * 0.05,
                zIndex: 16,
              }}
            />
          </>
        )}

        {/* Flower */}
        {avatar.accessory === "flower" && (
          <View
            style={{
              position: "absolute",
              right: innerSize * 0.15,
              top: innerSize * 0.12,
              width: innerSize * 0.15,
              height: innerSize * 0.15,
              backgroundColor: "#EC4899",
              borderRadius: innerSize * 0.075,
              zIndex: 16,
            }}
          >
            <View
              style={{
                position: "absolute",
                top: innerSize * 0.05,
                left: innerSize * 0.05,
                width: innerSize * 0.05,
                height: innerSize * 0.05,
                backgroundColor: "#FBBF24",
                borderRadius: innerSize * 0.025,
              }}
            />
          </View>
        )}

        {/* Bow */}
        {avatar.accessory === "bow" && (
          <>
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.12,
                top: innerSize * 0.1,
                width: innerSize * 0.12,
                height: innerSize * 0.08,
                backgroundColor: "#F59E0B",
                borderRadius: innerSize * 0.04,
                transform: [{ rotate: "-15deg" }],
                zIndex: 16,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.2,
                top: innerSize * 0.12,
                width: innerSize * 0.12,
                height: innerSize * 0.08,
                backgroundColor: "#F59E0B",
                borderRadius: innerSize * 0.04,
                transform: [{ rotate: "15deg" }],
                zIndex: 16,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.18,
                top: innerSize * 0.11,
                width: innerSize * 0.06,
                height: innerSize * 0.08,
                backgroundColor: "#D97706",
                borderRadius: innerSize * 0.03,
                zIndex: 17,
              }}
            />
          </>
        )}

        {/* Headband */}
        {avatar.accessory === "headband" && (
          <View
            style={{
              position: "absolute",
              left: innerSize * 0.12,
              right: innerSize * 0.12,
              top: innerSize * 0.22,
              height: innerSize * 0.05,
              backgroundColor: "#10B981",
              borderRadius: innerSize * 0.025,
              zIndex: 16,
            }}
          />
        )}

        {/* Star */}
        {avatar.accessory === "star" && (
          <View
            style={{
              position: "absolute",
              right: innerSize * 0.18,
              top: innerSize * 0.14,
              width: innerSize * 0.1,
              height: innerSize * 0.1,
              backgroundColor: "#FBBF24",
              transform: [{ rotate: "15deg" }],
              zIndex: 16,
            }}
          />
        )}

        {/* Earbuds */}
        {avatar.accessory === "earbuds" && (
          <>
            <View
              style={{
                position: "absolute",
                left: innerSize * 0.08,
                top: innerSize * 0.44,
                width: innerSize * 0.06,
                height: innerSize * 0.08,
                backgroundColor: "#FFFFFF",
                borderRadius: innerSize * 0.03,
                borderWidth: 1,
                borderColor: "#D1D5DB",
                zIndex: 16,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: innerSize * 0.08,
                top: innerSize * 0.44,
                width: innerSize * 0.06,
                height: innerSize * 0.08,
                backgroundColor: "#FFFFFF",
                borderRadius: innerSize * 0.03,
                borderWidth: 1,
                borderColor: "#D1D5DB",
                zIndex: 16,
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}
