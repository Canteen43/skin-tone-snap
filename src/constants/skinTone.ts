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
    description: 'Fair skin typically has cool undertones, making it ideal for soft, muted colors that complement rather than overwhelm.',
    characteristics: [
      'Looks stunning in soft, cool-toned pastels',
      'Can wear icy colors beautifully',
      'High contrast allows for dramatic color combinations',
      'Muted colors are more flattering than very bright ones'
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
    description: 'Light skin with neutral undertones offers versatility in color choices, working well with both warm and cool tones.',
    characteristics: [
      'Can balance both warm and cool colors effectively',
      'Medium contrast allows for versatile color combinations',
      'Looks great in clear, bright colors',
      'Can experiment with both pastel and medium-intensity shades'
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
    description: 'Medium skin with warm undertones harmonizes beautifully with earth tones and rich, warm colors.',
    characteristics: [
      'Earth tones create a natural, harmonious look',
      'Rich autumn colors enhance natural warmth',
      'Can wear both muted and clear colors confidently',
      'Warm-toned accessories create a cohesive look'
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
    description: 'Olive skin with its warm undertones pairs exceptionally well with rich jewel tones and earthy colors.',
    characteristics: [
      'Jewel tones create striking, sophisticated looks',
      'Earth tones complement natural warmth beautifully',
      'Can wear deep, rich colors with confidence',
      'Monochromatic looks work well with low contrast'
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
    description: 'Deep skin tones create a perfect canvas for bold, vibrant colors and dramatic contrasts.',
    characteristics: [
      'Vibrant colors create stunning visual impact',
      'High contrast allows for dramatic color combinations',
      'Can wear pure, bright colors confidently',
      'Bold color blocking creates sophisticated looks'
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