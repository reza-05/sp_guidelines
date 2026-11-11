export type PatternCategory = 'all' | 'star' | 'number' | 'character' | 'hollow';
export type PatternDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface PatternItem {
  id: string;
  num: number;
  title: string;
  category: 'star' | 'number' | 'character' | 'hollow';
  difficulty: PatternDifficulty;
  description: string;
  logic: string[];
  outputPreview: string;
  code: string;
}
