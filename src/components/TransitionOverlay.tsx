import React, { useEffect } from 'react';
import styles from './TransitionOverlay.module.css';

interface TransitionOverlayProps {
  active: boolean;
  onAnimationEnd: () => void;
}

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ active, onAnimationEnd }) => {
  useEffect(() => {
    if (active) {
      const timer = setTimeout(onAnimationEnd, 1000);
      return () => clearTimeout(timer);
    }
  }, [active, onAnimationEnd]);

  if (!active) return null;

  return (
    <div className={styles.fadeOverlay} />
  );
}; 