import { SiteConfig } from '../config/sites';
import styles from './TOCModal.module.css';

interface TOCModalProps {
  sites: SiteConfig[];
  currentIndex: number;
  visible: boolean;
  onClose: () => void;
  onSelect: (idx: number) => void;
}

export const TOCModal: React.FC<TOCModalProps> = ({
  sites,
  currentIndex,
  visible,
  onClose,
  onSelect,
}) => {
  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <ul className={styles.siteList}>
          {sites.map((site, idx) => (
            <li
              key={site.url}
              className={`${styles.siteItem} ${
                idx === currentIndex ? styles.current : ''
              } ${!site.unlocked ? styles.locked : ''}`}
              onClick={() => {
                if (site.unlocked) {
                  onSelect(idx);
                  onClose();
                }
              }}
            >
              {site.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 