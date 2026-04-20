/*
 * ImageGallery — responsive image grid for story pages.
 *
 * Basic grid (2 or 3 columns):
 *   <ImageGallery
 *     images={[
 *       { src: '/img/screen1.png', alt: 'Dashboard view', caption: 'Optional caption' },
 *       { src: '/img/screen2.png', alt: 'Settings panel' },
 *     ]}
 *     columns={2}
 *   />
 *
 * Featured-first layout — first image renders full-width as a hero,
 * remaining images appear in a grid below:
 *   <ImageGallery
 *     featuredFirst
 *     images={[
 *       { src: '/img/hero.png', alt: 'Hero screenshot' },
 *       { src: '/img/detail1.png', alt: 'Detail A' },
 *       { src: '/img/detail2.png', alt: 'Detail B' },
 *     ]}
 *   />
 *
 * Props:
 *   images       — required array of { src, alt, caption? }
 *   columns      — 2 (default) or 3
 *   featuredFirst — boolean; hero + grid layout described above
 *   heading      — section title (default: 'Screenshots'); pass null to hide
 *   width        — gallery width as a percentage of its container (default: 100)
 */

import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ImageGallery.module.css';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3;
  /** When true, render the first image as a large hero followed by the rest in a grid. */
  featuredFirst?: boolean;
  /** Override the section heading. Pass null to hide it. */
  heading?: string | null;
  /** Width of the gallery as a percentage of its container (1–100). Default: 100. */
  width?: number;
}

function GalleryFigure({ img, centered = false }: { img: GalleryImage; centered?: boolean }): React.JSX.Element {
  const resolved = useBaseUrl(img.src);
  return (
    <figure className={centered ? styles.figureCentered : styles.figure}>
      <img
        src={resolved}
        alt={img.alt}
        className={centered ? styles.imageCentered : styles.image}
        loading="lazy"
      />
      {img.caption && (
        <figcaption className={styles.caption}>{img.caption}</figcaption>
      )}
    </figure>
  );
}

export default function ImageGallery({
  images,
  columns = 2,
  featuredFirst = false,
  heading = '',
  width = 100,
}: ImageGalleryProps): React.JSX.Element {
  const sectionStyle: React.CSSProperties = width !== 100
    ? { width: `${width}%`, margin: '0 auto' }
    : {};

  if (featuredFirst && images.length > 0) {
    const [hero, ...rest] = images;
    return (
      <section className={styles.section} style={sectionStyle}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        <div className={styles.hero}>
          <GalleryFigure img={hero} />
        </div>
        {rest.length > 0 && (
          <div
            className={styles.grid}
            style={
              {
                '--gallery-columns': Math.min(rest.length, columns),
              } as React.CSSProperties
            }
          >
            {rest.map((img, i) => (
              <GalleryFigure key={i} img={img} centered />
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={styles.section} style={sectionStyle}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div
        className={styles.grid}
        style={{ '--gallery-columns': columns } as React.CSSProperties}
      >
        {images.map((img, i) => (
          <GalleryFigure key={i} img={img} />
        ))}
      </div>
    </section>
  );
}
