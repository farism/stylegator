import {
  Content,
  Layout,
  LiveMarkdown,
  Logo,
  Menu,
  MenuIcon,
  MenuLink,
  Page,
  Props,
  Search,
  Sidebar,
  StaticMarkdown,
} from '../components'

export default partials =>
  Object.assign(
    {},
    {
      content: Content,
      layout: Layout,
      liveMarkdown: LiveMarkdown,
      logo: Logo,
      menu: Menu,
      menuIcon: MenuIcon,
      menuLink: MenuLink,
      page: Page,
      props: Props,
      search: Search,
      sidebar: Sidebar,
      staticMarkdown: StaticMarkdown,
    },
    partials
  )
