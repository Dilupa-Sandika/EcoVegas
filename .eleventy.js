// .eleventy.js

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
  // POSTS COLLECTION
  // =================================================================
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").reverse();
  });

  // =================================================================
  // PASSTHROUGH COPY
  // =================================================================
  // අපි posts folder එක ඇතුළේ තියෙන හැම image එකක්ම _site එකට copy කරනවා
  // මේකෙන් song folder එක ඇතුළේ තියෙන album art copy වෙනවා.
  eleventyConfig.addPassthroughCopy("posts/**/*.{jpg,jpeg,png,gif,webp,svg}");


  // =================================================================
  // ELEVENTY CONFIGURATION RETURN
  // =================================S================================
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