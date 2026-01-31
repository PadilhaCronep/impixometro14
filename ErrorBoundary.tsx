import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Fatal render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Ops! Algo deu errado.</h1>
          <p className="text-sm text-zinc-300 max-w-xl">
            O aplicativo encontrou um erro inesperado e não conseguiu carregar. Tente recarregar a página.
          </p>
          {this.state.message ? (
            <pre className="mt-4 text-xs text-red-300 bg-zinc-900/60 p-3 rounded max-w-2xl overflow-auto">
              {this.state.message}
            </pre>
          ) : null}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
