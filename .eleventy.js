// .eleventy.js
const markdownIt = require("markdown-it");
const slugify = require("@sindresorhus/slugify");

module.exports = function(eleventyConfig) {

  // =================================================================
  // FILTERS (Youtube, Markdown, Slugify)
  // =================================================================
  eleventyConfig.addFilter("youtubeEmbedUrl", (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  });

  const md = new markdownIt({
    html: true,
  });
  eleventyConfig.addFilter("markdownify", (content) => {
    return md.render(content);
  });

  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) {
      return;
    }
    return slugify(str, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  });

  // =================================================================
  // COLLECTIONS
  // =================================================================
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").reverse();
  });

  eleventyConfig.addCollection("songsBySinger", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("posts/**/*.md");
    const singers = {};
    posts.forEach((post) => {
      const singerName = post.data.singer;
      if (!singerName) return;
      if (!singers[singerName]) {
        singers[singerName] = [];
      }
      singers[singerName].push(post);
    });
    return Object.keys(singers).map((singerName) => {
      return {
        singerName: singerName,
        songs: singers[singerName].sort((a, b) => new Date(b.date) - new Date(a.date))
      };
    });
  });

  // ⭐️⭐️⭐️ අලුතෙන් එකතු කළේ ⭐️⭐️⭐️
  // =================================================================
  // SONGS BY LANGUAGE COLLECTION
  // =================================================================
  eleventyConfig.addCollection("songsByLanguage", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("posts/**/*.md");
    const languages = {};
    posts.forEach((post) => {
      const languageName = post.data.language;
      if (!languageName) return;
      if (!languages[languageName]) {
        languages[languageName] = [];
      }
      languages[languageName].push(post);
    });
    return Object.keys(languages).map((languageName) => {
      return {
        languageName: languageName,
        songs: languages[languageName].sort((a, b) => new Date(b.date) - new Date(a.date))
      };
    });
  });

  // ⭐️⭐️⭐️ අලුතෙන් එකතු කළේ ⭐️⭐️⭐️
  // =================================================================
  // SONGS BY CATEGORY COLLECTION
  // =================================================================
  eleventyConfig.addCollection("songsByCategory", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("posts/**/*.md");
    const categories = {};
    posts.forEach((post) => {
      const categoryName = post.data.category;
      if (!categoryName) return;
      if (!categories[categoryName]) {
        categories[categoryName] = [];
      }
      categories[categoryName].push(post);
    });
    return Object.keys(categories).map((categoryName) => {
      return {
        categoryName: categoryName,
        songs: categories[categoryName].sort((a, b) => new Date(b.date) - new Date(a.date))
      };
    });
  });

  // =================================================================
  // PASSTHROUGH COPY
  // =================================================================
  eleventyConfig.addPassthroughCopy("posts/**/*.{jpg,jpeg,png,gif,webp,svg}");


  // =================================================================
  // ELEVENTY CONFIGURATION RETURN
  // =================================================================
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};