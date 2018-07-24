import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { pageLoader } from './'

const buildRoute = ({ path, loader, ...section }) => (
  <Route
    {...{
      key: section.title,
      path,
      component: loader(section),
    }}
  />
)

const buildRedirect = ({ title, path, loader, sections }) => (
  <Route
    {...{
      key: title,
      path,
      render: () => <Redirect {...{ to: sections[0].path }} />,
      exact: true,
    }}
  />
)

const buildRoutes = sections =>
  sections.reduce(
    (acc, section) =>
      section.sections
        ? acc
            .concat(buildRoutes(section.sections))
            .concat([buildRedirect(section)])
        : acc.concat([buildRoute(section)]),
    []
  )

export default sections =>
  buildRoutes(sections).concat([
    buildRedirect({ title: 'home', path: '/', sections: sections }),
  ])
