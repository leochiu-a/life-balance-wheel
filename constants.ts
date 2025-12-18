import { CategoryBase, Locale } from './types';

export const DEFAULT_LOCALE: Locale = 'en';

export const LANGUAGE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};

export const CATEGORY_LABELS: Record<string, Record<Locale, string>> = {
  body: { en: 'Body', zh: '身體' },
  mind: { en: 'Mind', zh: '心智' },
  soul: { en: 'Soul', zh: '心靈' },
  fun: { en: 'Fun', zh: '玩樂' },
  romance: { en: 'Romance', zh: '親密關係' },
  family: { en: 'Family', zh: '家庭' },
  friends: { en: 'Friends', zh: '朋友' },
  growth: { en: 'Growth', zh: '成長' },
  money: { en: 'Money', zh: '財務' },
  mission: { en: 'Mission', zh: '使命' },
};

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

export type CategoryInfo = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const CATEGORY_INFO: Record<string, CategoryInfo> = {
  mission: {
    title: { zh: 'Mission（使命／人生目標）', en: 'Mission (Purpose / Direction)' },
    description: {
      zh: '你是否清楚自己的人生方向？\n是否覺得現在做的事與你的價值觀、長期目標一致。',
      en: 'Do you have a clear direction for your life?\nDo your current actions feel aligned with your values and long-term goals?',
    },
  },
  body: {
    title: { zh: 'Body（身體／健康）', en: 'Body (Health / Energy)' },
    description: {
      zh: '身體健康、體能、作息、飲食、睡眠。\n包含是否有運動習慣、精力是否充沛。',
      en: 'Physical health, fitness, routines, diet, and sleep.\nIncludes exercise habits and whether you feel energized.',
    },
  },
  mind: {
    title: { zh: 'Mind（心智／學習）', en: 'Mind (Learning / Mental Strength)' },
    description: {
      zh: '思考品質、專注力、學習與成長、心理韌性。\n是否持續學新東西、能管理壓力與情緒。',
      en: 'Quality of thinking, focus, learning, and resilience.\nAre you learning consistently and managing stress and emotions well?',
    },
  },
  soul: {
    title: { zh: 'Soul（心靈／內在）', en: 'Soul (Inner Peace / Meaning)' },
    description: {
      zh: '內在平靜、意義感、信念、精神層面（不一定是宗教）。\n是否覺得內心踏實、與自己連結。',
      en: "Inner peace, meaning, beliefs, and spirituality (not necessarily religion).\nDo you feel grounded and connected to yourself?",
    },
  },
  fun: {
    title: { zh: 'Fun（玩樂／休閒）', en: 'Fun (Leisure / Enjoyment)' },
    description: {
      zh: '生活中的樂趣、放鬆、興趣、娛樂。\n是否允許自己享受生活，而不只有責任。',
      en: 'Joy, relaxation, hobbies, and entertainment.\nDo you allow yourself to enjoy life—not just responsibilities?',
    },
  },
  romance: {
    title: { zh: 'Romance（親密關係／愛情）', en: 'Romance (Intimacy / Partnership)' },
    description: {
      zh: '伴侶關係或親密連結的品質。\n包含溝通、信任、陪伴與情感滿足。',
      en: 'Quality of your romantic or intimate connection.\nIncludes communication, trust, companionship, and emotional fulfillment.',
    },
  },
  family: {
    title: { zh: 'Family（家庭）', en: 'Family' },
    description: {
      zh: '與原生家庭或自己建立的家庭的關係。\n支持感、互動品質、責任平衡。',
      en: 'Your relationship with your family of origin or the family you build.\nSupport, connection quality, and balanced responsibilities.',
    },
  },
  friends: {
    title: { zh: 'Friends（朋友／社交）', en: 'Friends (Social Life)' },
    description: {
      zh: '朋友圈的深度與廣度。\n是否有能互相支持、真誠相處的人際關係。',
      en: 'The depth and breadth of your social circle.\nDo you have honest, supportive relationships?',
    },
  },
  growth: {
    title: { zh: 'Growth（成長／自我發展）', en: 'Growth (Personal Development)' },
    description: {
      zh: '個人成長、能力提升、挑戰舒適圈。\n職涯以外，也包含人格與視野的成長。',
      en: 'Personal growth, skill-building, and stepping outside your comfort zone.\nBeyond career: character and perspective growth too.',
    },
  },
  money: {
    title: { zh: 'Money（財務）', en: 'Money (Financial Security)' },
    description: {
      zh: '收入、儲蓄、投資、安全感與金錢掌控度。\n不是單指賺多少，而是是否安心、有選擇權。',
      en: "Income, savings, investing, security, and control over money.\nNot just how much you earn—whether you feel safe and have choices.",
    },
  },
};

export const USAGE_GUIDE: Record<Locale, string[]> = {
  zh: [
    '不求平均：人生不同階段，本來就會有側重',
    '找落差：最低分的象限通常是壓力來源',
    '小幅調整：每次選 1–2 個象限，設定可行的小行動',
  ],
  en: [
    'No need to be even: different seasons of life have different priorities',
    'Look for gaps: the lowest area is often where stress comes from',
    'Make small shifts: pick 1–2 areas and set small, doable actions',
  ],
};

export const UI_TEXT: Record<
  | 'title'
  | 'subtitle'
  | 'save'
  | 'copy'
  | 'copied'
  | 'tip'
  | 'copyUnsupported',
  Record<Locale, string>
> = {
  title: {
    en: 'Life Balance Wheel',
    zh: '人生平衡輪',
  },
  subtitle: {
    en: 'How is your life going? Drag the slices to reflect your current state.',
    zh: '你的生活過得怎麼樣？拖拉輪盤的切片，畫出現在的狀態。',
  },
  save: { en: 'Save', zh: '下載圖片' },
  copy: { en: 'Copy', zh: '複製圖片' },
  copied: { en: 'Copied! ✨', zh: '已複製！✨' },
  tip: {
    en: 'Tip: Click and drag on the wheel to paint your life balance.',
    zh: '提示：點擊並拖曳輪盤，就能畫出你的生活平衡。',
  },
  copyUnsupported: {
    en: "Browser doesn't support direct image copy. Please use Download instead.",
    zh: '瀏覽器不支援直接複製圖片，請改用下載。',
  },
};
