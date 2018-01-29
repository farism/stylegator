import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { HashRouter, Switch } from 'react-router-dom'
import { withContext } from 'recompose'
import * as R from 'ramda'

import styles from './stylegator.scss'
import * as defaultPartials from '../'
import {
  buildRoutes,
  setSlugs,
  makeGlobal,
  useCustomPartials,
} from '../../utils'

const funcIsRequired = R.map(c => PropTypes.func.isRequired)

const Stylegator = ({ logo, partials, sections, showAppendix }) => {
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
  partials: PropTypes.shape(funcIsRequired(defaultPartials)),
  sections: PropTypes.array,
  theme: PropTypes.shape({}),
}

Stylegator.defaultProps = {
  components: {},
  partials: useCustomPartials(),
  sections: [],
  theme: {},
}

export default withContext(
  {
    components: PropTypes.shape({}),
    partials: PropTypes.shape(funcIsRequired(defaultPartials)),
    sections: PropTypes.array,
    theme: PropTypes.shape({}),
  },
  ({ components = {}, partials = {}, sections = [], theme = {} }) => ({
    sections: setSlugs(sections),
    components: makeGlobal(components),
    partials,
    theme,
  })
)(Stylegator)
