# The Appendix

Stylegator will recognize a special section named `__appendix.md`. In order to use this section, add it as an entry in your `sections` list:

```js
// index.js

const sections = [
  ...,
  {
    title: 'Appendix',
    loader: pageLoader(() => import('./sections/__appendix.md')),
  }
]

ReactDOM.render(
  <Stylegator {...{ sections }}/>,
  document.getElementById('app')
)
```

Under the hood, a Webpack plugin will concatenate all of the sibling sections declared in the same `index.js` file and write the result to the `__appendix` asset.

**Note:**

Because of the Webpack plugin usage live reload is currently not working. You will need to restart your dev server or re-build in order to see appendix updates.
