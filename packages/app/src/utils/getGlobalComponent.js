export default path =>
  path.split('.').reduce((context, cur) => context[cur] || {}, window)
