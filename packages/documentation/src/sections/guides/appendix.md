# The Appendix

Stylegator automatically creates an `/appendix` route. This is a concatenation of all the pages in the styleguide.

By default, there will be no navigation item for this page displayed in the sidebar.

If you wish to enable it in the navigation, you can pass `showAppendix: true`:

```js
ReactDOM.render(
  <Stylegator sections={...} showAppendix={true} />,
  document.getElementById('app')
)
```

**Note:**

The Appendix currently relies on a Webpack plugin and it does not live reload. You will need to restart your dev server or re-build in order to see appendix updates.
