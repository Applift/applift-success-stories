const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

module.exports = function successStoriesDataPlugin(context) {
  return {
    name: 'success-stories-data',

    async loadContent() {
      const storiesDir = path.join(context.siteDir, 'stories');
      const files = fs
        .readdirSync(storiesDir)
        .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

      const pinnedFirst = ['jotit', 'riseup', 'mako', 'openweb', 'unit'];
      const pinnedLast = ['battery'];

      const stories = files.map((file) => {
        const raw = fs.readFileSync(path.join(storiesDir, file), 'utf-8');
        const {data} = matter(raw);
        const slug = file.replace(/\.mdx?$/, '');
        return {
          slug,
          title: data.title ?? slug,
          description: data.description ?? '',
          tags: data.tags ?? [],
          hero_image: data.hero_image ?? '',
          tech_stack: data.tech_stack ?? [],
          general_tags: data.general_tags ?? [],
          results: data.results,
        };
      });

      return stories.sort((a, b) => {
        const ai = pinnedFirst.indexOf(a.slug);
        const bi = pinnedFirst.indexOf(b.slug);
        const aLast = pinnedLast.includes(a.slug);
        const bLast = pinnedLast.includes(b.slug);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        if (aLast && !bLast) return 1;
        if (!aLast && bLast) return -1;
        return 0;
      });
    },

    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
};
