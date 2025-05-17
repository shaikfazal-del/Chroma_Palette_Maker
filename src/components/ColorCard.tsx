import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Copy, Check, Droplets } from 'lucide-react';
import { Color } from '../types';
import { getContrastColor } from '../utils/colorUtils';

interface ColorCardProps {
  color: Color;
  onToggleLock: (id: string) => void;
  onUpdateColor: (id: string, hex: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, onToggleLock, onUpdateColor }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(color.hex);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const textColor = getContrastColor(color.hex);
  
  useEffect(() => {
    setInputValue(color.hex);
  }, [color.hex]);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  const handleToggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLock(color.id);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = () => {
    if (inputValue.match(/^#[0-9A-F]{6}$/i)) {
      onUpdateColor(color.id, inputValue);
    } else {
      setInputValue(color.hex);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setInputValue(color.hex);
      setIsEditing(false);
    }
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-between h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.02] rounded-lg overflow-hidden"
      style={{ backgroundColor: color.hex }}
    >
      <div className="flex justify-between w-full p-3">
        <button
          onClick={handleToggleLock}
          className="p-2 rounded-full backdrop-blur-sm bg-white/10 transition-all duration-200 hover:bg-white/20"
          style={{ color: textColor }}
          aria-label={color.locked ? "Unlock color" : "Lock color"}
        >
          {color.locked ? <Lock size={18} /> : <Unlock size={18} />}
        </button>
        
        <button
          className="p-2 rounded-full backdrop-blur-sm bg-white/10 transition-all duration-200 hover:bg-white/20"
          style={{ color: textColor }}
          aria-label="Adjust color"
        >
          <Droplets size={18} />
        </button>
      </div>
      
      <div 
        className="flex flex-col items-center justify-center flex-grow w-full cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <div className="px-3 py-2 rounded-md backdrop-blur-sm bg-white/20">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleSubmit}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-center font-mono"
              style={{ color: textColor }}
              maxLength={7}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span 
              className="font-mono font-semibold text-xl transition-all duration-200 bg-black/0 hover:bg-white/10 px-3 py-1 rounded"
              style={{ color: textColor }}
            >
              {color.hex}
            </span>
          </div>
        )}
      </div>
      
      <div className="w-full p-3">
        <button
          onClick={copyToClipboard}
          className="w-full py-2 px-4 flex items-center justify-center gap-2 rounded-md backdrop-blur-sm bg-white/10 transition-all duration-200 hover:bg-white/20"
          style={{ color: textColor }}
        >
          {isCopied ? (
            <>
              <Check size={16} />
              <span className="font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span className="font-medium">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ColorCard;