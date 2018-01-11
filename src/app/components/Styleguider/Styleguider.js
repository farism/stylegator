import React from 'react'
import PropTypes from 'prop-types'
import { HashRouter, Switch } from 'react-router-dom'

import { buildRoutes, setSlugs, makeGlobal } from '../../utils'

import {
  Content,
  Layout,
  LiveMarkdown,
  Logo,
  Menu,
  MenuIcon,
  MenuLink,
  Page,
  Props,
  Search,
  Sidebar,
  StaticMarkdown,
} from '../'

import styles from './styleguider.scss'

const Styleguider = ({ components, logo, partials, sections: oldSections }) => {
  makeGlobal(components)

  const { layout: Layout } = partials

  const sections = setSlugs(oldSections)

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

Styleguider.propTypes = {
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

Styleguider.defaultProps = {
  components: {},
  partials: {
    content: Content,
    layout: Layout,
    liveMarkdown: LiveMarkdown,
    logo: Logo,
    menu: Menu,
    menuIcon: MenuIcon,
    menuLink: MenuLink,
    page: Page,
    props: Props,
    search: Search,
    sidebar: Sidebar,
    staticMarkdown: StaticMarkdown,
  },
  sections: [],
}

export default Styleguider
