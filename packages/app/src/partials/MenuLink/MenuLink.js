import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const styles = require('./menuLink.scss')

const MenuLink = ({
  depth,
  section,
  partials,
  theme: { linkBgColor = '#fff', linkColor = 'red' },
}) => {
  const { MenuIcon } = partials

  return (
    <NavLink
      {...{
        className: `${styles['menu-link']} depth-${depth}`,
        activeStyle: { background: linkBgColor, color: linkColor },
        to: `${section.path}`,
      }}
    >
      <MenuIcon {...{ section }} />
      <div dangerouslySetInnerHTML={{ __html: section.title }} />
    </NavLink>
  )
}

MenuLink.propTypes = {}

MenuLink.defaultProps = {}

export default MenuLink
