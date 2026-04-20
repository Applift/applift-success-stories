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
  iosDocsUrl?: string;
  androidDocsUrl?: string;
  reactNativeDocsUrl?: string;
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
  iosDocsUrl,
  androidDocsUrl,
  reactNativeDocsUrl,
}: ExecutiveSummaryProps): React.JSX.Element {
  const hasSdkDocs = Boolean(iosDocsUrl || androidDocsUrl || reactNativeDocsUrl);
  const hasMeta =
    Boolean(sector) ||
    platforms.length > 0 ||
    technology.length > 0 ||
    Boolean(appStoreUrl) ||
    Boolean(playStoreUrl) ||
    Boolean(logoUrl) ||
    hasSdkDocs;
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
            {hasSdkDocs && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>SDK Docs</span>
                <div className={styles.sdkDocsRow}>
                  {iosDocsUrl && (
                    <a
                      href={iosDocsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sdkIcon}
                      aria-label="iOS SDK Docs"
                      title="iOS"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                    </a>
                  )}
                  {androidDocsUrl && (
                    <a
                      href={androidDocsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sdkIcon}
                      aria-label="Android SDK Docs"
                      title="Android"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.523 15.3414c-.5511 0-.9993-.4485-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5512-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4485-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5512-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.689-7.5743-6.1185-9.4396" />
                      </svg>
                    </a>
                  )}
                  {reactNativeDocsUrl && (
                    <a
                      href={reactNativeDocsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sdkIcon}
                      aria-label="React Native SDK Docs"
                      title="React Native"
                    >
                      <svg viewBox="-11.5 -10.23 23 20.46" aria-hidden="true">
                        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                        <g stroke="currentColor" strokeWidth="1" fill="none">
                          <ellipse rx="11" ry="4.2" />
                          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                      </svg>
                    </a>
                  )}
                </div>
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
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                    <svg className={styles.websiteIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    Visit Website
                  </a>
                </div>
              </>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
