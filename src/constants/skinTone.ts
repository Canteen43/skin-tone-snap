import { SkinToneInfo } from '../types/skinTone';

export const CONFIDENCE_THRESHOLD = 0.3;

export const SKIN_TONE_MAPPINGS: Record<string, string[]> = {
  fair: ['light', 'pale', 'fair', 'porcelain', 'ivory'],
  light: ['beige', 'cream', 'neutral'],
  medium: ['tan', 'medium', 'natural'],
  olive: ['olive', 'golden', 'warm'],
  deep: ['dark', 'deep', 'rich', 'ebony', 'mahogany']
};

export const SKIN_TONE_DATA: Record<string, SkinToneInfo> = {
  fair: {
    tone: 'Fair',
    undertone: 'cool',
    contrast: 'high',
    season: 'summer',
    description: 'Fair skin typically burns easily and has visible veins. The complexion is often described as porcelain or ivory.',
    characteristics: [
      'Burns easily, rarely tans',
      'Visible veins with blue/purple undertones',
      'Freckles may be present',
      'Often accompanied by light eyes'
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
  light: {
    tone: 'Light',
    undertone: 'neutral',
    contrast: 'medium',
    season: 'spring',
    description: 'Light skin has both warm and cool undertones, offering versatility in color choices. This skin type can gradually tan.',
    characteristics: [
      'Sometimes burns, gradually tans',
      'Neutral undertones',
      'Natural flush may be present',
      'Versatile with most colors'
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
      recommended: ['Mixed metals', 'Rose gold', 'Sterling silver'],
      avoid: ['Overly oxidized metals']
    }
  },
  medium: {
    tone: 'Medium',
    undertone: 'warm',
    contrast: 'medium',
    season: 'autumn',
    description: 'Medium skin tones typically have warm or neutral undertones and tan easily. This versatile skin type works well with earth tones.',
    characteristics: [
      'Tans easily',
      'Warm golden undertones',
      'Even complexion',
      'Rarely burns'
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
      recommended: ['Yellow gold', 'Rose gold', 'Copper', 'Bronze'],
      avoid: ['Platinum', 'White metals']
    }
  },
  olive: {
    tone: 'Olive',
    undertone: 'warm',
    contrast: 'low',
    season: 'autumn',
    description: 'Olive skin has distinct green or golden undertones and tans very easily. This skin type looks particularly striking in jewel tones.',
    characteristics: [
      'Tans very easily, rarely burns',
      'Green or golden undertones',
      'Mediterranean or Asian heritage common',
      'Looks great in jewel tones'
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
      recommended: ['Yellow gold', 'Bronze', 'Copper'],
      avoid: ['Silver', 'Platinum']
    }
  },
  deep: {
    tone: 'Deep',
    undertone: 'neutral',
    contrast: 'high',
    season: 'winter',
    description: 'Deep skin tones have rich, warm undertones and natural sun protection. This skin type looks stunning in bright, vibrant colors.',
    characteristics: [
      'Never burns',
      'Rich, warm undertones',
      'Natural sun protection',
      'Looks amazing in bright colors'
    ],
    palette: [
      '#FF0000', // Red
      '#FFD700', // Gold
      '#00FF00', // Lime
      '#FF4500', // Orange Red
      '#00FFFF', // Cyan
      '#FF1493', // Deep Pink
      '#FFFF00'  // Yellow
    ],
    jewelry: {
      recommended: ['Yellow gold', 'Rose gold', 'Bright metals'],
      avoid: ['Pale metals', 'Oxidized silver']
    }
  }
};