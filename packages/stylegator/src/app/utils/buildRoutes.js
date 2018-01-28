import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { pageLoader } from './'

const buildRoute = (partials, { title, path, loader }) => (
  <Route
    {...{
      key: title,
      path,
      component: loader(partials),
    }}
  />
)

const buildAppendix = partials => (
  <Route
    {...{
      key: 'Appendix',
      path: '/appendix',
      component: pageLoader(() => import('../assets/__appendix.md'))(partials),
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

const buildRoutes = (partials, sections) =>
  sections.reduce(
    (acc, section) =>
      section.sections
        ? acc
            .concat(buildRoutes(partials, section.sections))
            .concat([buildRedirect(section)])
        : acc.concat([buildRoute(partials, section)]),
    []
  )

export default (partials, sections) =>
  buildRoutes(partials, sections).concat([
    buildAppendix(partials),
    buildRedirect({ title: 'home', path: '/', sections: sections }),
  ])
