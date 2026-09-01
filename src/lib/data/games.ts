export interface Game {
  slug: string;
  name: string;
  description: string;
  category: string;
}

export const games: Game[] = [
  { slug: "typing-speed", name: "Typing Speed", description: "Test and improve your typing speed.", category: "skill" },
  { slug: "reaction-time", name: "Reaction Time", description: "Measure your reflexes and reaction speed.", category: "skill" },
  { slug: "memory", name: "Memory Game", description: "Challenge your memory with card matching.", category: "skill" },
];
