"use client";

import { useState } from 'react';

interface ColorOption {
  name: string;
  value: string;
}

const colorOptions: ColorOption[] = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#000000' },
  { name: 'Lightning Yellow 50', value: '#fff9eb' },
  { name: 'Lightning Yellow 100', value: '#feefc7' },
  { name: 'Lightning Yellow 200', value: '#fddd8a' },
  { name: 'Lightning Yellow 300', value: '#fccb4d' },
  { name: 'Lightning Yellow 400', value: '#fbbf24' },
  { name: 'Lightning Yellow 500', value: '#f5b40b' },
  { name: 'Lightning Yellow 600', value: '#d99e06' },
  { name: 'Lightning Yellow 700', value: '#b48409' },
  { name: 'Lightning Yellow 800', value: '#926d0e' },
  { name: 'Lightning Yellow 900', value: '#785b0f' },
  { name: 'Lightning Yellow 950', value: '#453303' },
  { name: 'Resolution Blue 50', value: '#e5f6ff' },
  { name: 'Resolution Blue 100', value: '#cfeeff' },
  { name: 'Resolution Blue 200', value: '#a9ddff' },
  { name: 'Resolution Blue 300', value: '#76c3ff' },
  { name: 'Resolution Blue 400', value: '#4097ff' },
  { name: 'Resolution Blue 500', value: '#166aff' },
  { name: 'Resolution Blue 600', value: '#0053ff' },
  { name: 'Resolution Blue 700', value: '#0055ff' },
  { name: 'Resolution Blue 800', value: '#004ce2' },
  { name: 'Resolution Blue 900', value: '#0135ae' },
  { name: 'Resolution Blue 950', value: '#012073' },
];

interface ColorPickerProps {
  className?: string;
  onClose?: () => void;
}

export default function ColorPicker({ className, onClose }: ColorPickerProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState({
    primary: '#a9ddff',
    secondary: '#012073',
    tertiary: '#0053ff',
    quaternary: '#ffffff',
  });

  const dropdowns = [
    { key: 'primary', title: 'Primaire', colorVar: '--color-sc-primary' },
    { key: 'secondary', title: 'Secondaire', colorVar: '--color-sc-secondary' },
    { key: 'tertiary', title: 'Tertiaire', colorVar: '--color-sc-tertiary' },
    { key: 'quaternary', title: 'Quaternaire', colorVar: '--color-sc-quaternary' },
  ];

  const handleColorSelect = (dropdownKey: string, colorValue: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [dropdownKey]: colorValue,
    }));

    // Update CSS variable
    const colorVar = dropdowns.find(d => d.key === dropdownKey)?.colorVar;
    if (colorVar) {
      document.documentElement.style.setProperty(colorVar, colorValue);
    }

    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownKey: string) => {
    setOpenDropdown(openDropdown === dropdownKey ? null : dropdownKey);
  };

  return (
    <div className={`p-4 bg-white rounded-lg z-10 shadow-lg ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Changez couleurs</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dropdowns.map((dropdown) => (
          <div key={dropdown.key} className="relative">
            <button
              onClick={() => toggleDropdown(dropdown.key)}
              className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="flex items-center gap-2">
                <div 
                  className="w-16 h-16 rounded border border-gray-300"
                  style={{ backgroundColor: selectedColors[dropdown.key as keyof typeof selectedColors] }}
                />
                <span className="font-medium">{dropdown.title}</span>
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${openDropdown === dropdown.key ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openDropdown === dropdown.key && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {colorOptions.map((color) => (
                                     <button
                     key={color.value}
                     onClick={() => handleColorSelect(dropdown.key, color.value)}
                     className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                   >
                     <div 
                       className="w-16 h-16 rounded border border-gray-300"
                       style={{ backgroundColor: color.value }}
                     />
                     <span className="text-sm">{color.name}</span>
                   </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 