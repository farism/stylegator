# Styleguider [![npm version](https://badge.fury.io/js/stylegator.svg)](https://badge.fury.io/js/stylegator) [![Travis CI](https://api.travis-ci.org/farism/stylegator.svg?branch=master)](https://travis-ci.org/farism/stylegator) [![Coverage Status](https://coveralls.io/repos/github/farism/stylegator/badge.svg?branch=specs)](https://coveralls.io/github/farism/stylegator?branch=specs) [![Greenkeeper badge](https://badges.greenkeeper.io/farism/stylegator.svg)](https://greenkeeper.io/)

### Getting Started

```sh
# Installation

yarn add stylegator
npm install stylegator

# Create a new project

stylegator init my-app && cd my-app

# Start the stylegator dev server

stylegator dev

# Build the project for production

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
- [react-styleguidist](https://github.com/)
- [catalog](https://github.com/)
