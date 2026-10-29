import type { Badge } from "../types/game";

export const getInitialBadges = (): Badge[] => {
  return [
    {
      id: "first-lesson",
      name: "First Steps",
      description: "Complete your first lesson",
      icon: "footprints",
      earned: false,
    },
    {
      id: "week-streak",
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "flame",
      earned: false,
    },
    {
      id: "month-streak",
      name: "Monthly Master",
      description: "Maintain a 30-day streak",
      icon: "calendar",
      earned: false,
    },
    {
      id: "level-5",
      name: "Rising Star",
      description: "Reach level 5",
      icon: "star",
      earned: false,
    },
    {
      id: "level-10",
      name: "Empathy Expert",
      description: "Reach level 10",
      icon: "heart",
      earned: false,
    },
    {
      id: "all-worlds",
      name: "World Traveler",
      description: "Complete lessons in all 6 worlds",
      icon: "globe",
      earned: false,
    },
    {
      id: "card-collector",
      name: "Card Collector",
      description: "Unlock 10 concept cards",
      icon: "layers",
      earned: false,
    },
    {
      id: "quest-master",
      name: "Quest Master",
      description: "Complete 5 side quests",
      icon: "target",
      earned: false,
    },
    {
      id: "compassion-badge",
      name: "Compassion Champion",
      description: "Show understanding in 20 lessons",
      icon: "heart-handshake",
      earned: false,
    },
    {
      id: "myth-buster",
      name: "Myth Buster",
      description: "Correctly identify myths vs facts in sorting games",
      icon: "shield-check",
      earned: false,
    },
    {
      id: "sensory-solver",
      name: "Sensory Solver",
      description: "Complete all sensory world lessons",
      icon: "brain",
      earned: false,
    },
  ];
};
