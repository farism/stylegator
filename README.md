# Styleguider [![npm version](https://badge.fury.io/js/styleguider.svg)](https://badge.fury.io/js/styleguider) [![Travis CI](https://api.travis-ci.org/farism/styleguider.svg?branch=master)](https://travis-ci.org/farism/styleguider) [![Coverage Status](https://coveralls.io/repos/github/farism/styleguider/badge.svg?branch=specs)](https://coveralls.io/github/farism/styleguider?branch=specs) [![Greenkeeper badge](https://badges.greenkeeper.io/farism/styleguider.svg)](https://greenkeeper.io/)

### Getting Started

```sh
# Installation

yarn add styleguider
npm install styleguider

# Create a new project

styleguider init my-app && cd my-app

# Start the styleguider dev server

styleguider dev

# Build the project for production

styleguider build
```

Please see the [cli usage](https://github.com/farism/styleguider/blob/master/guides/cli-usage.md) for a full list of options


### Configuration

Project configuration is available through an `.styleguiderrc` or `.styleguider.json` file:

```json
{
  "build": {
    "html": "index.prod.hbs"
  },
  "dev": {
    "port": 3000,
    "html": "index.dev.hbs"
  }
}
```

### Contributing

Ideas and code contributions are welcome! In lieu of a styleguide, this project uses [prettier](https://github.com/prettier/prettier), [husky](https://github.com/typicode/husky), and [lint-staged](https://github.com/okonet/lint-staged) to maintain code style. If you have any questions, just ask.

### Related projects
- [react-styleguidist](https://github.com/)
- [catalog](https://github.com/)
