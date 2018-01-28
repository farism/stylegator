import {
  Content,
  Filter,
  Layout,
  LiveMarkdown,
  Logo,
  Menu,
  MenuIcon,
  MenuLink,
  Page,
  Props,
  Sidebar,
  SidebarToggle,
  StaticMarkdown,
} from '../components'

export default (partials = {}) =>
  Object.assign(
    {},
    {
      content: Content,
      filter: Filter,
      layout: Layout,
      liveMarkdown: LiveMarkdown,
      logo: Logo,
      menu: Menu,
      menuIcon: MenuIcon,
      menuLink: MenuLink,
      page: Page,
      props: Props,
      sidebar: Sidebar,
      sidebarToggle: SidebarToggle,
      staticMarkdown: StaticMarkdown,
    },
    partials
  )
