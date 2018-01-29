webpackJsonp([5],{

/***/ "./src/sections/guides/appendix.md":
/***/ (function(module, exports) {

module.exports = "# The Appendix\n\nStylegator automatically creates an `/appendix` route. This is a concatenation of all the pages in the styleguide.\n\nBy default, there will be no navigation item for this page displayed in the sidebar.\n\nIf you wish to enable it in the navigation, you can pass `showAppendix: true`:\n\n```js\nReactDOM.render(\n  <Stylegator sections={...} showAppendix={true} />,\n  document.getElementById('app')\n)\n```\n\n**Note:**\n\nThe Appendix currently relies on a Webpack plugin and it does not live reload. You will need to restart your dev server or re-build in order to see appendix updates.\n"

/***/ })

});