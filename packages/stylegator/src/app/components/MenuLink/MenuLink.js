import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const styles = require('./menuLink.scss')

const MenuLink = ({ depth, section, partials }) => {
  const { menuIcon: MenuIcon } = partials

  return (
    <NavLink
      {...{
        className: `${styles['menu-link']} depth-${depth}`,
        activeClassName: 'active',
        to: `${section.path}`,
      }}
    >
      <MenuIcon {...{ section }} />
      <span dangerouslySetInnerHTML={{ __html: section.title }} />
    </NavLink>
  )
}

MenuLink.propTypes = {}

MenuLink.defaultProps = {}

export default MenuLink
