import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './StoryHero.module.css';

interface StoryHeroProps {
  title: string;
  description: string;
  tags?: string[];
  heroImage?: string;
}

export default function StoryHero({
  title,
  description,
  tags = [],
  heroImage,
}: StoryHeroProps): React.JSX.Element {
  const resolvedImage = useBaseUrl(heroImage ?? '');
  return (
    <header className={styles.hero}>
      <div className={styles.titleBlock}>
        <p className={styles.description}>{description}</p>
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
