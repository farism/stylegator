webpackJsonp([4],{

/***/ 334:
/***/ (function(module, exports) {

module.exports = "# Installation\n\nUse npm to install `Stylegator`\n\n```sh\nyarn add stylegator -D\nnpm install -D stylegator\n```\n\n# Configure an `index.html` page\n\n```html\n<-- src/template.html -->\n\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\">\n    <title><%= htmlWebpackPlugin.options.title %></title>\n  </head>\n  <body>\n    <div id=\"app\" />\n  </body>\n</html>\n\n```\n\n```js\n// stylegator.config.js\n\nmodule.exports = {\n  template: 'src/index.html',\n  title: 'Docs'\n}\n```\n\n# Setup the `src/index.js` entry point\n\nStylegator expects an index file to live at `src/index.js`. This will be used as the entry point for `webpack`.\n\n```js\n// src/index.js\n\nimport React from 'react'\nimport ReactDOM from 'react-dom'\nimport { pageLoader, Stylegator } from 'stylegator'\n\nconst sections = [\n  {\n    title: 'Hello World',\n    loader: pageLoader(() => import('./sections/hello-world.md')),\n  },\n]\n\nReactDOM.render(\n  <Stylegator sections={sections} />,\n  document.getElementById('app')\n)\n```\n\n# Author some content\n\n```md\n// src/sections/hello-world.md\n\n# Hello World!\n```\n\nSee the [Authoring Content](#authoring-content) section for more information.\n"

/***/ })

});