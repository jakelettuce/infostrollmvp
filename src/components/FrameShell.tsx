import React, { useRef, useState, useEffect } from 'react';
import styles from './FrameShell.module.css';
import { sites, SiteConfig } from '../config/sites';
import { Timeline } from './Timeline';

declare global {
  namespace Electron {
    interface WebviewTag extends HTMLElement {}
  }
}

export const FrameShell: React.FC = () => {
  const webviewRef = useRef<Electron.WebviewTag>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [siteList, setSiteList] = useState<SiteConfig[]>(sites);
  const [visitedSites, setVisitedSites] = useState<Set<number>>(new Set([0]));

  // Unlock the next site when visiting a new site
  useEffect(() => {
    if (currentIndex < siteList.length - 1 && !siteList[currentIndex + 1].unlocked) {
      const updated = siteList.map((site, idx) =>
        idx === currentIndex + 1 ? { ...site, unlocked: true } : site
      );
      setSiteList(updated);
    }
    setVisitedSites(prev => new Set([...prev, currentIndex]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < siteList.length - 1 && siteList[currentIndex + 1].unlocked) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.frameContainer}>
      <header className={styles.header}>
        <div className={styles.brand}>Dimension 0: A Stroll Through Information Park</div>
        <button className={styles.settingsButton}>⚙️</button>
      </header>
      <main className={styles.mainContent}>
        <webview
          ref={webviewRef}
          id="mainWebview"
          src={siteList[currentIndex].url}
          style={{ width: '100%', height: '100%' }}
          partition="persist:infoStroll"
          webpreferences="nodeIntegration=false, contextIsolation=true"
        />
      </main>
      <footer className={styles.footer}>
        <button
          className={styles.navButton}
          onClick={handleBack}
          disabled={currentIndex === 0}
        >
          ◀
        </button>
        <Timeline
          sites={siteList}
          currentIndex={currentIndex}
          visitedSites={visitedSites}
          onSelect={(i) => {
            setCurrentIndex(i);
            webviewRef.current?.loadURL(siteList[i].url);
          }}
        />
        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={currentIndex === siteList.length - 1 || !siteList[currentIndex + 1]?.unlocked}
        >
          ▶
        </button>
      </footer>
    </div>
  );
}; 