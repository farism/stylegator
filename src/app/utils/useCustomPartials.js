import {
  Code,
  Content,
  Layout,
  Logo,
  Markdown,
  Menu,
  MenuIcon,
  MenuLink,
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
      menuIcon: MenuIcon,
      menuLink: MenuLink,
      page: Page,
      search: Search,
      sidebar: Sidebar,
    },
    partials
  )
