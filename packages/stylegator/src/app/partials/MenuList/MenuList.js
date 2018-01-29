import React from 'react'
import PropTypes from 'prop-types'

import styles from './menuList.scss'
import { inPath } from '../../utils'

const MenuList = ({ depth, partials, sections, filteredSections }) => {
  const { MenuLink } = partials

  return (
    <ul>
      {filteredSections.map((section, i) => {
        return (
          <li key={i}>
            <MenuLink {...{ depth, section }} />
            {inPath(section.path) && section.sections ? (
              <MenuList
                {...{
                  depth: depth + 1,
                  filteredSections: section.sections,
                  partials,
                }}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

MenuList.propTypes = {
  partials: PropTypes.shape({
    MenuLink: PropTypes.func.isRequired,
  }).isRequired,
}

MenuList.defaultProps = {}

export default MenuList
