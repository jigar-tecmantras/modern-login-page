import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const heroCopy = {
  login: {
    title: 'Unlock dashboards built for focus.',
    description:
      'Sign in to sync your projects, track activity, and keep your workspace organized with modern security controls.',
    bullets: [
      'Single-step login with subtle micro-interactions',
      'Focused, distraction-free layout',
      'Built with accessibility and responsive design in mind',
    ],
  },
  register: {
    title: 'Create your workspace identity.',
    description:
      'Join with a secure onboarding flow so you can configure your preferences and keep work organized from day one.',
    bullets: [
      'Onboard with instant validation and friendly guidance',
      'Connect projects to a secure identity-first workflow',
      'Stay informed with responsive notifications and tips',
    ],
  },
};

function App() {
  const [activeView, setActiveView] = useState('login');
  const heroText = heroCopy[activeView];

  return (
    <div className="app-shell">
      <main className="auth-page" aria-label="Authentication">
        <section className="panel hero-panel">
          <p className="eyebrow">Secure Workspace</p>
          <div className="view-switch" role="tablist" aria-label="Authentication options">
            <button
              type="button"
              className={`tab-button ${activeView === 'login' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeView === 'login'}
              onClick={() => setActiveView('login')}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`tab-button ${activeView === 'register' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeView === 'register'}
              onClick={() => setActiveView('register')}
            >
              Register
            </button>
          </div>
          <h1>{heroText.title}</h1>
          <p>{heroText.description}</p>
          <ul>
            {heroText.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>

        <section className="panel form-panel" aria-live="polite">
          {activeView === 'login' ? (
            <LoginPage onSwitch={() => setActiveView('register')} />
          ) : (
            <RegisterPage onSwitch={() => setActiveView('login')} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
