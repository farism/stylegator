import React from 'react'
import PropTypes from 'prop-types'

import styles from './layout.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    const open = this.state.open
    const { children, logo, partials, sections } = this.props
    const {
      content: Content,
      sidebar: Sidebar,
      sidebarToggle: SidebarToggle,
    } = partials

    return (
      <div className={`${styles['layout']} ${open ? styles['open'] : ''}`}>
        <div className={styles['layout-toggle']}>
          <SidebarToggle onClick={() => this.setState({ open: !open })} />
        </div>
        <div
          className={styles['layout-scrim']}
          onClick={() => this.setState({ open: false })}
        />
        <div className={styles['layout-sidebar']}>
          <Sidebar {...{ logo, partials, sections, open }} />
        </div>
        <div className={styles['layout-content']}>
          <Content {...{ partials }}>{children}</Content>
        </div>
      </div>
    )
  }
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
