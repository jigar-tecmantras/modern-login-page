import { useMemo, useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage({ onSwitch = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [statusMessage, setStatusMessage] = useState('');

  const emailError = useMemo(() => {
    if (!touched.email) return '';
    if (!email) return 'Email is required';
    if (!emailPattern.test(email)) return 'Please enter a valid email address';
    return '';
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return '';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  }, [password, touched.password]);

  const formIsValid = Boolean(email && password && !emailError && !passwordError);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (!formIsValid) {
      setStatusMessage('Please fix the highlighted fields to continue.');
      return;
    }

    setStatusMessage('Welcome back! We are securely signing you in.');
  };

  return (
    <>
      <h2>Welcome back</h2>
      <p className="subtitle">Enter your credentials to continue.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="input-label" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            aria-describedby="email-error"
            required
          />
        </label>
        {emailError && (
          <p id="email-error" className="input-error">
            {emailError}
          </p>
        )}

        <label className="input-label" htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            placeholder="your_password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            aria-describedby="password-error"
            required
          />
        </label>
        {passwordError && (
          <p id="password-error" className="input-error">
            {passwordError}
          </p>
        )}

        <div className="actions-row">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Remember me for 30 days
          </label>
          <button
            type="button"
            className="ghost-button"
            onClick={() => setStatusMessage('Password reset is not implemented in this demo.')}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="primary-button" disabled={!formIsValid}>
          Sign in securely
        </button>
      </form>

      {statusMessage && <p className="status-message">{statusMessage}</p>}

      <div className="form-footer">
        <p>
          New here?{' '}
          <button type="button" className="ghost-button inline" onClick={onSwitch}>
            Create an account
          </button>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
