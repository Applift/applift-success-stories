import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './StoryHero.module.css';

interface StoryHeroProps {
  title: string;
  description: string;
  tags?: string[];
  heroImage?: string;
  engagement?: string;
  duration?: string;
  category?: string;
}

export default function StoryHero({
  title,
  description,
  tags = [],
  heroImage,
  engagement,
  duration,
  category,
}: StoryHeroProps): React.JSX.Element {
  const resolvedImage = useBaseUrl(heroImage ?? '');
  return (
    <header className={styles.hero}>
      <div className={styles.topRow}>
        <div className={styles.meta}>
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
          {engagement && (
            <span className={styles.engagement}>{engagement}</span>
          )}
        </div>
      </div>

      <div className={styles.titleRow}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        {duration && (
          <div className={styles.durationCard}>
            <span className={styles.durationLabel}>Duration</span>
            <span className={styles.durationValue}>{duration}</span>
          </div>
        )}
      </div>

      {heroImage && (
        <div className={styles.heroImageWrap}>
          <img
            src={resolvedImage}
            alt={`${title} hero`}
            className={styles.heroImage}
            loading="eager"
          />
        </div>
      )}
    </header>
  );
}
