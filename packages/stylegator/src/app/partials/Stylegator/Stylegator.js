import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { HashRouter, Switch } from 'react-router-dom'
import { withContext } from 'recompose'

import styles from './stylegator.scss'
import {
  buildRoutes,
  defaultPartials,
  makeGlobal,
  setSlugs,
  useCustomPartials,
} from '../../utils'

const Stylegator = ({ logo, partials, sections }) => {
  const { Layout } = partials

  return (
    <div className={styles['stylegator']}>
      <HashRouter>
        <Switch>
          <Layout {...{ logo }}>{buildRoutes(setSlugs(sections))}</Layout>
        </Switch>
      </HashRouter>
    </div>
  )
}

Stylegator.propTypes = {
  components: PropTypes.shape({}),
  logo: PropTypes.string,
  partials: defaultPartials,
  sections: PropTypes.array,
  showAppendix: PropTypes.bool,
  theme: PropTypes.shape({}),
}

Stylegator.defaultProps = {
  components: {},
  partials: useCustomPartials(),
  sections: [],
  showAppendix: true,
  theme: {},
}

export default withContext(
  {
    components: PropTypes.shape({}),
    partials: defaultPartials,
    sections: PropTypes.array,
    showAppendix: PropTypes.bool,
    theme: PropTypes.shape({}),
  },
  ({
    components = {},
    partials = {},
    sections = [],
    showAppendix = true,
    theme = {},
  }) => ({
    components: makeGlobal(components),
    partials,
    sections: setSlugs(sections),
    showAppendix,
    theme,
  })
)(Stylegator)
