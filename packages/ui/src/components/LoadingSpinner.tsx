import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Yükleniyor...',
  size = 'lg',
  fullScreen = true,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-16 w-16 border-3',
    lg: 'h-32 w-32 border-4',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div
        className={`${sizeClasses[size]} border-purple-200 border-t-purple-500 rounded-full animate-spin`}
      />
      {message && <p className="text-white text-xl mt-6 animate-pulse">{message}</p>}
      <div className="flex gap-2 mt-4">
        <div
          className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <div
          className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <div
          className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
