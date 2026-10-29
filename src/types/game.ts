// Core game types for the neurodiversity education app

export type CharacterType = "spark" | "wave" | "echo" | "flux" | "page";

export interface Character {
  id: CharacterType;
  name: string;
  description: string;
  color: string;
  focus: string;
}

export type WorldType =
  | "autism-awareness"
  | "adhd-adventure"
  | "sensory-world"
  | "communication-forest"
  | "executive-function"
  | "strengths-arena"
  | "dyslexia-discovery"
  | "tourettes-world"
  | "down-syndrome-world";

export interface World {
  id: WorldType;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number; // 0-100
  lessons: Lesson[];
}

export type LessonType =
  | "scenario"
  | "sorting"
  | "matching"
  | "animation"
  | "quiz";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  worldId: WorldType;
  xpReward: number;
  completed: boolean;
  unlocked: boolean;
  content: LessonContent;
}

export interface LessonContent {
  scenario?: ScenarioContent;
  sorting?: SortingContent;
  matching?: MatchingContent;
  quiz?: QuizContent;
}

export interface ScenarioContent {
  situation: string;
  question: string;
  choices: Choice[];
  correctChoice: number;
  explanation: string;
}

export interface Choice {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface SortingContent {
  instruction: string;
  items: SortItem[];
  categories: string[];
}

export interface SortItem {
  id: string;
  text: string;
  correctCategory: string;
}

export interface MatchingContent {
  instruction: string;
  pairs: MatchPair[];
}

export interface MatchPair {
  left: string;
  right: string;
  matched: boolean;
}

export interface QuizContent {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type CardCategory = "adhd" | "autism" | "sensory" | "communication" | "executive" | "shared";

export interface CardQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ConceptCard {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CardCategory;
  categories?: CardCategory[]; // For cards that span multiple conditions
  unlocked: boolean;
  dateUnlocked?: string;
  quizQuestion?: CardQuizQuestion; // Quiz question for testing knowledge
}

export interface SideQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: "identify-strength" | "sensory-choices" | "communication-style";
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  dateEarned?: string;
}

export interface DailyBite {
  id: string;
  title: string;
  type: "story" | "scenario" | "quiz" | "mini-game";
  duration: number; // seconds
  xpReward: number;
  completed: boolean;
  date: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;
  title: string;
  userName?: string;
  avatarCustomization: AvatarCustomization;
  completedLessons: string[];
  completedQuests: string[];
  earnedBadges: string[];
  unlockedCards: string[];
  empathyPoints: number;
}

export interface AvatarCustomization {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  accessory?: string;
  backgroundColor?: string;
}

export interface CharacterAvatar {
  characterId: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
}
