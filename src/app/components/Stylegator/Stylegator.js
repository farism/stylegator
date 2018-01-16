import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { HashRouter, Switch } from 'react-router-dom'

import {
  buildRoutes,
  setSlugs,
  makeGlobal,
  useCustomPartials,
} from '../../utils'

import styles from './stylegator.scss'

const Stylegator = ({ components, logo, partials, sections: oldSections }) => {
  makeGlobal(components)

  const sections = setSlugs(oldSections)

  const { layout: Layout } = partials

  return (
    <div className={styles['styleguider']}>
      <HashRouter>
        <Switch>
          <Layout {...{ logo, partials, sections }}>
            {buildRoutes(partials, sections)}
          </Layout>
        </Switch>
      </HashRouter>
    </div>
  )
}

Stylegator.propTypes = {
  components: PropTypes.shape({}),
  logo: PropTypes.string,
  partials: PropTypes.shape({
    content: PropTypes.func.isRequired,
    layout: PropTypes.func.isRequired,
    liveMarkdown: PropTypes.func.isRequired,
    logo: PropTypes.func.isRequired,
    menu: PropTypes.func.isRequired,
    menuIcon: PropTypes.func.isRequired,
    menuLink: PropTypes.func.isRequired,
    page: PropTypes.func.isRequired,
    props: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    sidebar: PropTypes.func.isRequired,
    staticMarkdown: PropTypes.func.isRequired,
  }),
  sections: PropTypes.array,
}

Stylegator.defaultProps = {
  components: {},
  partials: useCustomPartials(),
  sections: [],
}

export default Stylegator
