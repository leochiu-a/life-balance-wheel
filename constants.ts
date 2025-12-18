import { CategoryBase, Locale } from './types';

export const DEFAULT_LOCALE: Locale = 'en';

export const INITIAL_DATA: CategoryBase[] = [
  { id: 'body', value: 5, color: '#86efac', group: 'Health' },     // Green
  { id: 'mind', value: 6, color: '#4ade80', group: 'Health' },     // Green
  { id: 'soul', value: 4, color: '#22c55e', group: 'Health' },     // Green
  { id: 'fun', value: 7, color: '#facc15', group: 'Fun' },         // Yellow
  { id: 'romance', value: 5, color: '#fdba74', group: 'Rel' },     // Orange
  { id: 'family', value: 8, color: '#ea580c', group: 'Rel' },      // Burnt Orange
  { id: 'friends', value: 6, color: '#94a3b8', group: 'Rel' },     // Slate/Blueish
  { id: 'growth', value: 4, color: '#60a5fa', group: 'Work' },     // Blue
  { id: 'money', value: 5, color: '#3b82f6', group: 'Work' },      // Blue
  { id: 'mission', value: 6, color: '#2563eb', group: 'Work' },    // Blue
];

export const CHART_SIZE = 600;
export const MAX_VALUE = 10;
