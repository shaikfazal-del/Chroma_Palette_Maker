import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import { Palette } from '../types';
import { getContrastColor } from '../utils/colorUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  palette: Palette;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, palette }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'code'>('image');
  const [isCopied, setIsCopied] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  
  if (!isOpen) return null;
  
  const handleExportImage = () => {
    if (!paletteRef.current) return;
    
    // This is a simplified version - in a real app you'd use html2canvas or similar
    alert('In a production app, this would export the palette as a PNG image.');
  };
  
  const getPaletteAsJson = () => {
    return JSON.stringify(
      palette.colors.map(color => ({ hex: color.hex })),
      null, 2
    );
  };
  
  const getPaletteAsCss = () => {
    return `:root {\n${palette.colors.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}\n}`;
  };
  
  const getPaletteAsTailwind = () => {
    return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n${palette.colors.map((color, index) => `        palette${index + 1}: '${color.hex}',`).join('\n')}\n      }\n    }\n  }\n}`;
  };
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Export Palette</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="border-b">
          <div className="flex">
            <button 
              className={`px-4 py-3 font-medium transition-colors duration-200 ${activeTab === 'image' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('image')}
            >
              Export as Image
            </button>
            <button 
              className={`px-4 py-3 font-medium transition-colors duration-200 ${activeTab === 'code' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('code')}
            >
              Export as Code
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-grow p-6">
          {activeTab === 'image' && (
            <div className="space-y-6">
              <div ref={paletteRef} className="border rounded-lg overflow-hidden">
                <div className="flex h-40">
                  {palette.colors.map(color => (
                    <div 
                      key={color.id} 
                      className="flex-1 flex items-end justify-center p-3" 
                      style={{ backgroundColor: color.hex }}
                    >
                      <span 
                        className="font-mono text-sm px-2 py-1 rounded bg-black/10 backdrop-blur-sm"
                        style={{ color: getContrastColor(color.hex) }}
                      >
                        {color.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={handleExportImage}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  <Download size={16} />
                  <span>Download PNG</span>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'code' && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">JSON</h3>
                  <button 
                    onClick={() => copyToClipboard(getPaletteAsJson())}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 p-1 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm font-mono text-gray-800">
                  {getPaletteAsJson()}
                </pre>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">CSS Variables</h3>
                  <button 
                    onClick={() => copyToClipboard(getPaletteAsCss())}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 p-1 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm font-mono text-gray-800">
                  {getPaletteAsCss()}
                </pre>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Tailwind Config</h3>
                  <button 
                    onClick={() => copyToClipboard(getPaletteAsTailwind())}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 p-1 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm font-mono text-gray-800">
                  {getPaletteAsTailwind()}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportModal;