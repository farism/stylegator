import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { filterSections, flattenSections } from '../../utils'

import styles from './menu.scss'

const Menu = ({ filter, partials, sections }) => {
  const { MenuList } = partials

  const menuSections = filter
    ? filterSections(filter, flattenSections(sections))
    : sections

  return (
    <div className={styles['menu']}>
      <MenuList {...{ depth: 0, partials, sections: menuSections }} />
    </div>
  )
}

Menu.propTypes = {
  partials: PropTypes.shape({
    MenuList: PropTypes.func.isRequired,
  }).isRequired,
}

Menu.defaultProps = {}

export default withRouter(Menu)
