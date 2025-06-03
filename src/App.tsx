import React, { useState } from 'react';
import { FrameShell } from './components/FrameShell';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  return <FrameShell />;
};

export default App; 