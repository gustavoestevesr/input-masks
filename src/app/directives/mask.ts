import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { applyMask, getMaskPattern, getRegexExp, normalizeInput } from '../helpers/mask.helper';
import { MaskToken, MASK_REGEX, MASK_PATTERNS, MaskKey } from '../types/mask.types';

@Directive({
  selector: '[appMask]',
})
export class Mask {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  mask = input.required<MaskKey>();

  @HostListener('input')
  onInput(): void {
    const inputElement = this.elementRef.nativeElement;

    const inputValue = inputElement.value;

    const maskPattern = getMaskPattern(this.mask());

    const formattedValue = applyMask(inputValue, maskPattern);

    inputElement.value = formattedValue;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const input = this.elementRef.nativeElement;

    const pastedValue = event.clipboardData?.getData('text') ?? '';

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const currentValue = input.value;

    const newValue = currentValue.slice(0, start) + pastedValue + currentValue.slice(end);

    const maskPattern = getMaskPattern(this.mask());

    const formattedValue = applyMask(newValue, maskPattern);

    input.value = formattedValue;

    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
