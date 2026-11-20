import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-3xl bg-white border border-[#DDE7E8] text-center space-y-4 max-w-lg mx-auto my-12 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#122326]">Something went wrong</h3>
            <p className="text-xs text-[#4A6367] mt-1">
              {this.props.fallbackMessage || 'A component encountered an unexpected render issue.'}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006D77] text-white text-xs font-bold shadow-sm hover:bg-[#004E56] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
