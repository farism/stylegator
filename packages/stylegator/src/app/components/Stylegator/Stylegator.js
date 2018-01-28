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

const Stylegator = ({ components, logo, partials, sections, showAppendix }) => {
  makeGlobal(components)

  const { layout: Layout } = partials

  const routeSections = setSlugs(sections)

  const layoutSections = showAppendix
    ? routeSections.concat([{ title: 'Appendix', path: '/appendix' }])
    : routeSections

  return (
    <div className={styles['styleguider']}>
      <HashRouter>
        <Switch>
          <Layout {...{ logo, partials, sections: layoutSections }}>
            {buildRoutes(partials, routeSections)}
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
    filter: PropTypes.func.isRequired,
    layout: PropTypes.func.isRequired,
    liveMarkdown: PropTypes.func.isRequired,
    logo: PropTypes.func.isRequired,
    menu: PropTypes.func.isRequired,
    menuIcon: PropTypes.func.isRequired,
    menuLink: PropTypes.func.isRequired,
    page: PropTypes.func.isRequired,
    props: PropTypes.func.isRequired,
    sidebar: PropTypes.func.isRequired,
    sidebarToggle: PropTypes.func.isRequired,
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
