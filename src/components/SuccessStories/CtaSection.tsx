import React from 'react';
import Link from '@docusaurus/Link';
import styles from '../../pages/index.module.css';

export default function CtaSection(): React.JSX.Element {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2 className={styles.ctaTitle}>
          Ready to build your success story?
        </h2>
        <p className={styles.ctaSubtitle}>
          Let's talk about what we can build together.
        </p>
        <Link
          className={styles.ctaButton}
          to="https://www.applift-consulting.com/book-online"
        >
          Schedule a Call →
        </Link>
      </div>
    </section>
  );
}
