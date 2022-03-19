import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="container">
            <div className=" text-center mt-5">
              <h1 className="header text-center fw-lighter display-4 mb-4">Sorry, there was a network error.</h1>
              <button className="btn btn-primary btn-lg" onClick={() => window.location.reload()}>
                Refresh Page
              </button>
            </div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
