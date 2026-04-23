import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import { useSuccessStories } from '@site/src/hooks/useSuccessStories';
import HeroSection from '@site/src/components/SuccessStories/HeroSection';
import FilterBar from '@site/src/components/SuccessStories/FilterBar';
import CaseStudyCard from '@site/src/components/SuccessStories/CaseStudyCard';
import TestimonialSection from '@site/src/components/SuccessStories/TestimonialSection';
import styles from './index.module.css';

export default function SuccessStories(): React.JSX.Element {
  const caseStudies = useSuccessStories();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((s) => s.generalTags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [caseStudies]);

  const filtered = useMemo(
    () =>
      activeFilter
        ? caseStudies.filter((s) => s.generalTags.includes(activeFilter))
        : caseStudies,
    [activeFilter, caseStudies],
  );

  return (
    <Layout
      title="Success Stories"
      description="Real results from real partnerships. Explore our case studies across FinTech, HealthTech, E-commerce, and more."
    >
      <div className={styles.pageWrapper}>
        <HeroSection />
        <FilterBar tags={allTags} active={activeFilter} onFilter={setActiveFilter} />
        <main className={styles.gridSection}>
          <div className={styles.cardGrid}>
            {filtered.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
