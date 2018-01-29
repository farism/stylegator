import { getContext } from 'recompose'
import PropTypes from 'prop-types'

export default Component =>
  getContext({
    components: PropTypes.shape({}),
    partials: PropTypes.shape({}),
    sections: PropTypes.array,
    showAppendix: PropTypes.bool,
    theme: PropTypes.shape({}),
  })(Component)
