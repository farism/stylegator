import React from 'react'
import PropTypes from 'prop-types'

import styles from './sidebar.scss'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filter: '' }
  }

  render() {
    const filter = this.state.filter
    const { logo, open, partials, sections } = this.props
    const { filter: Filter, logo: Logo, menu: Menu } = partials

    return (
      <div className={`${styles['sidebar']} ${open ? styles['open'] : ''}`}>
        <Logo {...{ src: logo }} />
        <Filter onInput={e => this.setState({ filter: e.target.value })} />
        <Menu {...{ filter, partials, sections }} />
      </div>
    )
  }
}

Sidebar.propTypes = {
  partials: PropTypes.shape({
    filter: PropTypes.func.isRequired,
    logo: PropTypes.func.isRequired,
    menu: PropTypes.func.isRequired,
  }).isRequired,
  sections: PropTypes.array,
}

Sidebar.defaultProps = {
  sections: [],
}

export default Sidebar
