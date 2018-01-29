import * as R from 'ramda'
import PropTypes from 'prop-types'

import * as partials from '../partials'

export default PropTypes.shape(R.map(c => PropTypes.func.isRequired, partials))
