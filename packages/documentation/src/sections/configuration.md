Stylegator can be configured through the `stylegator.config.js` file.

The following is an annotated configuration object:

```js
// styleguide.config.js

module.exports = {
  // The source directory
  srcDir: 'src',

  // Entry point for webpack,
  entryPoint: 'index.js',

  // The build output directory
  buildDir: 'build',

  // The path of the html template file - used by `html-webpack-plugin`
  template: 'index.html',

  // The title of the website - used by `html-webpack-plugin`
  title: 'My App'
}
```
