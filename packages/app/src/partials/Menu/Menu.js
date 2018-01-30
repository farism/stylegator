import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { filterSections, flattenSections } from '../../utils'

import styles from './menu.scss'

const Menu = ({
  filter,
  partials,
  sections,
  showAppendix,
  theme: { filterColor = 'red' },
}) => {
  const { MenuLink, MenuList } = partials

  const withAppendix = showAppendix
    ? sections.concat({ title: 'Appendix', path: '/appendix' })
    : sections

  const filteredSections = filter
    ? filterSections(filterColor, filter, flattenSections(withAppendix))
    : withAppendix

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
