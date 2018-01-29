import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { filterSections, flattenSections } from '../../utils'

import styles from './menu.scss'

const Menu = ({
  filter,
  partials,
  sections,
  theme: { filterColor = 'red' },
}) => {
  const { MenuList } = partials

  const filteredSections = filter
    ? filterSections(filterColor, filter, flattenSections(sections))
    : sections

  return (
    <div className={styles['menu']}>
      <MenuList {...{ depth: 0, partials, filteredSections }} />
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
