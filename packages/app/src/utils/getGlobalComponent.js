export const getDeep = (path, obj) =>
  path.split('.').reduce((context, cur) => (context || {})[cur], obj)

export default (path, scope) =>
  getDeep(path, scope) || getDeep(path, window) || {}
