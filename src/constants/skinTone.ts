import { SkinToneInfo } from '../types/skinTone';

export const CONFIDENCE_THRESHOLD = 0.3;

export const SKIN_TONE_MAPPINGS: Record<string, string[]> = {
  light: ['light', 'pale', 'porcelain', 'ivory', 'fair-light'],
  fair: ['fair', 'beige', 'cream', 'medium-light'],
  medium: ['medium', 'natural', 'neutral', 'beige-medium'],
  olive: ['olive', 'golden', 'warm-medium'],
  tan: ['tan', 'warm', 'honey', 'caramel'],
  dark: ['dark', 'rich', 'brown', 'deep-brown', 'chocolate'],
  deep: ['deep', 'ebony', 'mahogany', 'black']
};

export const UNDERTONE_MAPPINGS: Record<string, string[]> = {
  warm: ['golden', 'yellow', 'peachy', 'warm'],
  cool: ['pink', 'red', 'blue', 'cool'],
  neutral: ['neutral', 'balanced', 'beige']
};

export const SEASON_CHARACTERISTICS: Record<string, string[]> = {
  spring: ['bright', 'clear', 'warm', 'light'],
  summer: ['soft', 'cool', 'muted', 'light'],
  autumn: ['warm', 'deep', 'muted', 'rich'],
  winter: ['cool', 'clear', 'bright', 'deep']
};

export const SKIN_TONE_DATA: Record<string, SkinToneInfo> = {
  light: {
    tone: 'Light',
    undertone: 'cool',
    contrast: 'high',
    season: 'summer',
    description: 'Very light skin that typically has cool undertones, ideal for soft, muted colors.',
    characteristics: [
      'Burns easily, rarely tans',
      'Veins appear blue or purple',
      'Looks best in soft, cool-toned colors',
      'Natural hair tends to be light'
    ],
    palette: ['#E6E6FA', '#B0C4DE', '#FFB6C1', '#87CEEB', '#98FB98', '#DDA0DD'],
    jewelry: {
      recommended: ['Silver', 'Platinum', 'White gold'],
      avoid: ['Yellow gold', 'Rose gold']
    }
  },
  fair: {
    tone: 'Fair',
    undertone: 'neutral',
    contrast: 'medium',
    season: 'spring',
    description: 'Fair skin with neutral undertones that works well with both warm and cool colors.',
    characteristics: [
      'Sometimes burns, gradually tans',
      'Veins appear both blue and green',
      'Can wear both warm and cool colors',
      'Versatile with metal choices'
    ],
    palette: ['#FFB347', '#98FF98', '#87CEEB', '#DDA0DD', '#F08080', '#E6E6FA'],
    jewelry: {
      recommended: ['Mixed metals', 'Rose gold', 'Silver'],
      avoid: ['Very yellow gold']
    }
  },
  medium: {
    tone: 'Medium',
    undertone: 'warm',
    contrast: 'medium',
    season: 'spring',
    description: 'Medium skin tone that typically has warm undertones and looks great in bright, clear colors.',
    characteristics: [
      'Rarely burns, tans easily',
      'Veins appear green',
      'Looks best in warm, clear colors',
      'Can wear most jewelry metals'
    ],
    palette: ['#FFD700', '#FF69B4', '#4169E1', '#32CD32', '#FF8C00', '#BA55D3'],
    jewelry: {
      recommended: ['Gold', 'Rose gold', 'Bronze'],
      avoid: ['Platinum']
    }
  },
  olive: {
    tone: 'Olive',
    undertone: 'warm',
    contrast: 'medium',
    season: 'autumn',
    description: 'Olive skin with warm undertones that pairs beautifully with earth tones and rich colors.',
    characteristics: [
      'Rarely burns, tans very easily',
      'Natural greenish undertone',
      'Looks best in earth tones',
      'Great with gold jewelry'
    ],
    palette: ['#DAA520', '#8B4513', '#228B22', '#CD853F', '#800000', '#556B2F'],
    jewelry: {
      recommended: ['Yellow gold', 'Bronze', 'Copper'],
      avoid: ['Silver', 'Platinum']
    }
  },
  tan: {
    tone: 'Tan',
    undertone: 'warm',
    contrast: 'medium',
    season: 'autumn',
    description: 'Tan skin with warm undertones that looks stunning in rich, warm colors.',
    characteristics: [
      'Never burns, tans very easily',
      'Golden undertone',
      'Looks best in warm, rich colors',
      'Excellent with gold jewelry'
    ],
    palette: ['#B8860B', '#CD853F', '#8B4513', '#A0522D', '#6B8E23', '#8B008B'],
    jewelry: {
      recommended: ['Yellow gold', 'Bronze', 'Copper'],
      avoid: ['Silver', 'Platinum']
    }
  },
  
  dark: {
    tone: 'Dark',
    undertone: 'neutral',
    contrast: 'high',
    season: 'winter',
    description: 'Rich, dark skin tone that creates a perfect canvas for bold, vibrant colors.',
    characteristics: [
      'Never burns, deeply pigmented',
      'Natural richness and depth in skin tone',
      'Looks stunning in bright, bold colors',
      'Can wear any metal tone beautifully'
    ],
    palette: ['#FF0000', '#FFD700', '#00FF00', '#4169E1', '#FF1493', '#9400D3'],
    jewelry: {
      recommended: ['Gold', 'Silver', 'Rose gold', 'Platinum'],
      avoid: ['Oxidized metals']
    }
  },
  deep: {
    tone: 'Deep',
    undertone: 'neutral',
    contrast: 'high',
    season: 'winter',
    description: 'Deep, rich skin tone that pairs beautifully with jewel tones and dramatic colors.',
    characteristics: [
      'Never burns, deeply pigmented',
      'Rich, deep natural skin tone',
      'Looks magnificent in jewel tones',
      'Creates stunning contrast with bright colors'
    ],
    palette: ['#4B0082', '#800080', '#DC143C', '#006400', '#B22222', '#483D8B'],
    jewelry: {
      recommended: ['Gold', 'Silver', 'Platinum'],
      avoid: ['Dull or oxidized metals']
    }
  }
};
