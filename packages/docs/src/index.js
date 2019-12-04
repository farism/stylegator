import React from 'react'
import ReactDOM from 'react-dom'
import { useCustomPartials, pageLoader, Stylegator } from 'stylegator'

import Logo from './partials/Logo'
import PageHeader from './partials/PageHeader'
import MyComponent from './components/MyComponent'

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
        title: 'Directory Structure',
        loader: pageLoader(() => import('./sections/guides/structure.md')),
      },
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
        title: 'The Appendix',
        loader: pageLoader(() => import('./sections/guides/appendix.md')),
      },
      {
        title: 'Hidden Page',
        loader: () => () => <div />,
        hidden: true,
      },
    ],
  },
  // {
  //   title: 'Appendix',
  //   loader: pageLoader(() => import('./sections/__appendix.md')),
  // },
]

const components = { MyComponent }

const partials = useCustomPartials({
  Logo,
  PageHeader,
})

const theme = {
  linkColor: '#aeca3f',
  filterColor: '#aeca3f',
}

const render = () =>
  ReactDOM.render(
    <Stylegator {...{ components, partials, sections, theme }} />,
    document.getElementById('app')
  )

if (module.hot) {
  module.hot.accept(render)
}

render()
