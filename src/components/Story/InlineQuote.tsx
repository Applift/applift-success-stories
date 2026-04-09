import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './InlineQuote.module.css';

interface InlineQuoteProps {
  quote: string;
  name: string;
  role: string;
  image?: string;
}

export default function InlineQuote({ quote, name, role, image }: InlineQuoteProps): React.JSX.Element {
  const resolvedImage = useBaseUrl(image ?? '');

  return (
    <aside className={styles.section}>
      <div className={styles.bar} />
      <blockquote className={styles.quote}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className={styles.attribution}>
        {image && (
          <img
            src={resolvedImage}
            alt={name}
            className={styles.avatar}
            loading="lazy"
          />
        )}
        <div className={styles.meta}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{role}</span>
        </div>
      </div>
    </aside>
  );
}
