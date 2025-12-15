import { Category } from './types';

export const INITIAL_DATA: Category[] = [
  { id: 'body', label: 'Body', value: 5, color: '#86efac', group: 'Health' },     // Green
  { id: 'mind', label: 'Mind', value: 6, color: '#4ade80', group: 'Health' },     // Green
  { id: 'soul', label: 'Soul', value: 4, color: '#22c55e', group: 'Health' },     // Green
  { id: 'fun', label: 'Fun', value: 7, color: '#facc15', group: 'Fun' },          // Yellow
  { id: 'romance', label: 'Romance', value: 5, color: '#fdba74', group: 'Rel' },  // Orange
  { id: 'family', label: 'Family', value: 8, color: '#ea580c', group: 'Rel' },    // Burnt Orange
  { id: 'friends', label: 'Friends', value: 6, color: '#94a3b8', group: 'Rel' },  // Slate/Blueish
  { id: 'growth', label: 'Growth', value: 4, color: '#60a5fa', group: 'Work' },   // Blue
  { id: 'money', label: 'Money', value: 5, color: '#3b82f6', group: 'Work' },     // Blue
  { id: 'mission', label: 'Mission', value: 6, color: '#2563eb', group: 'Work' },  // Blue
];

export const CHART_SIZE = 600;
export const MAX_VALUE = 10;
