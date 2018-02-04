# React Content

Authoring documentation for React components is slightly more involved than dealing with static markup.

First, we must expose the components we wish to document to Stylegator:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Stylegator } from 'stylegator'

import MyComponent from './src/components/MyComponent'

const sections = []

const components = {
  MyComponent,
}

ReactDOM.render(
  <Stylegator sections={sections} components={components} />,
  document.getElementById('app')
)
```

Once components have been exposed, they will be added to the global context and usable in code samples:

```md
 ```code
 <MyComponent />
 ```
```

```
Which will result in an interactive code sample using `react-live`:
```code
<MyComponent />
```

## Displaying component props

Stylegator comes with a code directive for rendering the PropTypes of a React component. Using the "props" directive, along with the [`prop-types-docs`](https://www.npmjs.com/package/prop-types-docs) package, an author can give more descriptive meanings to the props that a component accepts:

```js
// src/components/MyComponent.js

import React from 'react'
import PropTypes, { withPropDocs } from 'prop-types-docs'

const MyComponent = ({ children }) => <div>My Component!</div>

const myComponentDocs = withPropDocs({
  name: 'MyComponent',
  props: {
    foo: {
      type: PropTypes.string,
      required: false,
      default: 'bar',
      description: 'This is a foo',
    },
    ...
    bar: {
      type: PropTypes.oneOf(['red', 'blue']),
      description: 'This should be an enum',
    },
    ...
  },
})

const MySubComponent = ({ children }) => <div>My SubComponent!</div>

const mySubComponentDocs = withPropDocs({
  name: 'MySubComponent',
  props: {
    foo: {
      type: PropTypes.string,
      required: false,
      default: 'bar',
      description: 'This is a foo',
    },
  },
})

MyComponent.MySubComponent = mySubComponentDocs(MySubComponent)

export default myComponentDocs(MyComponent)
```

With the component props now having full documentation, we can generate a props table in Stylegator using the "props" directive:

```md
 ```props
 component: MyComponent
 ```
```

```
will result in:

```props
component: MyComponent
```

## SubComponent props

Prop display should work for subcomponents as well:

```md
 ```props
 component: MyComponent.MySubComponent
 ```
```

```
will result in:

```props
component: MyComponent.MySubComponent
```
