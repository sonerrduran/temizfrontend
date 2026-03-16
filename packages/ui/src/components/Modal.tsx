import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative ${sizeStyles[size]} w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-300`}>
        <div className="bg-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-white/10">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
