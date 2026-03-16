import React from 'react';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  fullScreen = false,
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeStyles[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
      </div>
      {text && <p className="text-white/70 text-sm font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        {spinner}
      </div>
    );
  }

  return spinner;
};
