import React from 'react';
import styles from './Impact.module.css';

interface ImpactProps {
  children: React.ReactNode;
}

export default function Impact({ children }: ImpactProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.label}>The Outcome</div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
