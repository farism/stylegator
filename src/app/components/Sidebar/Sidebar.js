import React from 'react'
import PropTypes from 'prop-types'

import styles from './sidebar.scss'

const Sidebar = ({ logo, partials, sections }) => {
  const { logo: Logo, menu: Menu } = partials

  return (
    <div className={styles['sidebar']}>
      <Logo {...{ src: logo }} />
      <Menu {...{ partials, sections }} />
    </div>
  )
}

Sidebar.propTypes = {
  partials: PropTypes.shape({
    logo: PropTypes.func.isRequired,
    menu: PropTypes.func.isRequired,
  }).isRequired,
  sections: PropTypes.array,
}

Sidebar.defaultProps = {
  sections: [],
}

export default Sidebar
