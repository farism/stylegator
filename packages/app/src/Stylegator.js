import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, HashRouter, Switch } from 'react-router-dom'
import { withContext } from 'recompose'

import {
  buildRoutes,
  partialsPropTypes,
  makeGlobal,
  setSlugs,
  useCustomPartials,
} from './utils'

const Stylegator = ({ basename, logo, partials, sections, router }) => {
  const { Layout } = partials

  if (router === 'browser') {
    ;<BrowserRouter {...{ basename }}>
      <Switch>
        <Layout {...{ logo }}>{buildRoutes(setSlugs(sections))}</Layout>
      </Switch>
    </BrowserRouter>
  }

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
  theme: PropTypes.shape({}),
  router: PropTypes.string,
}

Stylegator.defaultProps = {
  components: {},
  partials: useCustomPartials(),
  sections: [],
  theme: {},
  router: 'hash',
}

export default withContext(
  {
    components: PropTypes.shape({}),
    partials: partialsPropTypes,
    sections: PropTypes.array,
    theme: PropTypes.shape({}),
  },
  ({
    components = {},
    partials = useCustomPartials(),
    sections = [],
    theme = {},
    router = 'hash',
  }) => ({
    components: makeGlobal(components),
    partials,
    sections: setSlugs(sections),
    theme,
  })
)(Stylegator)
