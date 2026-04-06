import React from 'react';
import styles from './TechStack.module.css';

interface TechCategory {
  category: string;
  technologies: string[];
}

interface TechStackProps {
  items: TechCategory[];
}

export default function TechStack({ items }: TechStackProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.label}>Technical Stack</div>
      <div className={styles.table}>
        {items.map((group) => (
          <div key={group.category} className={styles.row}>
            <div className={styles.category}>{group.category}</div>
            <div className={styles.values}>
              {group.technologies.join(' · ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
