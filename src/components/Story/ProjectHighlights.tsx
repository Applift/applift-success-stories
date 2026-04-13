import React from 'react';
import styles from './ProjectHighlights.module.css';

interface Highlight {
  title: string;
  description: React.ReactNode;
  details?: string[];
}

interface ProjectHighlightsProps {
  highlights: Highlight[];
  heading?: string;
}

export default function ProjectHighlights({
  highlights,
  heading = 'Project highlights',
}: ProjectHighlightsProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.grid}>
        {highlights.map((h, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.accent} />
            <span className={styles.index}>{'0' + (i + 1)}</span>
            <h3 className={styles.title}>{h.title}</h3>
            <p className={styles.description}>{h.description}</p>
            {h.details && h.details.length > 0 && (
              <ul className={styles.details}>
                {h.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
