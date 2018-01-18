import React from 'react'
import PropTypes from 'prop-types'

import styles from './layout.scss'

const Layout = ({ children, logo, partials, sections }) => {
  const { content: Content, sidebar: Sidebar } = partials

  return (
    <div className={styles['layout']}>
      <Sidebar {...{ logo, partials, sections }} />
      <Content {...{ partials }}>{children}</Content>
    </div>
  )
}

Layout.propTypes = {
  partials: PropTypes.shape({
    content: PropTypes.func.isRequired,
    sidebar: PropTypes.func.isRequired,
  }).isRequired,
  sections: PropTypes.array,
}

Layout.defaultProps = {
  sections: [],
}

export default Layout
