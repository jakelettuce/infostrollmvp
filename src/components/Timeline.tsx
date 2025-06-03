import React from 'react';
import styles from './Timeline.module.css';
import { SiteConfig } from '../config/sites';

interface TimelineProps {
  sites: SiteConfig[];
  currentIndex: number;
  visitedSites: Set<number>;
  onSelect: (idx: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ sites, currentIndex, visitedSites, onSelect }) => {
  return (
    <ul className={styles.timeline}>
      {sites.map((site, index) => {
        let circleClass = styles.circle;
        if (visitedSites.has(index)) {
          circleClass += ` ${styles.filled}`;
        }
        if (index === currentIndex) {
          circleClass += ` ${styles.current}`;
        } else if (!site.unlocked) {
          circleClass += ` ${styles.locked}`;
        }

        return (
          <li key={index}>
            <button
              className={circleClass}
              onClick={() => site.unlocked && onSelect(index)}
              disabled={!site.unlocked}
            />
          </li>
        );
      })}
    </ul>
  );
}; 