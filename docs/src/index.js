import React from 'react'
import ReactDOM from 'react-dom'
import { useCustomPartials, pageLoader, Stylegator } from 'stylegator'

import logo from './assets/logo.png'
import Logo from './partials/Logo'
import MenuIcon from './partials/MenuIcon'
import Button from './react/Button'

const sections = [
  {
    icon: 'introduction',
    title: 'Introduction',
    sections: [
      {
        title: 'Overview & Faq',
        loader: pageLoader(() => import('./sections/introduction/overview.md')),
      },
    ],
  },
  {
    icon: 'elements',
    title: 'Elements',
    sections: [
      {
        title: 'Avatar',
        loader: pageLoader(() => import('./sections/elements/avatar.md')),
      },
      {
        title: 'Button',
        loader: pageLoader(() => import('./sections/elements/button.md')),
      },
    ],
  },
  {
    icon: 'layouts',
    title: 'Layouts',
    sections: [
      {
        title: 'Avatar',
        loader: pageLoader(() => import('./sections/elements/avatar.md')),
      },
      {
        title: 'Button',
        loader: pageLoader(() => import('./sections/elements/button.md')),
      },
    ],
  },
]

const components = { Button }

const partials = useCustomPartials({
  logo: Logo,
  menuIcon: MenuIcon,
})

ReactDOM.render(
  <Stylegator {...{ partials, components, sections, logo }} />,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}
