import React from 'react';
import ColorCard from './ColorCard';
import { Palette } from '../types';

interface PaletteDisplayProps {
  palette: Palette;
  onToggleLock: (id: string) => void;
  onUpdateColor: (id: string, hex: string) => void;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ 
  palette, 
  onToggleLock,
  onUpdateColor
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full flex-grow">
      {palette.colors.map(color => (
        <ColorCard 
          key={color.id} 
          color={color}
          onToggleLock={onToggleLock}
          onUpdateColor={onUpdateColor}
        />
      ))}
    </div>
  );
};

export default PaletteDisplay;