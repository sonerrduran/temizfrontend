import { Component, ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface Props extends ErrorBoundaryProps {}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full flex items-center justify-center p-8 bg-slate-900/50 backdrop-blur-xl rounded-[40px] border border-red-500/30 shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="text-center max-w-lg">
            <div className="text-6xl mb-6 flex justify-center">
              <div className="bg-red-500/20 p-6 rounded-full w-24 h-24 flex items-center justify-center border-4 border-red-500/50 relative">
                <span className="relative z-10 text-red-500 font-extrabold text-5xl italic drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse">
                  !
                </span>
              </div>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white italic drop-shadow-2xl mb-4 uppercase tracking-tighter break-words">
              Sistemsel Hata
            </h2>
            <p className="text-red-300 mb-8 font-medium bg-red-500/10 p-4 rounded-2xl border border-red-500/20 break-words text-sm md:text-base">
              Bu oyunu/bölümü yüklerken beklenmedik bir kozmik anormallik oluştu.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-black py-4 px-10 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              ANA MENÜYE DÖN 🏠
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
