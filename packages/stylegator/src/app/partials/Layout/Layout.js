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
    const { Content, Sidebar, SidebarToggle } = partials

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
          <Sidebar {...{ logo, open }} />
        </div>
        <div className={styles['layout-content']}>
          <Content>{children}</Content>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  sections: PropTypes.array,
}

Layout.defaultProps = {
  sections: [],
}

export default Layout
