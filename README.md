# Stylegator [![npm version](https://badge.fury.io/js/stylegator.svg)](https://badge.fury.io/js/stylegator)

### Getting Started

```sh
# Create a new project

mkdir my-app && cd my-app

# Install Stylegator

yarn add stylegator
npm install stylegator

# Start the stylegator dev server

stylegator dev

# Build the static site for production

stylegator build
```

### Configuration

Project configuration is available through an `stylegator.config.js` file:

```js
{
  "template": "src/index.html",
  "title": "My App"
}
```

### Contributing

Ideas and code contributions are welcome! In lieu of a styleguide, this project uses [prettier](https://github.com/prettier/prettier), [husky](https://github.com/typicode/husky), and [lint-staged](https://github.com/okonet/lint-staged) to maintain code style. If you have any questions, just ask.

### Related projects

- [react-styleguidist](https://github.com/styleguidist/react-styleguidist)
- [catalog](https://github.com/interactivethings/catalog)
