import React, { useState } from 'react';
import Header from './components/Header';
import PaletteDisplay from './components/PaletteDisplay';
import SavedPalettes from './components/SavedPalettes';
import ExportModal from './components/ExportModal';
import KeyboardShortcuts from './components/Keyboard';
import { usePalette } from './hooks/usePalette';

function App() {
  const { 
    palette, 
    savedPalettes, 
    generateNewPalette, 
    regeneratePalette, 
    toggleLock, 
    updateColor,
    savePalette, 
    loadPalette, 
    deleteSavedPalette 
  } = usePalette();
  
  const [showExportModal, setShowExportModal] = useState(false);
  
  const handleExport = () => {
    setShowExportModal(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KeyboardShortcuts
        onGenerate={generateNewPalette}
        onRegenerate={regeneratePalette}
        onSave={savePalette}
        onExport={handleExport}
      />
      
      <Header
        onGenerate={generateNewPalette}
        onRegenerate={regeneratePalette}
        onSave={savePalette}
        onExport={handleExport}
      />
      
      <main className="container mx-auto px-4 pt-24 pb-8 flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Current Palette</h2>
              <p className="text-gray-500 text-sm mt-1">
                Click on a color to edit its hex value. Lock colors you want to keep when generating a new palette.
              </p>
            </div>
            <div className="h-96">
              <PaletteDisplay 
                palette={palette} 
                onToggleLock={toggleLock}
                onUpdateColor={updateColor}
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-100 rounded-md mr-2 font-mono">Space</kbd>
                <span>Refresh unlocked colors</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-100 rounded-md mr-2 font-mono">Ctrl+N</kbd>
                <span>New palette</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-100 rounded-md mr-2 font-mono">Ctrl+S</kbd>
                <span>Save palette</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-100 rounded-md mr-2 font-mono">Ctrl+E</kbd>
                <span>Export palette</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-80">
          <SavedPalettes 
            palettes={savedPalettes}
            onLoad={loadPalette}
            onDelete={deleteSavedPalette}
          />
        </div>
      </main>
      
      <footer className="py-4 px-6 bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-sm">
            Chroma Palette Maker — CodeCircuit Hackathon
          </p>
          <p className="text-gray-500 text-sm">
            Press Space to generate a new palette
          </p>
        </div>
      </footer>
      
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        palette={palette}
      />
    </div>
  );
}

export default App;