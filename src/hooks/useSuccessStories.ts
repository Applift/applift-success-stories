import {usePluginData} from '@docusaurus/useGlobalData';
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

  return stories.map((story) => ({
    slug: story.slug,
    clientName: story.title,
    industry: (story.tags[0] ?? 'Other') as CaseStudy['industry'],
    summary: story.description,
    heroImage: story.hero_image,
    techStack: story.tech_stack,
    results: story.results,
    link: `/success-stories/${story.slug}`,
  }));
}
