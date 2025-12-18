export interface Category {
  id: string;
  label: string;
  value: number; // 1-10
  color: string;
  group: string;
}

export interface Point {
  x: number;
  y: number;
}

export type Locale = 'en' | 'zh-tw';

export type CategoryBase = Omit<Category, 'label'>;
