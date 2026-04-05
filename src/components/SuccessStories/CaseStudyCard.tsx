import React from 'react';
import Link from '@docusaurus/Link';
import type { CaseStudy } from './data';
import styles from '../../pages/index.module.css';

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({
  study,
}: CaseStudyCardProps): React.JSX.Element {
  return (
    <article
      className={styles.card}
      aria-label={`${study.clientName} — ${study.tags.join(', ')}`}
    >
      <div className={styles.cardImageWrap}>
        <img
          className={styles.cardImage}
          src={study.heroImage}
          alt={`${study.clientName} project screenshot`}
          loading="lazy"
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.tagList}>
          {study.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <h3 className={styles.clientName}>{study.clientName}</h3>
        <p className={styles.summary}>{study.summary}</p>
        <Link className={styles.readMore} to={study.link}>
          Read More{' '}
          <span className={styles.readMoreArrow} aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
