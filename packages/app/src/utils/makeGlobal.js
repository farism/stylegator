import * as R from 'ramda'

export default R.mapObjIndexed((val, key) => {
  window[key] = val

  return val
})
