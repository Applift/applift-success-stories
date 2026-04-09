import React from 'react';
import styles from './ExecutiveSummary.module.css';

interface ExecutiveSummaryProps {
  children: React.ReactNode;
  platforms?: string[];
  technology?: string[];
}

export default function ExecutiveSummary({
  children,
  platforms = [],
  technology = [],
}: ExecutiveSummaryProps): React.JSX.Element {
  const hasMeta = platforms.length > 0 || technology.length > 0;
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.label}>Executive Summary</div>
          <div className={styles.body}>{children}</div>
        </div>
        {hasMeta && (
          <aside className={styles.meta}>
            {platforms.length > 0 && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Platforms</span>
                <span className={styles.metaValue}>{platforms.join(', ')}</span>
              </div>
            )}
            {technology.length > 0 && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Technology</span>
                <span className={styles.metaValue}>{technology.join(', ')}</span>
              </div>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
