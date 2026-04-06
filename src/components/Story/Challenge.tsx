import React from 'react';
import styles from './Challenge.module.css';

interface GlanceItem {
  label: string;
  value: string;
}

interface ChallengeProps {
  children: React.ReactNode;
  glanceItems?: GlanceItem[];
}

export default function Challenge({ children, glanceItems = [] }: ChallengeProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <h2 className={styles.heading}>The Challenge</h2>
          <div className={styles.body}>{children}</div>
        </div>
        {glanceItems.length > 0 && (
          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Project at a Glance</h3>
              {glanceItems.map((item, i) => (
                <div key={i} className={styles.row}>
                  <span className={styles.rowLabel}>{item.label}</span>
                  <span className={styles.rowValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
