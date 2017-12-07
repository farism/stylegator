import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import styles from './menu.scss'

const inPath = path => {
  return window.location.hash.indexOf(path) >= 0
}

const Link = ({ children, href }) => <a {...{ href: `#${href}` }}>{children}</a>

const List = ({ sections }) => (
  <ul>
    {sections.map(section => {
      return (
        <li>
          <Link {...{ href: section.path }}>{section.title}</Link>
          {inPath(section.path) && section.sections ? (
            <List {...{ sections: section.sections }} />
          ) : null}
        </li>
      )
    })}
  </ul>
)

const Menu = ({ sections }) => {
  return (
    <div className={styles['menu']}>
      <List {...{ sections }} />
    </div>
  )
}

Menu.propTypes = {}

Menu.defaultProps = {}

export default withRouter(Menu)
