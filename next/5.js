(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"./src/sections/guides/react.md":function(n,o,e){"use strict";e.r(o),o.default="# React Content\n\nAuthoring documentation for React components is slightly more involved than dealing with static markup.\n\nFirst, we must expose the components we wish to document to Stylegator:\n\n```js\nimport React from 'react'\nimport ReactDOM from 'react-dom'\nimport { Stylegator } from 'stylegator'\n\nimport MyComponent from './src/components/MyComponent'\n\nconst sections = []\n\nconst components = {\n  MyComponent,\n}\n\nReactDOM.render(\n  <Stylegator sections={sections} components={components} />,\n  document.getElementById('app')\n)\n```\n\nOnce components have been exposed, they will be added to the global context and usable in code samples:\n\n```md\n ```code\n <MyComponent />\n ```\n```\n\n```\nWhich will result in an interactive code sample using `react-live`:\n```code\n<MyComponent />\n```\n\n## Displaying component props\n\nStylegator comes with a code directive for rendering the PropTypes of a React component. Using the \"props\" directive, along with the [`prop-types-docs`](https://www.npmjs.com/package/prop-types-docs) package, an author can give more descriptive meanings to the props that a component accepts:\n\n```js\n// src/components/MyComponent.js\n\nimport React from 'react'\nimport PropTypes, { withPropDocs } from 'prop-types-docs'\n\nconst MyComponent = ({ children }) => <div>My Component!</div>\n\nconst myComponentDocs = withPropDocs({\n  name: 'MyComponent',\n  props: {\n    foo: {\n      type: PropTypes.string,\n      required: false,\n      default: 'bar',\n      description: 'This is a foo',\n    },\n    ...\n    bar: {\n      type: PropTypes.oneOf(['red', 'blue']),\n      description: 'This should be an enum',\n    },\n    ...\n  },\n})\n\nconst MySubComponent = ({ children }) => <div>My SubComponent!</div>\n\nconst mySubComponentDocs = withPropDocs({\n  name: 'MySubComponent',\n  props: {\n    foo: {\n      type: PropTypes.string,\n      required: false,\n      default: 'bar',\n      description: 'This is a foo',\n    },\n  },\n})\n\nMyComponent.MySubComponent = mySubComponentDocs(MySubComponent)\n\nexport default myComponentDocs(MyComponent)\n```\n\nWith the component props now having full documentation, we can generate a props table in Stylegator using the \"props\" directive:\n\n```md\n ```props\n component: MyComponent\n ```\n```\n\n```\nwill result in:\n\n```props\ncomponent: MyComponent\n```\n\n## SubComponent props\n\nProp display should work for subcomponents as well:\n\n```md\n ```props\n component: MyComponent.MySubComponent\n ```\n```\n\n```\nwill result in:\n\n```props\ncomponent: MyComponent.MySubComponent\n```\n"}}]);
//# sourceMappingURL=5.js.map