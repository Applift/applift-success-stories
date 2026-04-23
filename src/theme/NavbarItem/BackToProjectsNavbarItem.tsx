import React from 'react';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './BackToProjectsNavbarItem.module.css';

export default function BackToProjectsNavbarItem(): JSX.Element | null {
  const { pathname } = useLocation();
  const baseUrl = useBaseUrl('/');

  const isHomepage = pathname === baseUrl || pathname === baseUrl.replace(/\/$/, '');
  if (isHomepage) return null;

  return (
    <Link to={baseUrl} className={styles.btn}>
      ← Back to Projects
    </Link>
  );
}
