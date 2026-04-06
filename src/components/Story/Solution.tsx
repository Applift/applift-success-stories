import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Solution.module.css';

interface ClientInfo {
  description: string;
  websiteUrl?: string;
}

interface SolutionProps {
  children: React.ReactNode;
  clientInfo?: ClientInfo;
}

export default function Solution({ children, clientInfo }: SolutionProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <h2 className={styles.heading}>The Solution</h2>
          <div className={styles.body}>{children}</div>
        </div>
        {clientInfo && (
          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>About the Client</h3>
              <p className={styles.cardBody}>{clientInfo.description}</p>
              {clientInfo.websiteUrl && (
                <a
                  href={clientInfo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Visit Website
                </a>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
