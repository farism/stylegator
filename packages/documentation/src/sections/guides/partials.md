# Custom Partials

When creating a documentation site or styleguide, it is desirable to customize the look and feel of your layout and pages. Stylegator has been designed to easily plug in different partials into the styleguide. It is actually possible to override every component used in the default styleguide application, giving the author complete control over the appearance.

## Defining the partials

Partials can be any regular React component:

```js
// src/partials/Logo.jsx

import React from 'react'

export default ({ src }) => (
  <a href="/">
    <img src={src} />
  </a>
)
```

## Giving the partial to Stylegator

Stylegator provides a utility function for configuring custom partials:

```js
import { useCustomPartials } from 'stylegator'
```

Using this, we can import our own partials and override the default ones:

```js
import Logo from './src/partials/Logo'

const partials = useCustompartials({
  Logo,
})
```

## Complete example

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { useCustomPartials, Stylegator } from 'stylegator'

import Logo from './src/partials/Logo'

const partials = useCustomPartials({
  Logo,
})

const sections = []

ReactDOM.render(
  <Stylegator sections={sections} partials={partials} />,
  document.getElementById('app')
)

```

## Annotated list of partials

```js
useCustomPartials({
  // The right content area containing the Page
  Content,

  // The credits text that sticks to the bottom of the sidebar
  Credits,

  // The wrapper component
  Layout,

  // The react-live markdown interactive sample output by using the "code" directive
  LiveMarkdown,

  // The logo showing at the top left
  Logo,

  // The menu containing navigation links
  Menu,

  // Menu icon
  MenuIcon,

  // Menu navigation links
  MenuLink,

  // The component responsible for rendering out a section
  Page,

  // The header component at the top of each page
  PageHeader,

  // The props table output by using the "props" directive
  Props,

  // The navigation filter input box
  Search,

  // The sidebar containing the logo, search, and menu
  Sidebar,

  // The responsive sidebar toggle
  SidebarToggle,

  // The component used to render static gfm code blocks
  StaticMarkdown,
})
```
