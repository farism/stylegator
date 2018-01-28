# Installation

Use npm to install `Stylegator`

```sh
yarn add stylegator -D
npm install -D stylegator
```

# Configure an `index.html` page

```html
<-- src/template.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app" />
  </body>
</html>

```

```js
// stylegator.config.js

module.exports = {
  template: 'src/index.html',
  title: 'Docs'
}
```

# Setup the `src/index.js` entry point

Stylegator expects an index file to live at `src/index.js`. This will be used as the entry point for `webpack`.

```js
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import { pageLoader, Stylegator } from 'stylegator'

const sections = [
  {
    title: 'Hello World',
    loader: pageLoader(() => import('./sections/hello-world.md')),
  },
]

ReactDOM.render(
  <Stylegator sections={sections} />,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}
```

# Author some content

```md
// src/sections/hello-world.md

# Hello World!
```

See the [Authoring Content](#authoring-content) section for more information.
