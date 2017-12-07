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
} from '../components'

export default partials =>
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
