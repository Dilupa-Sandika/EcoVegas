// .eleventy.js
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {

  // =================================================================
  // YOUTUBE EMBED URL FILTER
  // =================================================================
  eleventyConfig.addFilter("youtubeEmbedUrl", (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  });

  // =================================================================
  // MARKDOWNIFY FILTER (අලුතෙන් එකතු කළේ)
  // =================================================================
  // Front matter එකේ තියෙන Markdown text, HTML බවට පත්කරන්න
  const md = new markdownIt({
    html: true,
  });
  eleventyConfig.addFilter("markdownify", (content) => {
    return md.render(content);
  });

  // =================================================================
  // POSTS COLLECTION
  // =================================================================
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").reverse();
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