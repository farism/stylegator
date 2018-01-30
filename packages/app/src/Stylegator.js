import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { HashRouter, Switch } from 'react-router-dom'
import { withContext } from 'recompose'

import {
  buildRoutes,
  partialsPropTypes,
  makeGlobal,
  setSlugs,
  useCustomPartials,
} from './utils'

const Stylegator = ({ basename, logo, partials, sections }) => {
  const { Layout } = partials

  return (
    <HashRouter {...{ basename }}>
      <Switch>
        <Layout {...{ logo }}>{buildRoutes(setSlugs(sections))}</Layout>
      </Switch>
    </HashRouter>
  )
}

Stylegator.propTypes = {
  basename: PropTypes.string,
  components: PropTypes.shape({}),
  logo: PropTypes.string,
  partials: partialsPropTypes,
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
    partials: partialsPropTypes,
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
