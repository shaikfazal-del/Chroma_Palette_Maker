import React from 'react';
import { Palette, RefreshCw, Save, Download, Info } from 'lucide-react';

interface HeaderProps {
  onGenerate: () => void;
  onRegenerate: () => void;
  onSave: () => void;
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onGenerate, 
  onRegenerate, 
  onSave,
  onExport
}) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Palette className="text-indigo-600" size={24} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Chroma Palette
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onGenerate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <RefreshCw size={16} />
            <span>New Palette</span>
          </button>
          
          <button 
            onClick={onRegenerate}
            className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          
          <button 
            onClick={onSave}
            className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
          
          <button 
            onClick={onExport}
            className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          
          <button
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Information"
          >
            <Info size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;