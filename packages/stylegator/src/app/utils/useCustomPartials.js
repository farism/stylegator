import {
  Content,
  Credits,
  Filter,
  Layout,
  LiveMarkdown,
  Logo,
  Menu,
  MenuIcon,
  MenuLink,
  Page,
  PageHeader,
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
      credits: Credits,
      filter: Filter,
      layout: Layout,
      liveMarkdown: LiveMarkdown,
      logo: Logo,
      menu: Menu,
      menuIcon: MenuIcon,
      menuLink: MenuLink,
      page: Page,
      pageHeader: PageHeader,
      props: Props,
      sidebar: Sidebar,
      sidebarToggle: SidebarToggle,
      staticMarkdown: StaticMarkdown,
    },
    partials
  )
