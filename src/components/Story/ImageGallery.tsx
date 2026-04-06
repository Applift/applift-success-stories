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
}

export default function ImageGallery({ images, columns = 2 }: ImageGalleryProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Screenshots</h2>
      <div
        className={styles.grid}
        style={{ '--gallery-columns': columns } as React.CSSProperties}
      >
        {images.map((img, i) => {
          const resolved = useBaseUrl(img.src);
          return (
            <figure key={i} className={styles.figure}>
              <img
                src={resolved}
                alt={img.alt}
                className={styles.image}
                loading="lazy"
              />
              {img.caption && (
                <figcaption className={styles.caption}>{img.caption}</figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
