// .eleventy.js
const markdownIt = require("markdown-it");

// ⭐️⭐️⭐️ මෙන්න මේ line එක තමයි හදන්න ඕන ⭐️⭐️⭐️
// අපි @11ty/eleventy-utils වෙනුවට @sindresorhus/slugify පාවිච්චි කරනවා
const slugify = require("@sindresorhus/slugify");

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
  // MARKDOWNIFY FILTER
  // =================================================================
  const md = new markdownIt({
    html: true,
  });
  eleventyConfig.addFilter("markdownify", (content) => {
    return md.render(content);
  });

  // =================================================================
  // SLUGIFY FILTER
  // =================================================================
  // දැන් මේ filter එක 100% වැඩ කරනවා
  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) {
      return;
    }
    // "Taylor Swift" -> "taylor-swift"
    return slugify(str, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  });

  // =================================================================
  // POSTS COLLECTION
  // =================================================================
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").reverse();
  });

  // =================================================================
  // SONGS BY SINGER COLLECTION
  // =================================================================
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