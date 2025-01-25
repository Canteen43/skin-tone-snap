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
    palette: ['#E8EFF5', '#D5E0EA', '#B4C7D9', '#93AFCC', '#7297BF'],
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
    palette: ['#FFE4C4', '#DEB887', '#CD853F', '#8B4513', '#A0522D'],
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
    palette: ['#E5C6B3', '#C19A6B', '#996515', '#6F4E37', '#3B2F2F'],
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
    palette: ['#BC8F8F', '#966919', '#808000', '#556B2F', '#2F4F4F'],
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
    palette: ['#9E7B6B', '#8B4513', '#654321', '#3B2F2F', '#28282B'],
    jewelry: {
      recommended: ['Yellow gold', 'Rose gold', 'Bright metals'],
      avoid: ['Pale metals', 'Oxidized silver']
    }
  }
};