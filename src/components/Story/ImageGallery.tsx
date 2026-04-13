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
  heading = 'Screenshots',
}: ImageGalleryProps): React.JSX.Element {
  if (featuredFirst && images.length > 0) {
    const [hero, ...rest] = images;
    return (
      <section className={styles.section}>
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
    <section className={styles.section}>
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
