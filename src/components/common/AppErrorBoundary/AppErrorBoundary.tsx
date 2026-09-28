import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from 'react';

import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: send to error monitoring (Sentry, etc.)
    console.error('[AppErrorBoundary] Unhandled render error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              An unexpected error occurred. Please reload the page and try
              again.
            </p>
            <Button
              type="button"
              className="mt-6"
              onClick={this.handleReload}
            >
              Reload page
            </Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
