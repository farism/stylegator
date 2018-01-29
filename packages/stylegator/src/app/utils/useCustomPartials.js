import * as R from 'ramda'

import { getContext } from './'
import * as defaultPartials from '../partials'

export default (customPartials = {}) =>
  R.map(getContext, Object.assign({}, defaultPartials, customPartials))
