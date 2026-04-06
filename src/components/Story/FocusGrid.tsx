import React from 'react';
import styles from './FocusGrid.module.css';

interface FocusItem {
  title: string;
  description: string;
}

interface FocusGridProps {
  items: FocusItem[];
}

export default function FocusGrid({ items }: FocusGridProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.label}>What We Delivered</div>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.title} className={styles.item}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
