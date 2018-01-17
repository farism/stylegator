# Custom Partials

When creating a documentation site or styleguide, it is desirable to customize the look and feel of your layout and pages. Stylegator has been designed to easily plug in different partials into the styleguide. It is actually possible to override every component used in the default styleguide application, giving the author complete control over the appearance.

## Defining the partials

Partials can be any regular React component:

```js
// src/partials/Logo.jsx

import React from 'react'

const Logo = ({ src }) => (
  <a href="http://google.com">
    <img src={src} />
  </a>
)

Logo.propTypes = {}

Logo.defaultProps = {}

export default Logo
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
  logo: Logo
})
```

## Complete example

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { useCustomPartials, Stylegator } from 'stylegator'

import Logo from './src/partials/Logo'

const partials = useCustomPartials({
  logo: Logo
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
  content,

  // The wrapper component
  layout,

  // The react-live markdown interactive sample output by using the "code" directive
  liveMarkdown,

  // The logo showing at the top left
  logo,

  // The menu containing navigation links
  menu,

  // Menu icon
  menuIcon,

  // Menu navigation links
  menuLink,

  // The component responsible for rendering out a section
  page,

  // The props table output by using the "props" directive
  props,

  // The navigation filter input box
  search,

  // The sidebar containing the logo, search, and menu
  sidebar,

  // The component used to render static gfm code blocks
  staticMarkdown,
})
```
