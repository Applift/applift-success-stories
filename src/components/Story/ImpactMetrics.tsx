import React from 'react';
import styles from './ImpactMetrics.module.css';

interface Metric {
  value: string;
  label: string;
  description?: string;
}

interface ImpactMetricsProps {
  metrics: Metric[];
}

export default function ImpactMetrics({ metrics }: ImpactMetricsProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>The Impact</h2>
      <div className={styles.grid}>
        {metrics.map((metric, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.value}>{metric.value}</div>
            <div className={styles.label}>{metric.label}</div>
            {metric.description && (
              <p className={styles.description}>{metric.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
