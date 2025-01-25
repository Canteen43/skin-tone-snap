import { SkinToneInfo } from '../types/skinTone';

export const CONFIDENCE_THRESHOLD = 0.3;

export const SKIN_TONE_MAPPINGS: Record<string, string[]> = {
  'warm-autumn': ['golden', 'warm', 'autumn', 'earthy', 'bronze'],
  'cool-summer': ['rosy', 'cool', 'summer', 'pink'],
  'warm-spring': ['peach', 'coral', 'spring', 'warm-beige'],
  'cool-winter': ['blue', 'cool', 'winter', 'ash'],
  'deep-autumn': ['rich', 'deep', 'dark', 'warm-deep'],
  'bright-spring': ['clear', 'bright', 'vivid', 'warm-bright'],
  'soft-summer': ['muted', 'soft', 'dusty', 'cool-muted'],
  'deep-winter': ['intense', 'jewel', 'dark-cool', 'deep-cool']
};

export const SKIN_TONE_DATA: Record<string, SkinToneInfo> = {
  'warm-autumn': {
    tone: 'Warm Autumn',
    undertone: 'warm',
    contrast: 'medium',
    season: 'autumn',
    description: 'Your coloring combines warm undertones with the rich depth of autumn, perfect for earthy and golden hues.',
    characteristics: [
      'Warm earth tones create a harmonious look',
      'Rich autumn colors enhance your natural warmth',
      'Gold accessories complement your coloring beautifully',
      'Warm-toned makeup looks most natural'
    ],
    palette: [
      '#8B4513', // Saddle Brown
      '#DAA520', // Goldenrod
      '#228B22', // Forest Green
      '#CD853F', // Peru
      '#B8860B', // Dark Goldenrod
      '#800000', // Maroon
      '#556B2F'  // Dark Olive Green
    ],
    jewelry: {
      recommended: ['Yellow gold', 'Bronze', 'Copper', 'Tortoiseshell'],
      avoid: ['Silver', 'Platinum', 'White metals']
    }
  },
  'cool-summer': {
    tone: 'Cool Summer',
    undertone: 'cool',
    contrast: 'low',
    season: 'summer',
    description: 'Your soft, cool coloring harmonizes beautifully with muted, cool-toned pastels and gentle colors.',
    characteristics: [
      'Soft, muted colors enhance your natural beauty',
      'Pastel shades create elegant looks',
      'Cool-toned accessories look most harmonious',
      'Watercolor-like color combinations work best'
    ],
    palette: [
      '#87CEEB', // Sky Blue
      '#E6E6FA', // Lavender
      '#98FB98', // Pale Green
      '#FFB6C1', // Light Pink
      '#B0C4DE', // Light Steel Blue
      '#DDA0DD', // Plum
      '#F0F8FF'  // Alice Blue
    ],
    jewelry: {
      recommended: ['Silver', 'Platinum', 'White gold', 'Pearl'],
      avoid: ['Yellow gold', 'Copper', 'Bronze']
    }
  },
  'warm-spring': {
    tone: 'Warm Spring',
    undertone: 'warm',
    contrast: 'medium',
    season: 'spring',
    description: 'Your warm, clear coloring shines in fresh, bright colors with golden undertones.',
    characteristics: [
      'Clear, warm colors create vibrant looks',
      'Light to medium intensity colors work best',
      'Golden accessories enhance your natural glow',
      'Warm coral and peach tones are particularly flattering'
    ],
    palette: [
      '#FF69B4', // Hot Pink
      '#4169E1', // Royal Blue
      '#32CD32', // Lime Green
      '#FF8C00', // Dark Orange
      '#BA55D3', // Medium Orchid
      '#20B2AA', // Light Sea Green
      '#FFD700'  // Gold
    ],
    jewelry: {
      recommended: ['Yellow gold', 'Rose gold', 'Coral', 'Amber'],
      avoid: ['Platinum', 'Cool metals']
    }
  },
  'cool-winter': {
    tone: 'Cool Winter',
    undertone: 'cool',
    contrast: 'high',
    season: 'winter',
    description: 'Your high-contrast, cool coloring creates dramatic looks with pure, vivid colors.',
    characteristics: [
      'Pure, clear colors create striking looks',
      'High contrast combinations are stunning',
      'Cool-toned jewel colors are particularly flattering',
      'Dramatic color blocking works beautifully'
    ],
    palette: [
      '#FF0000', // Red
      '#000080', // Navy
      '#008000', // Green
      '#4B0082', // Indigo
      '#800080', // Purple
      '#008B8B', // Teal
      '#FFFFFF'  // White
    ],
    jewelry: {
      recommended: ['Silver', 'White gold', 'Platinum', 'Diamond'],
      avoid: ['Yellow gold', 'Copper', 'Bronze']
    }
  },
  'deep-autumn': {
    tone: 'Deep Autumn',
    undertone: 'warm',
    contrast: 'high',
    season: 'autumn',
    description: 'Your rich coloring pairs beautifully with deep, warm tones and dramatic earth colors.',
    characteristics: [
      'Rich, warm colors create sophisticated looks',
      'Deep earth tones enhance your natural depth',
      'Dramatic color combinations work well',
      'Warm metallic accessories look stunning'
    ],
    palette: [
      '#800000', // Maroon
      '#8B4513', // Saddle Brown
      '#556B2F', // Dark Olive Green
      '#B8860B', // Dark Goldenrod
      '#A0522D', // Sienna
      '#6B4423', // Brown
      '#8B0000'  // Dark Red
    ],
    jewelry: {
      recommended: ['Bronze', 'Copper', 'Antiqued gold', 'Tortoiseshell'],
      avoid: ['Silver', 'Platinum', 'Light metals']
    }
  },
  'bright-spring': {
    tone: 'Bright Spring',
    undertone: 'warm',
    contrast: 'high',
    season: 'spring',
    description: 'Your clear, warm coloring comes alive in bright, pure colors with a golden undertone.',
    characteristics: [
      'Bright, clear colors create energetic looks',
      'High contrast combinations are dynamic',
      'Warm-bright colors enhance your natural vibrancy',
      'Bold color blocking works beautifully'
    ],
    palette: [
      '#FF4500', // Orange Red
      '#FFD700', // Gold
      '#00FF00', // Lime
      '#FF1493', // Deep Pink
      '#FFA500', // Orange
      '#00CED1', // Dark Turquoise
      '#FFFF00'  // Yellow
    ],
    jewelry: {
      recommended: ['Polished gold', 'Bright copper', 'Coral', 'Amber'],
      avoid: ['Oxidized metals', 'Muted finishes']
    }
  },
  'soft-summer': {
    tone: 'Soft Summer',
    undertone: 'cool',
    contrast: 'low',
    season: 'summer',
    description: 'Your gentle, cool coloring harmonizes with soft, muted colors with a slight grey undertone.',
    characteristics: [
      'Soft, muted colors create elegant looks',
      'Gentle color combinations work best',
      'Cool pastels enhance your natural softness',
      'Watercolor-like palettes are ideal'
    ],
    palette: [
      '#B0C4DE', // Light Steel Blue
      '#D8BFD8', // Thistle
      '#98FB98', // Pale Green
      '#DEB887', // Burlywood
      '#BC8F8F', // Rosy Brown
      '#87CEEB', // Sky Blue
      '#E6E6FA'  // Lavender
    ],
    jewelry: {
      recommended: ['Brushed silver', 'Pearl', 'Rose quartz', 'Moonstone'],
      avoid: ['Yellow gold', 'Bright metals']
    }
  },
  'deep-winter': {
    tone: 'Deep Winter',
    undertone: 'cool',
    contrast: 'high',
    season: 'winter',
    description: 'Your deep, cool coloring creates dramatic looks with jewel tones and intense colors.',
    characteristics: [
      'Jewel tones create stunning looks',
      'High contrast combinations are dramatic',
      'Deep, cool colors enhance your natural depth',
      'Bold color blocking is particularly effective'
    ],
    palette: [
      '#4B0082', // Indigo
      '#800080', // Purple
      '#DC143C', // Crimson
      '#006400', // Dark Green
      '#B22222', // Fire Brick
      '#483D8B', // Dark Slate Blue
      '#8B008B'  // Dark Magenta
    ],
    jewelry: {
      recommended: ['White gold', 'Platinum', 'Silver', 'Dark stones'],
      avoid: ['Yellow gold', 'Light colored stones']
    }
  }
};