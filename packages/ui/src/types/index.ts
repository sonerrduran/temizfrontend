// UI Types - Export interfaces directly
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export interface GameCardProps {
  title: string;
  emoji: string;
  onClick: () => void;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export interface GameOverOverlayProps {
  show: boolean;
  score: number;
  onRestart: () => void;
  onExit: () => void;
}

export interface GameWrapperProps {
  children: React.ReactNode;
  onExit: () => void;
}

// Re-export from components
export type { LayoutProps } from '../components/Layout';
export type { ErrorBoundaryProps } from '../components/ErrorBoundary';
export type { RulesOverlayProps } from '../components/RulesOverlay';
export type { GameTemplateProps } from '../components/GameTemplate';
