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

      return files.map((file) => {
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
    },

    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
};
