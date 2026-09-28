import { MASK_PATTERNS, MaskToken, MASK_REGEX } from '../types/mask.types';

export function normalizeInput(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

export function getMaskPattern(mask: string): string {
  return MASK_PATTERNS[mask];
}

export function getRegexExp(maskCharacter: MaskToken): RegExp {
  return MASK_REGEX[maskCharacter as MaskToken];
}

export function isMaskToken(value: string): value is MaskToken {
  return value in MASK_REGEX;
}

export function isMaskCharacter(value: string): boolean {
  return !isMaskToken(value);
}

export function applyMask(value: string, maskPattern: string): string {
  let result = '';
  let valueIndex = 0;

  for (const maskCharacter of maskPattern) {
    if (valueIndex >= value.length) {
      break;
    }

    const token = getRegexExp(maskCharacter as MaskToken);

    if (token) {
      while (valueIndex < value.length) {
        const character = value[valueIndex++];

        if (token.test(character)) {
          result += character;
          break;
        }
      }
    } else {
      if (value[valueIndex] === maskCharacter) {
        result += maskCharacter;
        valueIndex++;
      } else {
        result += maskCharacter;
      }
    }
  }

  return result;
}
