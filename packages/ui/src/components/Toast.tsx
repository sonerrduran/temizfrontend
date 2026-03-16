import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-400" size={20} />,
    error: <AlertCircle className="text-red-400" size={20} />,
    warning: <AlertTriangle className="text-orange-400" size={20} />,
    info: <Info className="text-cyan-400" size={20} />,
  };

  const colors = {
    success: 'from-green-500/20 to-green-600/20 border-green-500/30',
    error: 'from-red-500/20 to-red-600/20 border-red-500/30',
    warning: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
    info: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
  };

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm
        bg-gradient-to-br ${colors[type]}
        animate-in slide-in-from-right duration-300
      `}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-white mb-1">{title}</p>}
        <p className="text-sm text-white/80">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

// Toast Container Component
export interface ToastContainerProps {
  toasts: (ToastProps & { id: string })[];
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  position = 'top-right',
}) => {
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`fixed ${positions[position]} z-50 flex flex-col gap-2 max-w-md w-full`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => onRemove(toast.id)} />
      ))}
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const show = (toast: ToastProps) => {
    const id = toast.id || Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (message: string, title?: string) => {
    show({ type: 'success', message, title });
  };

  const error = (message: string, title?: string) => {
    show({ type: 'error', message, title });
  };

  const warning = (message: string, title?: string) => {
    show({ type: 'warning', message, title });
  };

  const info = (message: string, title?: string) => {
    show({ type: 'info', message, title });
  };

  return {
    toasts,
    show,
    remove,
    success,
    error,
    warning,
    info,
  };
};
