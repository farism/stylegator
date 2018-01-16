import React from 'react'
import ReactDOM from 'react-dom'
import { useCustomPartials, pageLoader, Stylegator } from 'stylegator'

import logo from './assets/logo.png'
import Button from './react/Button'

const sections = [
  {
    title: 'Introduction',
    loader: pageLoader(() => import('./sections/introduction.md')),
  },
  {
    title: 'Getting Started',
    loader: pageLoader(() => import('./sections/getting-started.md')),
  },
  {
    title: 'Authoring Content',
    loader: pageLoader(() => import('./sections/authoring-content.md')),
  },
  {
    title: 'Configuration',
    loader: pageLoader(() => import('./sections/configuration.md')),
  },
  {
    title: 'Guides',
    sections: [
      {
        title: 'Custom Partials',
        loader: pageLoader(() => import('./sections/guides/partials.md')),
      },
      {
        title: 'Static Content',
        loader: pageLoader(() => import('./sections/guides/static.md')),
      },
      {
        title: 'React Content',
        loader: pageLoader(() => import('./sections/guides/react.md')),
      },
      {
        title: 'Globals',
        loader: pageLoader(() => import('./sections/guides/globals.md')),
      },
    ],
  },
]

const components = { Button }

ReactDOM.render(
  <Stylegator {...{ components, sections, logo }} />,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}
