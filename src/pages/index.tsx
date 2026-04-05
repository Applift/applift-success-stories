import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import type { Industry } from '@site/src/components/SuccessStories/data';
import { useSuccessStories } from '@site/src/hooks/useSuccessStories';
import HeroSection from '@site/src/components/SuccessStories/HeroSection';
import FilterBar from '@site/src/components/SuccessStories/FilterBar';
import CaseStudyCard from '@site/src/components/SuccessStories/CaseStudyCard';
import TestimonialSection from '@site/src/components/SuccessStories/TestimonialSection';
import styles from './index.module.css';

export default function SuccessStories(): React.JSX.Element {
  const caseStudies = useSuccessStories();
  const [activeFilter, setActiveFilter] = useState<Industry | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter
        ? caseStudies.filter((s) => s.industry === activeFilter)
        : caseStudies,
    [activeFilter, caseStudies],
  );

  return (
    <Layout
      title="Success Stories"
      description="Real results from real partnerships. Explore our case studies across FinTech, HealthTech, E-commerce, and more."
    >
      <HeroSection />
      <FilterBar active={activeFilter} onFilter={setActiveFilter} />
      <main className={styles.gridSection}>
        <div className={styles.cardGrid}>
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </main>
      <TestimonialSection />
    </Layout>
  );
}
