You can author a variety of different types of content using stylegator. Most [github flavored markdown](https://github.github.com/gfm/) is supported via [`react-markdown`](https://github.com/rexxars/react-markdown).

In order to add a section of content, you must declare it in the `sections` that are provided to the top level `<Stylegator />` component, e.g.

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
```

## Interactive code samples

An interactive code sample can be created by using the `code` directive:


    ```code
    <button>a button</button>
    ```

This will create a sandbox for a viewer to play with:

```code
<button>a button</button>
```
