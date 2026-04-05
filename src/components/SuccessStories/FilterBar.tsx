import React from 'react';
import clsx from 'clsx';
import type { Industry } from './data';
import { INDUSTRIES } from './data';
import styles from '../../pages/index.module.css';

interface FilterBarProps {
  active: Industry | null;
  onFilter: (industry: Industry | null) => void;
}

export default function FilterBar({
  active,
  onFilter,
}: FilterBarProps): React.JSX.Element {
  return (
    <div className={styles.filterBar}>
      <div className="container">
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
          {INDUSTRIES.map((industry) => (
            <li key={industry} role="presentation">
              <button
                role="tab"
                aria-selected={active === industry}
                className={clsx(
                  styles.filterPill,
                  active === industry && styles.filterPillActive,
                )}
                onClick={() => onFilter(industry)}
              >
                {industry}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
