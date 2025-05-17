import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { Palette } from '../types';
import { getContrastColor } from '../utils/colorUtils';

interface SavedPalettesProps {
  palettes: Palette[];
  onLoad: (index: number) => void;
  onDelete: (index: number) => void;
}

const SavedPalettes: React.FC<SavedPalettesProps> = ({ palettes, onLoad, onDelete }) => {
  if (palettes.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Saved Palettes</h2>
        <p className="text-gray-500">
          You haven't saved any palettes yet. Generate a palette you like and click "Save" to add it here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Saved Palettes</h2>
      <div className="space-y-4">
        {palettes.map((palette, index) => (
          <div 
            key={index} 
            className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex h-16">
              {palette.colors.map(color => (
                <div 
                  key={color.id} 
                  className="flex-1" 
                  style={{ backgroundColor: color.hex }}
                >
                  <div 
                    className="h-full flex items-center justify-center font-mono text-xs"
                    style={{ color: getContrastColor(color.hex) }}
                  >
                    {color.hex}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between p-2 bg-gray-50">
              <button
                onClick={() => onDelete(index)}
                className="text-gray-500 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors duration-200"
                aria-label="Delete palette"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => onLoad(index)}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 p-1.5 rounded-md hover:bg-indigo-50 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Load</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPalettes;