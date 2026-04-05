import React from 'react';
import styles from '../../pages/index.module.css';

export default function HeroSection(): React.JSX.Element {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.heroTitle}>Success Stories</h1>
        <p className={styles.heroSubtitle}>
          Explore how leading companies transform their technical operations and
          business workflows using our precision-driven methodologies. Real wins,
          real data, real impact.
        </p>
      </div>
    </section>
  );
}
