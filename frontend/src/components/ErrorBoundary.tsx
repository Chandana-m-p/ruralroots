import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error Boundary error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚠️</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--forest)' }}>
            Something went wrong rendering this page.
          </h3>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
            {this.props.fallbackMessage || 'An unexpected rendering error occurred. Please try refreshing or return to shop.'}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/shop';
            }}
          >
            Return to Shop
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
