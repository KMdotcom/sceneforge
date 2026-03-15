import { Component, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Chatbot from './pages/Chatbot';
import CursorGlow from './components/CursorGlow';
import './App.css';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: '#ff4444' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/chat';
            }}
          >
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CursorGlow />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
