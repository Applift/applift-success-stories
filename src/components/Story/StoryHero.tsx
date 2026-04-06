import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './StoryHero.module.css';

interface StoryHeroProps {
  title: string;
  description: string;
  tags?: string[];
  heroImage?: string;
  engagement?: string;
}

export default function StoryHero({
  title,
  description,
  tags = [],
  heroImage,
  engagement,
}: StoryHeroProps): React.JSX.Element {
  const resolvedImage = useBaseUrl(heroImage ?? '');
  return (
    <header className={styles.hero}>
      <div className={styles.topRow}>
        {heroImage && (
          <div className={styles.logoWrap}>
            <img
              src={resolvedImage}
              alt={`${title} logo`}
              className={styles.logo}
              loading="eager"
            />
          </div>
        )}
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
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.divider} />
    </header>
  );
}
