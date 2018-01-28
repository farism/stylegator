import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { inPath } from '../../utils'

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
                {...{ partials, sections: section.sections, depth: depth + 1 }}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

const Menu = ({ partials, sections }) => {
  return (
    <div className={styles['menu']}>
      <MenuList {...{ depth: 0, partials, sections }} />
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
