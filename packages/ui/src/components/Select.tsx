import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Seçiniz',
  label,
  error,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/70 mb-2">
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-white/5 border border-white/10
            text-white text-left
            flex items-center justify-between
            transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/20'}
            ${error ? 'border-red-500/50' : ''}
            ${isOpen ? 'border-cyan-500/50 ring-2 ring-cyan-500/20' : ''}
          `}
        >
          <span className={selectedOption ? 'text-white' : 'text-white/40'}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 py-2 rounded-lg bg-[#1a1a2e] border border-white/10 shadow-xl max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                className={`
                  w-full px-4 py-2.5 text-left flex items-center justify-between
                  transition-colors
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5'}
                  ${option.value === value ? 'bg-cyan-500/10 text-cyan-400' : 'text-white'}
                `}
              >
                <span>{option.label}</span>
                {option.value === value && <Check size={16} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
