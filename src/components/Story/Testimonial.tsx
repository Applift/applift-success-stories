import React, { useState, useMemo } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Testimonial.module.css';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image?: string;
  titles?: string[];
}

export default function Testimonial({ quote, name, role, image, titles }: TestimonialProps): React.JSX.Element {
  const resolvedImage = useBaseUrl(image ?? '');
  const pages = useMemo(
    () => quote.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
    [quote],
  );
  const hasCarousel = pages.length > 1;
  const [page, setPage] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.outer}>
        {hasCarousel && (
          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous quote"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <div className={styles.layout}>
          {image && (
            <div className={styles.avatarWrap}>
              <img
                src={resolvedImage}
                alt={name}
                className={styles.avatar}
                loading="lazy"
              />
            </div>
          )}
          <div className={styles.content}>
            <blockquote className={styles.quote}>
              &ldquo;{hasCarousel ? pages[page] : quote}&rdquo;
            </blockquote>
            {hasCarousel && (
              <div className={styles.dots}>
                {pages.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === page ? styles.dotActive : ''}`}
                    onClick={() => setPage(i)}
                    aria-label={`Go to part ${i + 1}`}
                  />
                ))}
              </div>
            )}
            <div className={styles.attribution}>
              <span className={styles.name}>{name}</span>
              <span className={styles.role}>{role}</span>
              {titles?.[page] && (
                <span className={styles.title}>{titles[page]}</span>
              )}
            </div>
          </div>
        </div>

        {hasCarousel && (
          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
            disabled={page === pages.length - 1}
            aria-label="Next quote"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
