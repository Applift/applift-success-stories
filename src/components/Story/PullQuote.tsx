import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './PullQuote.module.css';

interface PullQuoteProps {
  quote: string;
  name?: string;
  role?: string;
  image?: string;
}

export default function PullQuote({
  quote,
  name,
  role,
  image,
}: PullQuoteProps): React.JSX.Element {
  const resolvedImage = useBaseUrl(image ?? '');

  return (
    <figure className={styles.section}>
      <span className={styles.mark} aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className={styles.quote}>{quote}</blockquote>
      {(name || role) && (
        <figcaption className={styles.attribution}>
          {image && (
            <img
              src={resolvedImage}
              alt={name ?? ''}
              className={styles.avatar}
              loading="lazy"
            />
          )}
          <div className={styles.meta}>
            {name && <span className={styles.name}>{name}</span>}
            {role && <span className={styles.role}>{role}</span>}
          </div>
        </figcaption>
      )}
    </figure>
  );
}
