import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ExecutiveSummary.module.css';

interface ExecutiveSummaryProps {
  children: React.ReactNode;
  platforms?: string[];
  technology?: string[];
  appStoreUrl?: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export default function ExecutiveSummary({
  children,
  platforms = [],
  technology = [],
  appStoreUrl,
  logoUrl,
  websiteUrl,
}: ExecutiveSummaryProps): React.JSX.Element {
  const hasMeta =
    platforms.length > 0 ||
    technology.length > 0 ||
    Boolean(appStoreUrl) ||
    Boolean(logoUrl);
  const appStoreBadgeSrc = useBaseUrl('/img/download-on-app-store.svg');
  const resolvedLogo = useBaseUrl(logoUrl ?? '');
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.label}>Executive Summary</div>
          <div className={styles.body}>{children}</div>
        </div>
        {hasMeta && (
          <aside className={styles.meta}>
            {logoUrl && (
              websiteUrl ? (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.logo}
                  aria-label="Visit client website"
                >
                  <img src={resolvedLogo} alt="Client logo" />
                </a>
              ) : (
                <div className={styles.logo}>
                  <img src={resolvedLogo} alt="Client logo" />
                </div>
              )
            )}
            {platforms.length > 0 && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Platforms</span>
                <span className={styles.metaValue}>{platforms.join(', ')}</span>
              </div>
            )}
            {technology.length > 0 && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Technology</span>
                <span className={styles.metaValue}>{technology.join(', ')}</span>
              </div>
            )}
            {appStoreUrl && (
              <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className={styles.appStoreBadge}>
                <img src={appStoreBadgeSrc} alt="Download on the App Store" />
              </a>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
