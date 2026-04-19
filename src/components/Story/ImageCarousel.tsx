/*
 * ImageCarousel — auto-advancing 3-slot carousel for images and GIFs.
 *
 * Shows three items at a time (prev · center · next). The center item is
 * scaled up 1.25× and fully opaque; siblings are scaled down and dimmed.
 * Indices wrap, so the list loops indefinitely.
 *
 * Behavior:
 *   - Autoplay advances every `interval` ms (default 4000). Hovering the
 *     carousel pauses autoplay; leaving resumes it.
 *   - GIFs: only the centered GIF animates. Siblings render a frozen first
 *     frame captured to a canvas on mount. Requires same-origin assets
 *     (cross-origin taints the canvas and the freeze is skipped).
 *   - All items scale to the same frame using CSS `aspect-ratio` +
 *     `object-fit: contain`, so mixed dimensions render at a uniform size.
 *
 * Example:
 *   <ImageCarousel
 *     items={[
 *       { src: '/img/demo.gif', alt: 'Live demo' },
 *       { src: '/img/shot1.png', alt: 'Dashboard', caption: 'Dashboard view' },
 *       { src: '/img/shot2.png', alt: 'Settings' },
 *     ]}
 *   />
 *
 * Props:
 *   items       — required array of { src, alt, caption? }
 *   interval    — autoplay interval in ms (default 4000)
 *   aspectRatio — CSS aspect-ratio for the frame (default '16 / 9')
 *   heading     — section title; pass a string to show, or omit to hide
 */

import React, { useEffect, useState } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import styles from './ImageCarousel.module.css';

interface CarouselItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  /** Autoplay interval in ms. Default 4000. */
  interval?: number;
  /** CSS aspect-ratio for the carousel frame. Default '16 / 9'. */
  aspectRatio?: string;
  /** Section heading. Pass null to hide. Default null. */
  heading?: string | null;
}

function isGif(src: string): boolean {
  return /\.gif(\?.*)?$/i.test(src);
}

// Sum the per-frame delays in a GIF's bytes. Returns total loop duration in ms.
// Walks GIF block structure to avoid false-positives from naive byte scanning.
function parseGifDurationMs(bytes: Uint8Array): number {
  if (bytes.length < 13 || bytes[0] !== 0x47 || bytes[1] !== 0x49 || bytes[2] !== 0x46) {
    return 0;
  }
  let p = 6;
  const packed = bytes[p + 4];
  const gctSize = packed & 0x80 ? 3 * (1 << ((packed & 0x07) + 1)) : 0;
  p += 7 + gctSize;

  let totalMs = 0;
  while (p < bytes.length) {
    const b = bytes[p++];
    if (b === 0x3b) break;
    if (b === 0x21) {
      const label = bytes[p++];
      if (label === 0xf9) {
        const size = bytes[p++];
        const delay = bytes[p + 1] | (bytes[p + 2] << 8);
        totalMs += delay * 10;
        p += size + 1;
      } else {
        let sub = bytes[p++];
        while (sub !== 0 && p < bytes.length) {
          p += sub;
          sub = bytes[p++];
        }
      }
    } else if (b === 0x2c) {
      p += 8;
      const lctPacked = bytes[p++];
      if (lctPacked & 0x80) p += 3 * (1 << ((lctPacked & 0x07) + 1));
      p++;
      let sub = bytes[p++];
      while (sub !== 0 && p < bytes.length) {
        p += sub;
        sub = bytes[p++];
      }
    } else {
      break;
    }
  }
  return totalMs;
}

export default function ImageCarousel({
  items,
  interval = 8000,
  aspectRatio = '16 / 9',
  heading = null,
}: ImageCarouselProps): React.JSX.Element | null {
  const { withBaseUrl } = useBaseUrlUtils();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [frozen, setFrozen] = useState<Record<number, string>>({});
  const [gifDurations, setGifDurations] = useState<Record<number, number>>({});
  const n = items.length;

  useEffect(() => {
    if (paused || n <= 1) return;
    const activeItem = items[activeIndex];
    const gifMs = isGif(activeItem.src) ? gifDurations[activeIndex] ?? 0 : 0;
    const delay = gifMs > 0 ? gifMs : interval;
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % n);
    }, delay);
    return () => window.clearTimeout(id);
  }, [paused, n, interval, activeIndex, items, gifDurations]);

  useEffect(() => {
    let cancelled = false;
    items.forEach(async (item, i) => {
      if (!isGif(item.src)) return;
      try {
        const res = await fetch(withBaseUrl(item.src));
        const bytes = new Uint8Array(await res.arrayBuffer());
        if (cancelled) return;

        const durationMs = parseGifDurationMs(bytes);
        if (durationMs > 0) {
          setGifDurations((prev) => (prev[i] ? prev : { ...prev, [i]: durationMs }));
        }

        const blob = new Blob([bytes], { type: 'image/gif' });
        const objectUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          if (cancelled) return;
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 0, 0);
          try {
            const url = canvas.toDataURL();
            setFrozen((prev) => (prev[i] ? prev : { ...prev, [i]: url }));
          } catch {
            // Canvas tainted — skip freeze; GIF will animate in all slots.
          }
        };
        img.src = objectUrl;
      } catch {
        // Network or decode error — skip this GIF's enhancements.
      }
    });
    return () => {
      cancelled = true;
    };
  }, [items, withBaseUrl]);

  if (n === 0) return null;

  function relOffset(i: number): number {
    let off = i - activeIndex;
    if (off > n / 2) off -= n;
    else if (off < -n / 2) off += n;
    return off;
  }

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div
        className={styles.carousel}
        style={{ '--carousel-aspect': aspectRatio } as React.CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.track}>
          {items.map((item, i) => {
            const off = relOffset(i);
            const visible = Math.abs(off) <= 1;
            const isCenter = off === 0;
            const useFrozen = isGif(item.src) && !isCenter && frozen[i];
            const src = useFrozen ? frozen[i] : withBaseUrl(item.src);
            const scale = isCenter ? 1.25 : 0.8;
            const style: React.CSSProperties = {
              transform: `translate(-50%, -50%) translateX(${off * 95}%) scale(${scale})`,
              opacity: visible ? (isCenter ? 1 : 0.55) : 0,
              zIndex: isCenter ? 2 : 1,
              pointerEvents: visible ? 'auto' : 'none',
            };
            return (
              <figure
                key={i}
                className={styles.slot}
                style={style}
                aria-hidden={!isCenter}
              >
                <img src={src} alt={item.alt} className={styles.image} />
                {item.caption && isCenter && (
                  <figcaption className={styles.caption}>{item.caption}</figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
