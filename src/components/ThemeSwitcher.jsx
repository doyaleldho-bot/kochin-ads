
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const themes = [
  { id: 'light', name: 'Light', color: '#008080' },
  { id: 'dark', name: 'Dark', color: '#1F2937' },
  { id: 'ocean', name: 'Ocean', color: '#0ea5e9' },
  { id: 'forest', name: 'Forest', color: '#166534' },
  { id: 'sunset', name: 'Sunset', color: '#f97316' },
  { id: 'royal', name: 'Royal', color: '#7c3aed' },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5" /> Select Theme
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {themes.map((t) => (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(t.id)}
            className={`
              relative p-3 rounded-lg border text-left transition-all
              ${theme === t.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:bg-muted'}
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: t.color }}
              />
              <span className="font-medium text-sm">{t.name}</span>
            </div>
            {theme === t.id && (
              <div className="absolute top-2 right-2 text-primary">
                <Check className="w-3 h-3" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
