/**
 * Utility functions for color generation and manipulation
 */

// Generate a random hex color
export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

// Generate a random palette with the specified number of colors
export const generateRandomPalette = (count: number): string[] => {
  return Array.from({ length: count }, () => generateRandomColor());
};

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Determine if text should be white or black based on background color
export const getContrastColor = (hexColor: string): string => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  // Calculate brightness using the formula
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  
  // If brightness is greater than 128, return black, otherwise white
  return brightness > 128 ? '#000000' : '#ffffff';
};

// Check if a hex color is valid
export const isValidHex = (hex: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(hex);
};

// Adjust the brightness of a color
export const adjustBrightness = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const newR = Math.max(0, Math.min(255, rgb.r + amount));
  const newG = Math.max(0, Math.min(255, rgb.g + amount));
  const newB = Math.max(0, Math.min(255, rgb.b + amount));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

// Generate harmonious colors based on a seed color
export const generateHarmoniousPalette = (seedColor: string, count: number): string[] => {
  const palette: string[] = [seedColor];
  const seedRgb = hexToRgb(seedColor);
  
  if (!seedRgb) return generateRandomPalette(count);
  
  // Convert to HSL for easier manipulation
  const { h, s, l } = rgbToHsl(seedRgb.r, seedRgb.g, seedRgb.b);
  
  // Create analogous colors
  for (let i = 1; i < count; i++) {
    // Rotate hue by a golden angle approximation
    const newHue = (h + (i * 137.5) / 360) % 1;
    
    // Slightly vary saturation and lightness
    const newSat = Math.max(0, Math.min(1, s + (Math.random() * 0.2 - 0.1)));
    const newLight = Math.max(0.2, Math.min(0.8, l + (Math.random() * 0.2 - 0.1)));
    
    const rgb = hslToRgb(newHue, newSat, newLight);
    palette.push(
      `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`
    );
  }
  
  return palette;
};

// RGB to HSL conversion
const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return { h, s, l };
};

// HSL to RGB conversion
const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};