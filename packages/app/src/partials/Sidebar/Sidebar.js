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
    const { logo, open, partials } = this.props
    const { Credits, Filter, Logo, Menu } = partials

    return (
      <div className={`${styles['sidebar']} ${open ? styles['open'] : ''}`}>
        <Logo {...{ src: logo }} />
        <Filter onInput={e => this.setState({ filter: e.target.value })} />
        <Menu {...{ filter }} />
        <Credits />
      </div>
    )
  }
}

Sidebar.propTypes = {
  partials: PropTypes.shape({
    Credits: PropTypes.func.isRequired,
    Filter: PropTypes.func.isRequired,
    Logo: PropTypes.func.isRequired,
    Menu: PropTypes.func.isRequired,
  }).isRequired,
  sections: PropTypes.array,
}

Sidebar.defaultProps = {
  sections: [],
}

export default Sidebar
