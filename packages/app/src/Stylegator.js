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

const Stylegator = ({ basename, logo, partials, sections, browserRouter }) => {
  const { Layout } = partials
  const RouterComponent = browserRouter ? BrowserRouter : HashRouter

  return (
    <RouterComponent {...{ basename }}>
      <Switch>
        <Layout {...{ logo }}>{buildRoutes(setSlugs(sections))}</Layout>
      </Switch>
    </RouterComponent>
  )
}

Stylegator.propTypes = {
  basename: PropTypes.string,
  components: PropTypes.shape({}),
  logo: PropTypes.string,
  partials: partialsPropTypes,
  sections: PropTypes.array,
  theme: PropTypes.shape({}),
  browserRouter: PropTypes.bool,
}

Stylegator.defaultProps = {
  components: {},
  partials: useCustomPartials(),
  sections: [],
  theme: {},
  browserRouter: false,
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
    browserRouter = false,
  }) => ({
    components: makeGlobal(components),
    partials,
    sections: setSlugs(sections),
    theme,
  })
)(Stylegator)
