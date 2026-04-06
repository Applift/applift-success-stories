import React from 'react';
import styles from './ExecutiveSummary.module.css';

interface ExecutiveSummaryProps {
  children: React.ReactNode;
}

export default function ExecutiveSummary({ children }: ExecutiveSummaryProps): React.JSX.Element {
  return (
    <section className={styles.banner}>
      <div className={styles.label}>Executive Summary</div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
