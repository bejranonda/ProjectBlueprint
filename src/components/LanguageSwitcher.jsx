import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSwitcher({ currentLang, onChangeLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Close on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/20 backdrop-blur-sm shadow-sm hover:bg-white/20 transition-all duration-200 cursor-pointer group"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        id="language-switcher-btn"
      >
        <Globe className="w-4 h-4 text-indigo-100 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium text-white">{current.flag} {current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-indigo-200 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 overflow-hidden z-50 animate-fadeIn"
          role="listbox"
          aria-labelledby="language-switcher-btn"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChangeLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium flex-1">{lang.label}</span>
                {isActive && <Check className="w-4 h-4 text-indigo-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
