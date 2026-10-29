import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  UserProgress,
  World,
  ConceptCard,
  SideQuest,
  Badge,
  DailyBite,
  CharacterType,
} from "../types/game";
import { getInitialWorlds } from "../data/worlds";
import { getInitialCards } from "../data/cards";
import { getInitialQuests } from "../data/quests";
import { getInitialBadges } from "../data/badges";

// Helper to merge new worlds with persisted worlds.
// Always takes fresh content (text, explanations, feedback) but preserves user progress (completed, unlocked).
const mergeWorlds = (persistedWorlds: World[], freshWorlds: World[]): World[] => {
  const persistedWorldMap = new Map(persistedWorlds.map(w => [w.id, w]));

  return freshWorlds.map(freshWorld => {
    const persistedWorld = persistedWorldMap.get(freshWorld.id);
    if (!persistedWorld) return freshWorld;

    const persistedLessonMap = new Map(persistedWorld.lessons.map(l => [l.id, l]));

    return {
      ...freshWorld,
      progress: persistedWorld.progress,
      unlocked: persistedWorld.unlocked,
      lessons: freshWorld.lessons.map(freshLesson => {
        const persistedLesson = persistedLessonMap.get(freshLesson.id);
        if (!persistedLesson) return freshLesson;
        // Always use fresh content (text, explanations, tips), only preserve completion state
        return {
          ...freshLesson,
          completed: persistedLesson.completed,
          unlocked: persistedLesson.unlocked,
        };
      }),
    };
  });
};

// Helper to merge new cards with persisted cards
const mergeCards = (persistedCards: ConceptCard[], freshCards: ConceptCard[]): ConceptCard[] => {
  const persistedCardIds = new Set(persistedCards.map(c => c.id));
  const newCards = freshCards.filter(c => !persistedCardIds.has(c.id));
  return newCards.length > 0 ? [...newCards, ...persistedCards] : persistedCards;
};

// Helper to merge new quests with persisted quests
const mergeQuests = (persistedQuests: SideQuest[], freshQuests: SideQuest[]): SideQuest[] => {
  const persistedQuestIds = new Set(persistedQuests.map(q => q.id));
  const newQuests = freshQuests.filter(q => !persistedQuestIds.has(q.id));
  return newQuests.length > 0 ? [...newQuests, ...persistedQuests] : persistedQuests;
};

export interface AmbassadorInfo {
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
}

interface GameState {
  // User progress (persisted)
  userProgress: UserProgress;

  // Selected guide character
  selectedGuide: CharacterType | null;

  // Has user seen the quick tour
  hasSeenTour: boolean;

  // True until the user has opened the dashboard at least once after the tour
  isFirstLaunch: boolean;

  // Ambassador / movement tracking
  hasJoinedMovement: boolean;
  ambassadorInfo: AmbassadorInfo | null;

  // Share tracking
  hasShared: boolean;

  // Game content (persisted to track completion)
  worlds: World[];
  conceptCards: ConceptCard[];
  sideQuests: SideQuest[];
  badges: Badge[];
  dailyBites: DailyBite[];

  // Actions
  completeLesson: (lessonId: string, xpEarned: number) => void;
  completeQuest: (questId: string) => void;
  earnBadge: (badgeId: string) => void;
  unlockCard: (cardId: string) => void;
  updateStreak: () => void;
  addXP: (amount: number) => void;
  updateAvatarCustomization: (customization: Partial<UserProgress["avatarCustomization"]>) => void;
  completeDailyBite: (biteId: string) => void;
  checkBadges: (xp: number, level: number) => void;
  selectGuide: (guideId: CharacterType) => void;
  markTourComplete: () => void;
  markFirstLaunchComplete: () => void;
  setUserName: (name: string) => void;
  setJoinedMovement: (info: AmbassadorInfo) => void;
  markShared: () => void;
  resetProgress: () => void;
}

const TITLES = [
  "Ally in Training™",
  "Rising Star",
  "Understanding Learner",
  "Empathy Explorer",
  "Insight Seeker",
  "Knowledge Keeper",
  "Compassion Warrior",
  "Neurodiversity Navigator",
  "Empathy Champion",
  "Inclusion Master"
];

const LEVEL_NAMES: Record<number, string> = {
  1: "Level 1 • Rising Star!",
  2: "Level 2 • Curious Mind",
  3: "Level 3 • Quick Learner",
  4: "Level 4 • Knowledge Seeker",
  5: "Level 5 • Insight Builder",
  6: "Level 6 • Empathy Explorer",
  7: "Level 7 • Understanding Ally",
  8: "Level 8 • Compassion Guide",
  9: "Level 9 • Wisdom Keeper",
  10: "Level 10 • Navigator Pro",
  11: "Level 11 • Champion Rising",
  12: "Level 12 • Master Learner",
  13: "Level 13 • Inclusion Expert",
  14: "Level 14 • Diversity Advocate",
  15: "Level 15 • Legendary Ally",
};

const getTitle = (level: number): string => {
  if (level < 2) return TITLES[0];
  if (level < 3) return TITLES[1];
  if (level < 5) return TITLES[2];
  if (level < 7) return TITLES[3];
  if (level < 9) return TITLES[4];
  if (level < 11) return TITLES[5];
  if (level < 13) return TITLES[6];
  if (level < 15) return TITLES[7];
  if (level < 17) return TITLES[8];
  return TITLES[9];
};

const getLevelName = (level: number): string => {
  if (level <= 15) return LEVEL_NAMES[level] || `Level ${level}`;
  return `Level ${level} • Legendary Ally`;
};

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isConsecutiveDay = (date1: Date, date2: Date): boolean => {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diff = date2.getTime() - date1.getTime();
  return diff >= oneDayMs && diff < 2 * oneDayMs;
};

const initialUserProgress: UserProgress = {
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastPlayedDate: new Date().toISOString(),
  title: TITLES[0],
  avatarCustomization: {
    skinTone: "#E8B896",
    hairStyle: "medium",
    hairColor: "#4A3728",
    accessory: undefined,
  },
  completedLessons: [],
  completedQuests: [],
  earnedBadges: [],
  unlockedCards: [],
  empathyPoints: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userProgress: initialUserProgress,
      selectedGuide: null,
      hasSeenTour: false,
      isFirstLaunch: true,
      hasJoinedMovement: false,
      ambassadorInfo: null,
      hasShared: false,
      worlds: getInitialWorlds(),
      conceptCards: getInitialCards(),
      sideQuests: getInitialQuests(),
      badges: getInitialBadges(),
      dailyBites: [],

      completeLesson: (lessonId: string, xpEarned: number) => {
        const state = get();
        const progress = state.userProgress;

        if (progress.completedLessons.includes(lessonId)) {
          return; // Already completed
        }

        const newXP = progress.xp + xpEarned;
        const newLevel = calculateLevel(newXP);
        const newEmpathy = progress.empathyPoints + 1;
        const newCompletedLessons = [...progress.completedLessons, lessonId];

        set({
          userProgress: {
            ...progress,
            xp: newXP,
            level: newLevel,
            title: getTitle(newLevel),
            empathyPoints: newEmpathy,
            completedLessons: newCompletedLessons,
          },
          worlds: state.worlds.map(world => {
            const worldLessons = world.lessons.filter(l => l.worldId === world.id);
            const completedInWorld = worldLessons.filter(l =>
              newCompletedLessons.includes(l.id)
            ).length;

            return {
              ...world,
              progress: (completedInWorld / worldLessons.length) * 100,
              lessons: world.lessons.map(l =>
                l.id === lessonId ? { ...l, completed: true } : l
              ),
            };
          }),
        });

        // Unlock a card every 2 lessons
        if (newCompletedLessons.length % 2 === 0) {
          const lockedCards = state.conceptCards.filter(c => !c.unlocked && !progress.unlockedCards.includes(c.id));
          if (lockedCards.length > 0) {
            const cardToUnlock = lockedCards[Math.floor(Math.random() * lockedCards.length)];
            get().unlockCard(cardToUnlock.id);
          }
        }

        // Update streak when completing a lesson
        get().updateStreak();

        // Check for badge eligibility
        get().checkBadges(newXP, newLevel);
      },

      completeQuest: (questId: string) => {
        const state = get();
        const quest = state.sideQuests.find(q => q.id === questId);

        if (!quest || state.userProgress.completedQuests.includes(questId)) {
          return;
        }

        set({
          userProgress: {
            ...state.userProgress,
            xp: state.userProgress.xp + quest.xpReward,
            completedQuests: [...state.userProgress.completedQuests, questId],
          },
          sideQuests: state.sideQuests.map(q =>
            q.id === questId ? { ...q, completed: true } : q
          ),
        });
      },

      earnBadge: (badgeId: string) => {
        const state = get();

        if (state.userProgress.earnedBadges.includes(badgeId)) {
          return;
        }

        set({
          userProgress: {
            ...state.userProgress,
            earnedBadges: [...state.userProgress.earnedBadges, badgeId],
          },
          badges: state.badges.map(b =>
            b.id === badgeId
              ? { ...b, earned: true, dateEarned: new Date().toISOString() }
              : b
          ),
        });
      },

      unlockCard: (cardId: string) => {
        const state = get();

        if (state.userProgress.unlockedCards.includes(cardId)) {
          return;
        }

        set({
          userProgress: {
            ...state.userProgress,
            unlockedCards: [...state.userProgress.unlockedCards, cardId],
          },
          conceptCards: state.conceptCards.map(c =>
            c.id === cardId
              ? { ...c, unlocked: true, dateUnlocked: new Date().toISOString() }
              : c
          ),
        });
      },

      updateStreak: () => {
        const state = get();
        const now = new Date();
        const lastPlayed = new Date(state.userProgress.lastPlayedDate);

        let newStreak = state.userProgress.currentStreak;

        if (isSameDay(now, lastPlayed)) {
          // Same day - if streak is 0, set to 1 (first activity today)
          if (newStreak === 0) {
            newStreak = 1;
          } else {
            // Already counted for today, no change
            return;
          }
        } else if (isConsecutiveDay(lastPlayed, now)) {
          // Consecutive day
          newStreak += 1;
        } else {
          // Streak broken or first time - start fresh at 1
          newStreak = 1;
        }

        set({
          userProgress: {
            ...state.userProgress,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, state.userProgress.longestStreak),
            lastPlayedDate: now.toISOString(),
          },
        });
      },

      addXP: (amount: number) => {
        const state = get();
        const newXP = state.userProgress.xp + amount;
        const newLevel = calculateLevel(newXP);

        set({
          userProgress: {
            ...state.userProgress,
            xp: newXP,
            level: newLevel,
            title: getTitle(newLevel),
          },
        });
      },

      updateAvatarCustomization: (customization) => {
        const state = get();
        set({
          userProgress: {
            ...state.userProgress,
            avatarCustomization: {
              ...state.userProgress.avatarCustomization,
              ...customization,
            },
          },
        });
      },

      completeDailyBite: (biteId: string) => {
        const state = get();
        const bite = state.dailyBites.find(b => b.id === biteId);

        if (!bite || bite.completed) {
          return;
        }

        set({
          dailyBites: state.dailyBites.map(b =>
            b.id === biteId ? { ...b, completed: true } : b
          ),
        });

        get().addXP(bite.xpReward);
      },

      checkBadges: (xp: number, level: number) => {
        const state = get();

        // First lesson badge
        if (state.userProgress.completedLessons.length === 1) {
          get().earnBadge("first-lesson");
        }

        // Streak badges
        if (state.userProgress.currentStreak === 7) {
          get().earnBadge("week-streak");
        }

        // Level badges
        if (level === 5) {
          get().earnBadge("level-5");
        }
      },

      selectGuide: (guideId: CharacterType) => {
        set({ selectedGuide: guideId });
      },

      markTourComplete: () => {
        set({ hasSeenTour: true });
      },

      markFirstLaunchComplete: () => {
        set({ isFirstLaunch: false });
      },

      setJoinedMovement: (info: AmbassadorInfo) => {
        set({ hasJoinedMovement: true, ambassadorInfo: info });
      },

      markShared: () => {
        const state = get();
        if (!state.hasShared) {
          set({ hasShared: true });
          get().addXP(25);
        }
      },

      setUserName: (name: string) => {
        const state = get();
        set({
          userProgress: {
            ...state.userProgress,
            userName: name,
          },
        });
      },

      resetProgress: () => {
        set({
          userProgress: initialUserProgress,
          worlds: getInitialWorlds(),
          conceptCards: getInitialCards(),
          sideQuests: getInitialQuests(),
          badges: getInitialBadges(),
          dailyBites: [],
        });
      },
    }),
    {
      name: "game-storage",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<GameState>;
        const freshWorlds = getInitialWorlds();
        const freshCards = getInitialCards();
        const freshQuests = getInitialQuests();

        return {
          ...currentState,
          ...persisted,
          // Merge new content with persisted content
          worlds: persisted.worlds ? mergeWorlds(persisted.worlds, freshWorlds) : freshWorlds,
          conceptCards: persisted.conceptCards ? mergeCards(persisted.conceptCards, freshCards) : freshCards,
          sideQuests: persisted.sideQuests ? mergeQuests(persisted.sideQuests, freshQuests) : freshQuests,
        };
      },
    }
  )
);

// Selectors
export const useUserProgress = () => useGameStore((s) => s.userProgress);
export const useXP = () => useGameStore((s) => s.userProgress.xp);
export const useLevel = () => useGameStore((s) => s.userProgress.level);
export const useStreak = () => useGameStore((s) => s.userProgress.currentStreak);
export const useTitle = () => useGameStore((s) => s.userProgress.title);
export const useWorlds = () => useGameStore((s) => s.worlds);
export const useCards = () => useGameStore((s) => s.conceptCards);
export const useQuests = () => useGameStore((s) => s.sideQuests);
export const useBadges = () => useGameStore((s) => s.badges);
export const useSelectedGuide = () => useGameStore((s) => s.selectedGuide);
export const useHasSeenTour = () => useGameStore((s) => s.hasSeenTour);
export const useIsFirstLaunch = () => useGameStore((s) => s.isFirstLaunch);
export const useUserName = () => useGameStore((s) => s.userProgress.userName);
export const useHasJoinedMovement = () => useGameStore((s) => s.hasJoinedMovement);
export const useHasShared = () => useGameStore((s) => s.hasShared);
export const useAmbassadorInfo = () => useGameStore((s) => s.ambassadorInfo);
export const useLevelName = () => {
  const level = useGameStore((s) => s.userProgress.level);
  return getLevelName(level);
};
