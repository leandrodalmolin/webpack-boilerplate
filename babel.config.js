// enables @babel/preset-env polyfills
// To clear Babel cache run: rm -rf node_modules/.cache/babel-loader/
// Could be necessary when updating browserslist
//
// https://stackoverflow.com/questions/52625979/confused-about-usebuiltins-option-of-babel-preset-env-using-browserslist-integ
module.exports = {
  presets: [
    ["@babel/preset-env"]
  ]
};