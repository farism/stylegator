import React from 'react'
import PropTypes from 'prop-types'

import styles from './layout.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const open = this.state.sidebarOpen
    const { children, logo, partials, sections } = this.props
    const {
      content: Content,
      sidebar: Sidebar,
      sidebarToggle: SidebarToggle,
    } = partials

    return (
      <div className={`${styles['layout']} ${open ? styles['open'] : ''}`}>
        <SidebarToggle
          {...{ open, onClick: () => this.setState({ sidebarOpen: !open }) }}
        />
        <Sidebar {...{ logo, partials, sections, open }} />
        <Content {...{ partials }}>{children}</Content>
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
