import React, { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onGenerate: () => void;
  onRegenerate: () => void;
  onSave: () => void;
  onExport: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onGenerate,
  onRegenerate,
  onSave,
  onExport
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in an input element
      if (document.activeElement?.tagName === 'INPUT') return;
      
      // Handle keyboard shortcuts
      switch (e.key.toLowerCase()) {
        case ' ':  // Space
          onRegenerate();
          e.preventDefault();
          break;
        case 'n':
          if (e.ctrlKey || e.metaKey) {
            onGenerate();
            e.preventDefault();
          }
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            onSave();
            e.preventDefault();
          }
          break;
        case 'e':
          if (e.ctrlKey || e.metaKey) {
            onExport();
            e.preventDefault();
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onGenerate, onRegenerate, onSave, onExport]);
  
  return null;  // This component doesn't render anything
};

export default KeyboardShortcuts;