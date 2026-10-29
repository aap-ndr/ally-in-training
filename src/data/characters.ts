// Character guides for the app
import type { Character } from "../types/game";

export const CHARACTERS: Record<string, Character> = {
  spark: {
    id: "spark",
    name: "Spark",
    description: "Your energetic ADHD guide who loves adventure and discovering new things!",
    color: "#F59E0B",
    focus: "ADHD traits, hyperfocus, time blindness, and energy management",
  },
  wave: {
    id: "wave",
    name: "Wave",
    description: "Your logical autism guide who appreciates patterns and clear communication!",
    color: "#3B82F6",
    focus: "Autism traits, communication styles, routines, and special interests",
  },
  echo: {
    id: "echo",
    name: "Echo",
    description: "Your sensory guide who understands how the world feels, sounds, and looks!",
    color: "#8B5CF6",
    focus: "Sensory processing, overstimulation, seeking vs avoiding",
  },
  flux: {
    id: "flux",
    name: "Flux",
    description: "Your organized executive function mentor who helps with planning and tasks!",
    color: "#10B981",
    focus: "Executive function, organization, planning, and task management",
  },
  page: {
    id: "page",
    name: "Story",
    description: "Your creative dyslexia guide who sees words and ideas in unique and innovative ways!",
    color: "#14B8A6",
    focus: "Dyslexia, reading differences, creative thinking, and learning strategies",
  },
};
