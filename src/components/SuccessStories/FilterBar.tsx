import React from 'react';
import clsx from 'clsx';
import type { CaseStudy } from './data';
import styles from '../../pages/index.module.css';

interface FilterBarProps {
  tags: string[];
  active: string | null;
  onFilter: (tag: string | null) => void;
}

export default function FilterBar({
  tags,
  active,
  onFilter,
}: FilterBarProps): React.JSX.Element {
  return (
    <div className={styles.filterBar}>
        <ul className={styles.filterList} role="tablist">
          <li role="presentation">
            <button
              role="tab"
              aria-selected={active === null}
              className={clsx(
                styles.filterPill,
                active === null && styles.filterPillActive,
              )}
              onClick={() => onFilter(null)}
            >
              All
            </button>
          </li>
          {tags.map((tag) => (
            <li key={tag} role="presentation">
              <button
                role="tab"
                aria-selected={active === tag}
                className={clsx(
                  styles.filterPill,
                  active === tag && styles.filterPillActive,
                )}
                onClick={() => onFilter(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}
