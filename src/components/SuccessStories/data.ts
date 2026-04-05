export type Industry =
  | 'Media'
  | 'AdTech'
  | 'FinTech'
  | 'GovTech'
  | 'Social'
  | 'Venture Capital'
  | 'Productivity';

export interface CaseStudy {
  slug: string;
  clientName: string;
  industry: Industry;
  summary: string;
  heroImage: string;
  techStack: string[];
  results?: string;
  link: string;
}

export const INDUSTRIES: Industry[] = [
  'Media',
  'AdTech',
  'FinTech',
  'GovTech',
  'Social',
  'Venture Capital',
  'Productivity',
];
