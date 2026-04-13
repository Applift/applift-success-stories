import React from 'react';
import styles from './IntegrationEcosystem.module.css';

interface Integration {
  name: string;
  category: string;
  direction?: 'inbound' | 'outbound' | 'bidirectional';
}

interface IntegrationEcosystemProps {
  integrations: Integration[];
  heading?: string;
  centerLabel?: string;
  centerSubLabel?: string;
}

export default function IntegrationEcosystem({
  integrations,
  heading = 'Integration ecosystem',
  centerLabel = 'Battery Platform',
  centerSubLabel = 'Unified data layer',
}: IntegrationEcosystemProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.canvas}>
        {/* Ambient rings */}
        <div className={styles.ringOuter} />
        <div className={styles.ringInner} />

        {/* Center hub */}
        <div className={styles.hub}>
          <div className={styles.hubGlow} />
          <span className={styles.hubLabel}>{centerLabel}</span>
          <span className={styles.hubSub}>{centerSubLabel}</span>
        </div>

        {/* Integration nodes */}
        {integrations.map((integration, i) => {
          const total = integrations.length;
          const angle = (360 / total) * i - 90; // start from top
          return (
            <div
              key={i}
              className={styles.spoke}
              style={{
                '--spoke-angle': `${angle}deg`,
                '--spoke-delay': `${i * 120}ms`,
              } as React.CSSProperties}
            >
              <div className={styles.line}>
                <div className={styles.lineTracer} />
              </div>
              <div className={styles.node}>
                <span className={styles.nodeName}>{integration.name}</span>
                <span className={styles.nodeCategory}>{integration.category}</span>
                {integration.direction && (
                  <span className={styles.nodeDirection}>
                    {integration.direction === 'inbound' && '← inbound'}
                    {integration.direction === 'outbound' && 'outbound →'}
                    {integration.direction === 'bidirectional' && '⇄ sync'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
