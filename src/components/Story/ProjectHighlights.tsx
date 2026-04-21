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

// Splits n items into balanced rows of at most 3, distributing remainder to later rows.
// e.g. 4→[2,2], 5→[2,3], 6→[3,3], 7→[2,2,3], 8→[2,3,3], 9→[3,3,3]
function splitIntoRows<T>(items: T[]): T[][] {
  const n = items.length;
  if (n <= 3) return [items];

  const numRows = Math.ceil(n / 3);
  const baseSize = Math.floor(n / numRows);
  const remainder = n % numRows;

  const rows: T[][] = [];
  let start = 0;
  for (let r = 0; r < numRows; r++) {
    const size = baseSize + (r >= numRows - remainder ? 1 : 0);
    rows.push(items.slice(start, start + size));
    start += size;
  }
  return rows;
}

export default function ProjectHighlights({
  highlights,
  heading = 'Project highlights',
}: ProjectHighlightsProps): React.JSX.Element {
  const rows = splitIntoRows(highlights);
  let globalIndex = 0;

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div className={styles.rows}>
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={styles.grid}
            style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
          >
            {row.map((h) => {
              const i = globalIndex++;
              return (
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
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
