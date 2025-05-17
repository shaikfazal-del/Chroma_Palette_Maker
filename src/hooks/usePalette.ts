import { useState, useEffect, useCallback } from 'react';
import { generateRandomColor, generateHarmoniousPalette } from '../utils/colorUtils';
import { Color, Palette } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'colorPaletteMaker';
const DEFAULT_COUNT = 5;

export const usePalette = () => {
  const [palette, setPalette] = useState<Palette>({ colors: [] });
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>([]);

  // Initialize palette
  useEffect(() => {
    // Try to load from localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setSavedPalettes(data.savedPalettes || []);
        
        // If there's a current palette, use it
        if (data.currentPalette && data.currentPalette.colors.length > 0) {
          setPalette(data.currentPalette);
          return;
        }
      } catch (error) {
        console.error('Failed to parse saved palette data', error);
      }
    }
    
    // Otherwise generate a new palette
    generateNewPalette();
  }, []);

  // Save to localStorage when palette or savedPalettes change
  useEffect(() => {
    if (palette.colors.length === 0) return;
    
    localStorage.setItem(
      STORAGE_KEY, 
      JSON.stringify({
        currentPalette: palette,
        savedPalettes
      })
    );
  }, [palette, savedPalettes]);

  // Generate a completely new palette
  const generateNewPalette = useCallback(() => {
    const newColors = generateHarmoniousPalette(generateRandomColor(), DEFAULT_COUNT)
      .map(hex => ({
        id: uuidv4(),
        hex,
        locked: false
      }));
    
    setPalette({ colors: newColors });
  }, []);

  // Regenerate palette while preserving locked colors
  const regeneratePalette = useCallback(() => {
    setPalette(prev => {
      const newColors = prev.colors.map(color => {
        if (color.locked) return color;
        
        return {
          ...color,
          hex: generateRandomColor()
        };
      });
      
      return { colors: newColors };
    });
  }, []);

  // Toggle lock status for a specific color
  const toggleLock = useCallback((id: string) => {
    setPalette(prev => {
      const newColors = prev.colors.map(color => {
        if (color.id === id) {
          return { ...color, locked: !color.locked };
        }
        return color;
      });
      
      return { colors: newColors };
    });
  }, []);

  // Update a specific color manually
  const updateColor = useCallback((id: string, hex: string) => {
    setPalette(prev => {
      const newColors = prev.colors.map(color => {
        if (color.id === id) {
          return { ...color, hex };
        }
        return color;
      });
      
      return { colors: newColors };
    });
  }, []);

  // Save current palette
  const savePalette = useCallback(() => {
    setSavedPalettes(prev => [...prev, { ...palette, colors: [...palette.colors] }]);
  }, [palette]);

  // Load a saved palette
  const loadPalette = useCallback((index: number) => {
    if (index >= 0 && index < savedPalettes.length) {
      setPalette(savedPalettes[index]);
    }
  }, [savedPalettes]);

  // Delete a saved palette
  const deleteSavedPalette = useCallback((index: number) => {
    setSavedPalettes(prev => prev.filter((_, i) => i !== index));
  }, []);

  return {
    palette,
    savedPalettes,
    generateNewPalette,
    regeneratePalette,
    toggleLock,
    updateColor,
    savePalette,
    loadPalette,
    deleteSavedPalette
  };
};