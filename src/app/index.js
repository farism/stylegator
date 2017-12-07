import './index.scss'

import {
  Code,
  Content,
  Layout,
  Logo,
  Markdown,
  Menu,
  Page,
  Search,
  Sidebar,
} from './components'

export const customPartials = partials =>
  Object.assign(
    {},
    {
      code: Code,
      content: Content,
      layout: Layout,
      logo: Logo,
      markdown: Markdown,
      menu: Menu,
      page: Page,
      search: Search,
      sidebar: Sidebar,
    },
    partials
  )

export { default as Styleguider } from './components/Styleguider'

export * from './utils'
