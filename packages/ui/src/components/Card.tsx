import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  onClick,
}) => {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 ${
        onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''
      } ${className}`}
    >
      {title && (
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      )}
      {children}
    </Component>
  );
};

export default Card;
