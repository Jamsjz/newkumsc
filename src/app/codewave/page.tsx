'use client';

import { useEffect } from 'react';

export default function CodewaveRedirect() {
  const redirectUrl = 'https://code-wave.pages.dev';

  useEffect(() => {
    window.location.href = redirectUrl;
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyle}>
      <h1>Redirecting you to the CodeWave website...</h1>
      <p>
        If you are not redirected automatically, please{' '}
        <a href={redirectUrl}>click here</a>.
      </p>
    </div>
  );
}