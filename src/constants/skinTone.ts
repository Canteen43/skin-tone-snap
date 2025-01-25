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
    description: 'Fair skin tones have cool or neutral undertones and are more susceptible to sun damage. This skin type often has visible veins and burns easily.',
    palette: ['#F5E6E0', '#E8B298', '#D77556', '#6B4423', '#8B0000']
  },
  light: {
    tone: 'Light',
    description: 'Light skin tones can have warm or cool undertones and may tan gradually. This skin type can handle moderate sun exposure but should still use protection.',
    palette: ['#FFE4C4', '#DEB887', '#CD853F', '#8B4513', '#A0522D']
  },
  medium: {
    tone: 'Medium',
    description: 'Medium skin tones typically have warm or neutral undertones and tan easily. This versatile skin type can handle various colors and moderate sun exposure.',
    palette: ['#E5C6B3', '#C19A6B', '#996515', '#6F4E37', '#3B2F2F']
  },
  olive: {
    tone: 'Olive',
    description: 'Olive skin tones have green or golden undertones and tan very easily. This skin type rarely burns and looks great in both warm and cool colors.',
    palette: ['#BC8F8F', '#966919', '#808000', '#556B2F', '#2F4F4F']
  },
  deep: {
    tone: 'Deep',
    description: 'Deep skin tones have warm undertones and natural sun protection. This rich skin type looks stunning in bright colors and rarely burns.',
    palette: ['#9E7B6B', '#8B4513', '#654321', '#3B2F2F', '#28282B']
  }
};