import React from 'react';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import styles from './BackToProjectsNavbarItem.module.css';

type Story = { slug: string; title: string };

export default function BackToProjectsNavbarItem() {
  const { pathname } = useLocation();
  const baseUrl = useBaseUrl('/');
  const stories = usePluginData('success-stories-data') as Story[] | undefined;

  const normalizedBase = baseUrl.replace(/\/$/, '');
  const isHomepage = pathname === baseUrl || pathname === normalizedBase;

  let storyTitle: string | null = null;
  if (!isHomepage) {
    const slug = pathname.replace(normalizedBase, '').replace(/^\/|\/$/g, '');
    storyTitle = stories?.find((s) => s.slug === slug)?.title ?? null;
  }

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <span className={styles.separator} aria-hidden="true">›</span>
      {isHomepage ? (
        <span className={styles.current} aria-current="page">Success Stories</span>
      ) : (
        <>
          <Link to={baseUrl} className={styles.link}>Success Stories</Link>
          {storyTitle && (
            <>
              <span className={styles.separator} aria-hidden="true">›</span>
              <span className={styles.current} aria-current="page">{storyTitle}</span>
            </>
          )}
        </>
      )}
    </nav>
  );
}
