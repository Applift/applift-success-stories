import {usePluginData} from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {CaseStudy} from '@site/src/components/SuccessStories/data';

interface StoryData {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  hero_image: string;
  tech_stack: string[];
  results?: string;
}

export function useSuccessStories(): CaseStudy[] {
  const stories = usePluginData('success-stories-data') as StoryData[];
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl.replace(/\/$/, '');

  return stories.map((story) => ({
    slug: story.slug,
    clientName: story.title,
    tags: story.tags ?? [],
    summary: story.description,
    heroImage: story.hero_image ? `${baseUrl}${story.hero_image}` : '',
    techStack: story.tech_stack,
    results: story.results,
    link: `/success-stories/${story.slug}`,
  }));
}
