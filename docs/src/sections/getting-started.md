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
import { Stylegator } from 'stylegator'

ReactDOM.render(<Stylegator />, document.getElementById('app'))
```
