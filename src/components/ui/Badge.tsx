import React from 'react';
import { getBadgeClass } from '../../theme';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', className = '', children }) => {
  return <span className={`${getBadgeClass(variant)} ${className}`}>{children}</span>;
};

export default Badge;
