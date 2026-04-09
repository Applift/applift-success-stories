import React from 'react';
import styles from './Partnership.module.css';

interface PartnershipProps {
  children: React.ReactNode;
}

export default function Partnership({ children }: PartnershipProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.heading}>The Partnership</h2>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
