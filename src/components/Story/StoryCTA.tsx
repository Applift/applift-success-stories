import React from 'react';
import styles from './StoryCTA.module.css';

interface StoryCTAProps {
  title?: string;
  description?: string;
}

const PHONE = '+972 50-000-0000';
const PHONE_HREF = 'tel:+972500000000';
const EMAIL = 'hello@applift.io';
const LINKEDIN_URL = 'https://www.linkedin.com/company/applift';
const LINKEDIN_LABEL = 'linkedin.com/company/applift';
const BOOK_A_CALL_URL = 'https://calendar.app.google/HSkhcnShesmiGGvG8';

function GoogleCalendarIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 200 200" width="22" height="22" aria-hidden="true">
      <path fill="#fff" d="M148.882 43.618l-47.368-5.263-57.895 5.263L38.355 96.25l5.264 52.632 52.631 6.579 52.632-6.579 5.263-53.947z" />
      <path fill="#1a73e8" d="M65.211 125.276c-3.934-2.658-6.658-6.539-8.158-11.671l9.132-3.763c.836 3.184 2.296 5.651 4.378 7.401 2.069 1.75 4.586 2.618 7.53 2.618 3.013 0 5.595-.915 7.75-2.745 2.155-1.829 3.237-4.164 3.237-6.992 0-2.895-1.135-5.257-3.408-7.086-2.273-1.83-5.125-2.745-8.533-2.745h-5.276v-9.038h4.737c2.934 0 5.408-.793 7.421-2.378 2.013-1.586 3.02-3.757 3.02-6.52 0-2.461-.902-4.421-2.704-5.888-1.803-1.467-4.083-2.207-6.853-2.207-2.704 0-4.849.717-6.434 2.161s-2.737 3.224-3.434 5.316l-9.038-3.763c1.16-3.289 3.289-6.197 6.408-8.711 3.118-2.514 7.105-3.776 11.947-3.776 3.579 0 6.803.691 9.658 2.082 2.855 1.39 5.099 3.316 6.717 5.764 1.619 2.461 2.421 5.211 2.421 8.263 0 3.118-.75 5.756-2.25 7.928-1.5 2.171-3.342 3.835-5.526 5.001v.539a16.69 16.69 0 016.973 5.448c1.802 2.42 2.711 5.314 2.711 8.696 0 3.382-.862 6.408-2.586 9.065-1.724 2.658-4.105 4.751-7.131 6.276s-6.434 2.296-10.224 2.296c-4.395.013-8.448-1.316-12.382-3.974zm54.51-44.115L109.696 88.5l-5.013-7.605 17.21-12.42h6.894v58.539h-9.066z" />
      <path fill="#ea4335" d="M148.882 200L200 148.882l-25.658-11.842-25.46 11.842-11.842 25.658z" />
      <path fill="#34a853" d="M32.118 174.342l11.842 25.658h105v-51.118h-105z" />
      <path fill="#4285f4" d="M11.842 0C5.263 0 0 5.263 0 11.842v137.04l25.658 11.842 25.46-11.842V51.118h97.764l11.842-25.46L148.882 0z" />
      <path fill="#188038" d="M0 148.882v39.276C0 194.737 5.263 200 11.842 200h39.276v-51.118z" />
      <path fill="#fbbc04" d="M148.882 51.118v97.764H200V51.118l-25.658-11.842z" />
      <path fill="#1967d2" d="M200 51.118V11.842C200 5.263 194.737 0 188.158 0h-39.276v51.118z" />
    </svg>
  );
}

export default function StoryCTA({
  title = 'Have a project in mind?',
  description = "Let's talk about how Applift can help you bring it to life — from architecture to App Store delivery.",
}: StoryCTAProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <ul className={styles.contacts}>
          <li className={styles.contact}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <a href={PHONE_HREF}>{PHONE}</a>
          </li>
          <li className={styles.contact}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li className={styles.contact}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">{LINKEDIN_LABEL}</a>
          </li>
        </ul>

        <a
          className={styles.button}
          href={BOOK_A_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoogleCalendarIcon />
          Book a Call
        </a>
      </div>
    </section>
  );
}
