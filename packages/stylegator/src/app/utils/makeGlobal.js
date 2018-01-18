export default (obj = {}) =>
  Object.keys(obj).forEach(key => ((window || {})[key] = obj[key]))
