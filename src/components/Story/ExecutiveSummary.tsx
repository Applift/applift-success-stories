import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ExecutiveSummary.module.css';

interface ExecutiveSummaryProps {
  children: React.ReactNode;
  sector?: string;
  platforms?: string[];
  technology?: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export default function ExecutiveSummary({
  children,
  sector,
  platforms = [],
  technology = [],
  appStoreUrl,
  playStoreUrl,
  logoUrl,
  websiteUrl,
}: ExecutiveSummaryProps): React.JSX.Element {
  const hasMeta =
    Boolean(sector) ||
    platforms.length > 0 ||
    technology.length > 0 ||
    Boolean(appStoreUrl) ||
    Boolean(playStoreUrl) ||
    Boolean(logoUrl);
  const appStoreBadgeSrc = useBaseUrl('/img/download-on-app-store.svg');
  const playStoreBadgeSrc = useBaseUrl('/img/get-it-on-google-play.svg')
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
            {/* {logoUrl && (
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
            )} */}
            {sector && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Sector</span>
                <span className={styles.metaValue}>{sector}</span>
              </div>
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
            {playStoreUrl && (
              <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={styles.appStoreBadge}>
                <img src={playStoreBadgeSrc} alt="Get it on google play store" />
              </a>
            )}
            {websiteUrl && (
              <>
                <div className={styles.divider} />
                <div className={styles.metaItem}>
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={styles.metaValue}>Visit their website</a>
                </div>
              </>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
