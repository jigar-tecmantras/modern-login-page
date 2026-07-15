import { useMemo, useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage({ onSwitch = () => {} }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreed: false,
  });
  const [statusMessage, setStatusMessage] = useState('');

  const fullNameError = useMemo(() => {
    if (!touched.fullName) return '';
    if (!fullName.trim()) return 'Full name is required';
    if (fullName.trim().length < 2) return 'Enter a name with at least 2 characters';
    return '';
  }, [fullName, touched.fullName]);

  const emailError = useMemo(() => {
    if (!touched.email) return '';
    if (!email) return 'Email is required';
    if (!emailPattern.test(email)) return 'Please enter a valid email address';
    return '';
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return '';
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  }, [password, touched.password]);

  const confirmPasswordError = useMemo(() => {
    if (!touched.confirmPassword) return '';
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords must match';
    return '';
  }, [confirmPassword, password, touched.confirmPassword]);

  const termsError = useMemo(() => {
    if (!touched.agreed) return '';
    if (!agreed) return 'Please agree to the privacy policy to continue';
    return '';
  }, [agreed, touched.agreed]);

  const formIsValid = Boolean(
    fullName &&
      email &&
      password &&
      confirmPassword &&
      agreed &&
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreed: true,
    });

    if (!formIsValid) {
      setStatusMessage('Please fix the highlighted fields to continue.');
      return;
    }

    setStatusMessage('Welcome aboard! Your workspace account is now ready.');
  };

  return (
    <>
      <h2>Create your account</h2>
      <p className="subtitle">Register to keep your workspace secure and synced.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="input-label" htmlFor="full-name">
          Full name
          <input
            id="full-name"
            name="fullName"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
            aria-describedby="full-name-error"
            required
          />
        </label>
        {fullNameError && (
          <p id="full-name-error" className="input-error">
            {fullNameError}
          </p>
        )}

        <label className="input-label" htmlFor="register-email">
          Email
          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            aria-describedby="register-email-error"
            required
          />
        </label>
        {emailError && (
          <p id="register-email-error" className="input-error">
            {emailError}
          </p>
        )}

        <label className="input-label" htmlFor="register-password">
          Password
          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            aria-describedby="register-password-error"
            required
          />
        </label>
        {passwordError && (
          <p id="register-password-error" className="input-error">
            {passwordError}
          </p>
        )}

        <label className="input-label" htmlFor="confirm-password">
          Confirm password
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
            aria-describedby="confirm-password-error"
            required
          />
        </label>
        {confirmPasswordError && (
          <p id="confirm-password-error" className="input-error">
            {confirmPasswordError}
          </p>
        )}

        <div className="terms-row">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              onBlur={() => setTouched((prev) => ({ ...prev, agreed: true }))}
            />
            <span>I agree to the privacy policy and security guidelines.</span>
          </label>
        </div>
        {termsError && (
          <p id="terms-error" className="input-error">
            {termsError}
          </p>
        )}

        <button type="submit" className="primary-button" disabled={!formIsValid}>
          Create account
        </button>
      </form>

      {statusMessage && <p className="status-message">{statusMessage}</p>}

      <div className="form-footer">
        <p>
          Already have an account?{' '}
          <button type="button" className="ghost-button inline" onClick={onSwitch}>
            Sign in securely
          </button>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;
