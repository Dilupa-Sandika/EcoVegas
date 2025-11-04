// .eleventy.js
const markdownIt = require("markdown-it");
const slugify = require("@sindresorhus/slugify");

module.exports = function(eleventyConfig) {

  // =================================================================
  // FILTERS
  // =================================================================
  eleventyConfig.addFilter("youtubeEmbedUrl", (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(RegExp);
    return (match && match[2].length === 11) ? match[2] : null;
  });

  const md = new markdownIt({
    html: true,
  });
  eleventyConfig.addFilter("markdownify", (content) => {
    if (!content) return "";
    return md.render(content);
  });

  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return "";
    return slugify(str, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  });

  // ⭐️⭐️⭐️ SEO FILTERS (අලුතෙන් එකතු කළේ) ⭐️⭐️⭐️
  
  // Date එක ISO format (YYYY-MM-DD) එකට හරවන්න
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return "";
    try {
      return new Date(dateObj).toISOString().split('T')[0];
    } catch (e) {
      console.error(`Error formatting date ${dateObj}:`, e);
      return "";
    }
  });

  // HTML tags අයින් කරලා text එකක් truncate කරන්න
  eleventyConfig.addFilter("truncate", (str, len = 150) => {
    if (!str) return "";
    let s = str.replace(/(<([^>]+)>)/ig, ''); // Remove HTML tags
    s = s.replace(/\s+/g, ' ').trim(); // Remove extra whitespace
    if (s.length <= len) return s;
    return s.slice(0, len) + "...";
  });
  
  // HTML tags අයින් කරන්න
  eleventyConfig.addFilter("striptags", (str) => {
    if (!str) return "";
    return str.replace(/(<([^>]+)>)/ig, '').replace(/\s+/g, ' ').trim();
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
      if (!singers[singerName]) singers[singerName] = [];
      singers[singerName].push(post);
    });
    return Object.keys(singers).map((singerName) => {
      return {
        singerName: singerName,
        songs: singers[singerName].sort((a, b) => new Date(b.date) - new Date(a.date))
      };
    });
  });

  eleventyConfig.addCollection("songsByLanguage", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("posts/**/*.md");
    const languages = {};
    posts.forEach((post) => {
      const languageName = post.data.language;
      if (!languageName) return;
      if (!languages[languageName]) languages[languageName] = [];
      languages[languageName].push(post);
    });
    return Object.keys(languages).map((languageName) => {
      return {
        languageName: languageName,
        songs: languages[languageName].sort((a, b) => new Date(b.date) - new Date(a.date))
      };
    });
  });

  eleventyConfig.addCollection("songsByCategory", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("posts/**/*.md");
    const categories = {};
    posts.forEach((post) => {
      const categoryName = post.data.category;
      if (!categoryName) return;
      if (!categories[categoryName]) categories[categoryName] = [];
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