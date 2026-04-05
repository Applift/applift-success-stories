import React from 'react';
import styles from '../../pages/index.module.css';

export default function TestimonialSection(): React.JSX.Element {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.testimonialInner}>
        <div className={styles.testimonialLayout}>
          <div className={styles.testimonialContent}>
            <h2 className={styles.testimonialTitle}>Voices of Success</h2>
            <div className={styles.quoteCard}>
              <span className={styles.quoteIcon} aria-hidden="true">
                &ldquo;
              </span>
              <p className={styles.quoteText}>
                &ldquo;Applift transformed our workflow, saving us 30% in
                operational costs. Their hands-on approach to technical
                execution made the transition seamless for our entire global
                team.&rdquo;
              </p>
              <div className={styles.quoteAuthor}>
                <div>
                  <p className={styles.authorName}>Jane Doe</p>
                  <p className={styles.authorRole}>CEO at TechCorp</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonialDots}>
            <button
              className={styles.dotActive}
              aria-label="Testimonial 1 (current)"
            />
            <button className={styles.dot} aria-label="Testimonial 2" />
            <button className={styles.dot} aria-label="Testimonial 3" />
          </div>
        </div>
      </div>
    </section>
  );
}
