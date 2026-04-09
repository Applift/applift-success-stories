import React from 'react';
import styles from './Timeline.module.css';

interface TimelinePhase {
  title: string;
  description: string;
}

interface TimelineProps {
  phases: TimelinePhase[];
  variant?: 'vertical' | 'horizontal';
  heading?: string;
}

export default function Timeline({
  phases,
  variant = 'vertical',
  heading = 'The Process',
}: TimelineProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <ol
        className={
          variant === 'horizontal' ? styles.horizontal : styles.vertical
        }
      >
        {phases.map((phase, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.marker}>
              <span className={styles.markerNumber}>{i + 1}</span>
            </div>
            <div className={styles.content}>
              <div className={styles.phaseLabel}>Phase {i + 1}</div>
              <h3 className={styles.phaseTitle}>{phase.title}</h3>
              <p className={styles.phaseDescription}>{phase.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
