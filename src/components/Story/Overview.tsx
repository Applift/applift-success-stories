import React from 'react';
import styles from './Overview.module.css';

interface OverviewProps {
  children: React.ReactNode;
}

export default function Overview({ children }: OverviewProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.label}>The Engagement</div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
