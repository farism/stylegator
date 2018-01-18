webpackJsonp([6],{

/***/ 335:
/***/ (function(module, exports) {

module.exports = "# Authoring Content\n\nYou can author a variety of different types of content using stylegator. Pretty much any [GFM](https://github.github.com/gfm/) is supported via [`react-markdown`](https://github.com/rexxars/react-markdown).\n\nIn order to add a section of content, you must declare it in the `sections` that are provided to the top level `<Stylegator />` component, e.g.\n\n```js\n// src/index.js\n\nimport React from 'react'\nimport ReactDOM from 'react-dom'\nimport { pageLoader, Stylegator } from 'stylegator'\n\nconst sections = [\n  {\n    title: 'Hello World',\n    loader: pageLoader(() => import('./sections/hello-world.md')),\n  },\n]\n\nReactDOM.render(\n  <Stylegator sections={sections} />,\n  document.getElementById('app')\n)\n```\n\n## Interactive code samples\n\nAn interactive code sample can be created by using the `code` directive:\n\n\n    ```code\n    <button>a button</button>\n    ```\n\nThis will create a sandbox for a viewer to play with:\n\n```code\n<button>a button</button>\n```\n"

/***/ })

});