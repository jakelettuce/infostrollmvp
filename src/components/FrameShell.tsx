import React, { useRef, useState, useEffect } from 'react';
import styles from './FrameShell.module.css';
import { sites, SiteConfig } from '../config/sites';
import { Timeline } from './Timeline';
import { TransitionOverlay } from './TransitionOverlay';
import { TOCModal } from './TOCModal';

declare global {
  namespace Electron {
    interface WebviewTag extends HTMLElement {}
  }
}

interface FrameShellProps {
  onLeave: () => void;
}

export const FrameShell: React.FC<FrameShellProps> = ({ onLeave }) => {
  const webviewRef = useRef<Electron.WebviewTag>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [siteList, setSiteList] = useState<SiteConfig[]>(sites);
  const [visitedSites, setVisitedSites] = useState<Set<number>>(new Set([0]));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTOCVisible, setIsTOCVisible] = useState(false);
  const nextIndexRef = useRef<() => void>();

  useEffect(() => {
    const webview = webviewRef.current;
    if (webview) {
      const handleLoad = () => {
        if (isTransitioning) {
          setIsTransitioning(false);
        }
      };
      const handleError = (event: any) => {
        // Ignore ERR_ABORTED errors as they're expected during transitions
        if (event.errorCode !== -3) {
          console.error('Webview error:', event);
        }
      };
      webview.addEventListener('did-finish-load', handleLoad);
      webview.addEventListener('did-fail-load', handleError);
      return () => {
        webview.removeEventListener('did-finish-load', handleLoad);
        webview.removeEventListener('did-fail-load', handleError);
      };
    }
  }, [isTransitioning]);

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

  const navigateTo = (newIndex: number) => {
    setIsTransitioning(true);
    const delayed = () => {
      setCurrentIndex(newIndex);
      webviewRef.current?.loadURL(siteList[newIndex].url);
    };
    nextIndexRef.current = delayed;
  };

  const handleWebviewLoad = () => {
    if (isTransitioning) {
      setIsTransitioning(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < siteList.length - 1 && siteList[currentIndex + 1].unlocked) {
      navigateTo(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      navigateTo(currentIndex - 1);
    }
  };

  return (
    <div className={styles.frameContainer}>
      <header className={styles.header}>
        <button className={styles.leaveButton} onClick={onLeave}>Leave</button>
        <div className={styles.brand}>Dimension 0: A Stroll Through Information Park</div>
        <button className={styles.settingsButton} onClick={() => setIsTOCVisible(true)}>MAP</button>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.webviewContainer}>
          <TransitionOverlay 
            active={isTransitioning} 
            onAnimationEnd={() => {
              nextIndexRef.current?.();
            }} 
          />
          <webview
            ref={webviewRef}
            id="mainWebview"
            src={siteList[currentIndex].url}
            style={{ width: '100%', height: '100%' }}
            partition="persist:infoStroll"
            webpreferences="nodeIntegration=false, contextIsolation=true"
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <button
          className={styles.navButton}
          onClick={handleBack}
          disabled={currentIndex === 0}
        >
          Uptown
        </button>
        <div className={styles.siteInfo}>
          <div className={styles.currentSite}>{siteList[currentIndex].name}</div>
          <Timeline
            sites={siteList}
            currentIndex={currentIndex}
            visitedSites={visitedSites}
            onSelect={(i) => navigateTo(i)}
          />
        </div>
        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={currentIndex === siteList.length - 1 || !siteList[currentIndex + 1]?.unlocked}
        >
          Downtown
        </button>
      </footer>
      <TOCModal
        sites={siteList}
        currentIndex={currentIndex}
        visible={isTOCVisible}
        onClose={() => setIsTOCVisible(false)}
        onSelect={(i) => navigateTo(i)}
      />
    </div>
  );
}; 