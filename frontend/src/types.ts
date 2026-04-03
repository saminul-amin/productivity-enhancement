export interface ScoreEntry {
  month: string;
  date: string;
  day: string;
  score: number;
}

export interface AllUserData {
  [key: string]: ScoreEntry[];
}

export interface TopScorer {
  name: string;
  total: number;
  avg: string;
  count: number;
}

export interface LeaderboardEntry {
  name: string;
  total: number;
  avg: string;
  count: number;
  highest: ScoreEntry;
  lowest: ScoreEntry;
  rank: number;
}

export interface CombinedEntry {
  month: string;
  date: string;
  day: string;
  productivity: number;
  islamic: number;
  sleep: number;
}
