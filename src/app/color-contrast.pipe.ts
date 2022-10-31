import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorContrast',
})
export class ColorContrastPipe implements PipeTransform {
  transform(hex: string): string {
    return this.getContrast(hex);
  }

  getContrast(hex = '#ffffff', limit = 110): string {
    // Convert to RGB value
    const { r, g, b } = this.hexToRgb(hex);

    // Get YIQ ratio
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= limit ? '#000000' : '#ffffff';
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const newHex = hex.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => r + r + g + g + b + b
    );

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
    return {
      r: parseInt(result![1], 16),
      g: parseInt(result![2], 16),
      b: parseInt(result![3], 16),
    };
  }
}
