import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { filterSections, flattenSections, inPath } from '../../utils'

import styles from './menu.scss'

const MenuList = ({ depth, partials, sections }) => {
  const { menuLink: MenuLink } = partials

  return (
    <ul>
      {sections.map((section, i) => {
        return (
          <li key={i}>
            <MenuLink {...{ depth, partials, section }} />
            {inPath(section.path) && section.sections ? (
              <MenuList
                {...{ depth: depth + 1, partials, sections: section.sections }}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

const Menu = ({ filter, partials, sections }) => {
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
    menuLink: PropTypes.func.isRequired,
  }).isRequired,
}

Menu.defaultProps = {}

export default withRouter(Menu)
