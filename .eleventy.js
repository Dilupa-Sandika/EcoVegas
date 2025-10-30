// .eleventy.js

module.exports = function(eleventyConfig) {

  // =================================================================
  // YOUTUBE EMBED URL FILTER
  // =================================================================
  // මේකෙන් කරන්නේ ඔයා markdown file එකේ දෙන සම්පූර්ණ YouTube URL එකෙන්
  // Video ID එක විතරක් අඳුරගෙන එළියට දෙන එක.
  // උදා: https://www.youtube.com/watch?v=dQw4w9WgXcQ -> dQw4w9WgXcQ
  // මේ filter එක අපි post.njk එකේදී පාවිච්චි කරනවා.
  eleventyConfig.addFilter("youtubeEmbedUrl", (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  });

  // =================================================================
  // POSTS COLLECTION
  // =================================================================
  // 'posts' කියන folder එක ඇතුලේ තියෙන bütün .md files ටික
  // 'posts' නමින් collection එකක් (කාණ්ඩයක්) විදියට හඳුන්වලා දෙනවා.
  // මේක homepage එකේදී bütün සිංදු list කරන්න අවශ්‍ය වෙනවා.
  eleventyConfig.addCollection("posts", function(collectionApi) {
    // 'posts' folder එකේ තියෙන markdown files විතරක් අරගන්න
    return collectionApi.getFilteredByGlob("posts/**/*.md").reverse(); // .reverse() එකෙන් අලුතින්ම දාපු post එක උඩින්ම පෙන්නනවා
  });


  // =================================================================
  // ELEVENTY CONFIGURATION RETURN
  // =================================================================
  // 11ty එකට කියනවා අපේ project එකේ files තියෙන්නේ කොහෙද කියලා.
  return {
    dir: {
      input: ".",          // මුළු project folder එකම input එක
      includes: "_includes", // Layouts වගේ දේවල් තියෙන folder එක
      output: "_site",     // Website එක build වුණාම එන files තියෙන තැන
    },
    // .md files වලටත් Nunjucks template language එක පාවිච්චි කරන්න කියනවා
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };

};